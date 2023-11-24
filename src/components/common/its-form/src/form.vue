<template>
  <el-form
    ref="form"
    :model="form"
    :label-position="labelPosition"
    :status-icon="option.statusIcon"
    :label-width="option.labelWidth || ''"
  >
    <template v-for="item of schemaData">
      <!-- <template v-if="item.formslot || item.slot" :slot="item.prop">
        <slot :name="item.prop" :row="item"></slot>
      </template> -->
      <template v-if="item.children && item.children.length">
        <div :key="item.prop" class="group">
          <slot v-if="item.headerSlot" :name="`${item.prop}Header`" :row="item"></slot>
          <div v-else class="group-title" :style="{ width: option.labelWidth || '' }">
            {{ item.label }}
          </div>
          <!-- header slot end -->
          <div class="group-content">
            <template v-for="child of item.children">
              <form-item
                :key="child.prop"
                v-model="form[child.prop]"
                :item="child"
                :labelWidth="option.labelWidth || ''"
                :suffix="option.suffix"
                @cascader="onCascaderChange"
                @cascaderForData="onCascaderForDataChange"
              >
                <template v-if="child.formslot || child.slot" :slot="child.prop">
                  <slot :name="child.prop" :row="child"></slot>
                </template>
              </form-item>
            </template>
          </div>
        </div>
      </template>
      <template v-else>
        <form-item
          :key="item.prop"
          v-model="form[item.prop]"
          :labelWidth="option.labelWidth || ''"
          :suffix="option.suffix"
          :item="item"
          @cascader="onCascaderChange"
          @updateRowFiled="onRowFiledUpdate"
          @cascaderForData="onCascaderForDataChange"
        >
          <template v-if="item.formslot || item.slot" :slot="item.prop">
            <slot :name="item.prop" :row="item"></slot>
          </template>
        </form-item>
      </template>
    </template>
    <el-form-item v-if="option.footer">
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { commonRequest } from '@/api/common'
import cloneDeep from 'lodash/cloneDeep'
import FormItem from './item.vue'
export default {
  name: 'ItsForm',
  components: {
    FormItem
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {
          suffix: true,
          footer: false,
          statusIcon: true,
          labelWidth: '120px'
        }
      }
    },
    schema: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => {}
    },
    labelPosition: {
      type: String,
      default: 'right'
    }
  },
  data() {
    return {
      form: this.value,
      schemaData: this.schema
    }
  },
  computed: {
    isRequired() {
      return function (row) {
        return row.rules && row.rules.some((r) => r.required)
      }
    }
  },
  watch: {
    value: {
      handler(val) {
        this.form = val
      },
      deep: true
    }
  },
  mounted() {
    this.setDefaultVal()
  },
  methods: {
    async setDefaultVal() {
      await this.loadDict()
      for (const item of this.schema) {
        item.type === 'switch' && this.$set(this.form, item.prop, false)
        item.defaultValue && this.$set(this.form, item.prop, item.defaultValue)
        // 分组设置默认值 只支持2层
        if (Array.isArray(item.children)) {
          item.children.forEach((c) => {
            c.defaultValue && this.$set(this.form, c.prop, c.defaultValue)
          })
        }
      }
      // NOTE:设置defaultValue和业务逻辑初始化数据写入form冲突
      this.$emit('init')
    },
    async loadDict() {
      const setDictData = (schema) => {
        for (const item of schema) {
          if (item.dicUrl) {
            const reg = /\{(.+?)\}/g
            const hasDeps = reg.test(item.dicUrl)
            if (hasDeps) {
              const deps = item.dicUrl.match(reg)
              const parentDep = deps[deps.length - 1] // 默认父级prop为最后一个参数
              // 暂存dicUrl
              item.$dicUrl = item.dicUrl
              const depProp = parentDep.substring(1, parentDep.length - 1)
              const parent = schema.find((s) => s.prop === depProp)
              if (parent?.prop) {
                // 监听parent
                this.$set(parent, '_watchDep', async (_val, _item) => {
                  let dicUrl = item.$dicUrl
                  deps.forEach((d) => {
                    const prop = d.substring(1, d.length - 1)
                    dicUrl = this.form[prop] ? dicUrl.replace(d, this.form[prop]) : dicUrl
                  })
                  item.dicUrl = dicUrl
                  !reg.test(item.dicUrl) && this.getDicData(item, true)
                })
              }
              this.$nextTick(() => {
                const depVal = this.form[depProp]
                // 如果依赖有值 则执行初始化
                if (depVal) {
                  let dicUrl = item.$dicUrl
                  deps.forEach((d) => {
                    const prop = d.substring(1, d.length - 1)
                    dicUrl = this.form[prop] ? dicUrl.replace(d, this.form[prop]) : dicUrl
                  })
                  item.dicUrl = dicUrl
                  !reg.test(item.dicUrl) && this.getDicData(item)
                }
              })
            } else {
              // 没有依赖直接执行
              this.getDicData(item)
            }
          }
          Array.isArray(item.children) && setDictData(item.children)
        }
      }
      setDictData(this.schema)
    },
    getDicData(item, updateFlag = false) {
      setTimeout(async () => {
        // 处理相同get请求
        const getTimestamp = new Date().getTime()
        const hasQuesMark = item.dicUrl.indexOf('?') > -1
        const hasTimestamp = item.dicUrl.indexOf('_t') > -1
        if (!hasTimestamp) {
          item.dicUrl = hasQuesMark
            ? item.dicUrl + '&_t=' + getTimestamp
            : item.dicUrl + '?_t=' + getTimestamp
        }
        if (item.hide) return
        const dicData = await commonRequest.getDataByDicUrl(item.dicUrl, item.method)
        if (dicData) {
          const data = this.getDataByProps(dicData, item)
          if (data.length) {
            this.$set(item, 'data', data)

            if (item.formslot || item.slot) return // 自定义表单元素不设置默认值
            // 如果不存在 则初始化数据
            // if (isNull(this.form[item.prop]) || updateFlag) {
            //   this.$set(this.form, item.prop, data[0].val)
            //   typeof item.change === 'function' && item.change(data[0].val, item)
            //   typeof item._watchDep === 'function' && item._watchDep(data[0].val, item)
            // }
          } else {
            this.$set(item, 'data', [])
            this.$set(this.form, item.prop, '')
          }
        }
      }, 50)
    },
    /**
     * @param key 表单key
     * @param field schema字段
     * @param data 更新数据
     */
    updateRowFiled(key, field, data) {
      this.schemaData = this.schemaData.map((d) => {
        if (d.prop === key) {
          if (field === 'hide') {
            !data ? this.$set(this.form, key, undefined) : delete this.form[key]
          }
          d[field] = data
        }
        return d
      })
    },
    /**
     * @param key 键值
     * @param data 字典
     * @param updateFlag 是否刷新表单
     */
    updateDic(key, data) {
      this.schemaData = this.schemaData.map((d) => {
        if (d.prop === key) {
          d.data = this.getDataByProps(data, d)
          // updateFlag &&
          //   this.$set(this.form, key, d.data.length ? d.data[0].val : '') &&
          //   typeof d?._watchDep === 'function' &&
          //   d._watchDep?.(d.data.length ? d.data[0].val : '', d)
          // typeof d?.change === 'function' && d.change?.(d.data.length ? d.data[0].val : '', d)
        }
        return d
      })
    },
    /**
     * 更新 form 表单中的数据
     * @param { Object | String } ops 更新的对象/键值
     * @param { String } val 更新的值，当 ops 为字符串时生效，如果没有传值，则设置为空
     */
    updateFormItem(ops, val) {
      const isObject = typeof ops === 'object'
      if (isObject) {
        Object.keys(ops).forEach((key) => {
          if (this.form[key] === undefined) return
          this.$set(this.form, key, ops[key])
        })
      } else {
        this.$set(this.form, ops, val || '')
      }
    },
    getDataByProps(data, item) {
      return data.reduce((res, d) => {
        const result = {}
        item.props = item.props ? item.props : { key: 'val', val: 'key' }
        Object.entries(item.props).forEach(([key, val]) => {
          if (key === 'children') {
            result[key] = this.getDataByProps(d[val], item)
          } else {
            result[key] = d[val]
          }
        })
        res.push(result)
        return res
      }, [])
    },
    validate(cb) {
      this.$refs.form.validate(cb)
    },
    validateField(field) {
      return this.$refs.form.validateField(field)
    },
    resetForm() {
      // for (const key of Object.keys(this.form)) {
      //   this.form[key] = Array.isArray(this.form[key]) ? [] : ''
      // }
      this.$refs.form.resetFields()
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form)
        }
      })
    },
    /**
     * 过滤级联数据
     */
    onCascaderChange(props = {}, cascader = []) {
      const getMatched = (arr) => {
        return arr.map((item) => {
          if (cascader.includes(item.prop)) {
            item.data = item.data.filter((d) => d[props.key] === props.val)
            this.form[item.prop] = ''
          }
          if (Array.isArray(item.children)) {
            item.children = getMatched(item.children)
          }
          return item
        })
      }
      this.schemaData = getMatched(cloneDeep(this.schema))
    },
    /**
     * @description cascadeItem触发更新data处理
     * @param {Object} props 触发更新的的formItem{key,val}
     * @return {Boolean} 描述
     * @author lxl
     * @date 2023-11-21 16:32:33
     */
    onCascaderForDataChange(props = {}) {
      // 是否有表单项依赖当前变更项
      if (this.schema.find((item) => item.cascadeItem?.includes?.(props.key))) {
        this.schemaData = this.schema.map((item) => {
          if (!item.dicUrl && item.cascadeItem?.includes?.(props.key)) {
            // TODO: item.type === 'select'
            // 更新下拉数据
            item.data = item.originData?.[props.val] || []
            // 清空value
            this.$set(this.form, item.prop, '')
          }
          return item
        })
      }
    },
    onRowFiledUpdate(...args) {
      this.updateRowFiled(...args)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-form-item.inline {
  display: inline-block;
}
::v-deep .el-input-number {
  width: 100%;
  input {
    text-align: left;
  }
}
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.suffix {
  min-width: 3em;
  margin-left: 5px;
  font-size: 13px;
  color: #777;
}
.group {
  margin-bottom: 20px;
  font-size: 16px;
  color: #333;
}
.group-title {
  margin-bottom: 12px;
  margin-left: 12px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
}
</style>
