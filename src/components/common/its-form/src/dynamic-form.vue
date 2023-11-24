<template>
  <div class="dynamic-form">
    <div class="dynamic-form-title">{{ schema.label }}</div>
    <div v-for="(item, index) in myForm" :key="item._key" class="dynamic-form-group">
      <div class="dynamic-form-group-title">{{ schema.label + (index + 1) }}</div>
      <el-col v-if="schema.repeatable" :span="24" class="dynamic-form-group-options">
        <el-tooltip v-if="index === 0" content="复制表单">
          <el-button circle icon="el-icon-plus" @click.prevent="addItem(item)"></el-button>
        </el-tooltip>
        <el-tooltip content="删除表单" v-if="index !== 0">
          <el-button
            circle
            icon="el-icon-delete"
            @click.prevent="removeItem(item, index)"
          ></el-button>
        </el-tooltip>
      </el-col>
      <template v-for="(child, cidx) in normalKeys(item)">
        <template v-if="childSchema(child).slot">
          <DynamicFormItem
            :key="`${childSchema(child).prop}_${index}_${cidx}`"
            :form.sync="myForm[index][childSchema(child).prop]"
            :schema="childSchema(childSchema(child).prop)"
            :propPath="propPath + '.' + index + '.' + childSchema(child).prop"
          />
        </template>
        <template v-else>
          <el-form-item
            :key="`${child}_${index}_${cidx}`"
            :label="childSchema(child).label"
            :prop="`${propPath}` + '.' + index + '.' + child"
            :rules="
              childSchema(child).rules || {
                required: false,
                message: `${childSchema(child).label}不能为空`,
                trigger: ['blur', 'change']
              }
            "
          >
            <template #label>
              <span>
                {{ childSchema(child).label }}
                <el-tooltip
                  :disabled="!childSchema(child).tips"
                  :content="childSchema(child).tips"
                  placement="top"
                  v-if="childSchema(child).tips"
                >
                  <svg-icon icon-class="question" />
                </el-tooltip>
              </span>
            </template>
            <div class="flex">
              <div class="flex-1">
                <!-- partial slot -->
                <template v-if="childSchema(child).formslot">
                  <DynamicFormItem
                    :key="`${propPath}_${childSchema(child).prop}_${index}`"
                    :form.sync="myForm[index][childSchema(child).prop]"
                    :schema="childSchema(childSchema(child).prop)"
                    :propPath="propPath + '.' + index + '.' + childSchema(child).prop"
                  />
                </template>
                <template v-else>
                  <component
                    :is="componentMap[childSchema(child).type || 'input']"
                    v-model="myForm[index][child]"
                    :key="`${propPath}_${childSchema(child).prop}_${index}`"
                    v-bind="filterProps(childSchema(child))"
                    @change="onChange($event, childSchema(child))"
                    v-on="$listeners"
                  ></component>
                </template>
              </div>
              <span class="suffix">{{ childSchema(child).suffix }}</span>
            </div>
          </el-form-item>
        </template>
      </template>
      <!-- 如果存在数组 继续递归 -->
      <!-- <template v-if="nestedKeys(item).length">
        <DynamicFormItem
          v-for="k of nestedKeys(item)"
          :key="k"
          :form.sync="myForm[index][k]"
          :schema="childSchema(k)"
          :propPath="propPath + '.' + index + '.' + k"
        />
      </template> -->
    </div>
  </div>
</template>
<script>
import FormTree from './components/form-tree'
import FormInput from './components/form-input'
import FormRadio from './components/form-radio'
import FormSwitch from './components/form-switch'
import FormSelect from './components/form-select'
import FormCheckbox from './components/form-checkbox'
import FormDatePicker from './components/form-datepicker'
import FormUpload from './components/form-upload'
import { isNonEmptyArray, isNull } from '@/utils/unit'
import { componentMap } from './data/const'
import { commonRequest } from '@/api/common'
import { getDataByProps } from './helpers'
import cloneDeep from 'lodash/cloneDeep'

// const TEMP_KEY = '_key'
export default {
  name: 'DynamicFormItem',
  components: {
    FormInput,
    FormRadio,
    FormSwitch,
    FormSelect,
    FormCheckbox,
    FormTree,
    FormDatePicker,
    FormUpload
  },
  props: {
    form: {
      type: Array,
      default: () => []
    },
    nodeId: {
      type: String,
      default: ''
    },
    propPath: {
      type: String,
      default: ''
    },
    schema: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      componentMap
    }
  },
  computed: {
    nestedKeys() {
      return function (item) {
        return Object.entries(item).reduce((acc, item) => {
          if (Array.isArray(item[1]) && item[1].length) {
            acc.push(item[0])
          }
          return acc
        }, [])
      }
    },
    normalKeys() {
      return function (item) {
        return Object.keys(item)
          .filter((a) => a !== '_key')
          .sort((a, b) => {
            return (
              this.schema.children.find((v) => v.prop === a)?.order -
              this.schema.children.find((v) => v.prop === b)?.order
            )
          })
      }
    },
    childSchema() {
      return function (prop) {
        const item = this.schema.children.find((c) => c.prop === prop)
        return item
      }
    },
    myForm: {
      get() {
        return this.form
      },
      set(val) {
        // this.$emit('update:form', val)
      }
    },
    filterProps() {
      return function (props) {
        const prop = Object.assign({}, props)
        delete prop.$dicUrl
        return prop
      }
    }
  },
  mounted() {
    this.initDictData(this.schema)
  },
  methods: {
    initDictData(item, updateFlag = false) {
      if (!item.dicUrl) {
        if (item.children.length) {
          item.children.forEach((c) => {
            this.initDictData(c)
          })
        }
        return
      }
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
        const dicData = await commonRequest.getDicData(item.dicUrl)
        if (dicData) {
          const data = getDataByProps(dicData, item)
          if (data.length) {
            this.$set(item, 'data', data)
            // 如果不存在 则初始化数据
            // if (isNull(this.form[item.prop]) || updateFlag) {
            //   this.$set(this.form, item.prop, data[0].val)
            //   typeof item.change === 'function' && item.change(data[0].val, item)
            // }
          } else {
            this.$set(item, 'data', [])
            this.$set(this.myForm, item.prop, '')
          }
        }
      }, 50)
    },
    addItem(item) {
      console.log(item)
      const dehydrate = (item) => {
        for (const [key, val] of Object.entries(item)) {
          if (Array.isArray(val) && val.length) {
            item[key] = val.splice(0, 1)
          }
          if (item[key].constructor === Object) {
            dehydrate(item[key])
          }
        }
        return item
      }
      const d = dehydrate(cloneDeep(item))
      console.log(d)

      this.myForm.push({
        ...d,
        _key: Date.now() // 后端过滤下划线开头的参数 例如：_xxx
      })
      console.log(this.myForm)
    },
    removeItem(item, index) {
      this.myForm.splice(index, 1)
    },
    onChange(val, item) {
      const row = !isNonEmptyArray(item.data) ? null : item.data.find((d) => d.val === val)
      item.change && item.change(val, item, row)
      // 定制需求：设置关联字段的值： props里除了key,val外，其他字段默认用当前字段的data设置初始值
      const currentNode = item.data?.find((d) => d.val === val)
      const data = val ? currentNode : item.data?.[0]
      let param = null
      if (!data) return
      // form可能为数组
      if (Array.isArray(this.myForm)) {
        param = this.myForm.map((d) => {
          Object.entries(data).forEach(([key, value]) => {
            if (!['key', 'val'].includes(key)) {
              d[key] = val ? value : ''
            }
          })
          return d
        })
      } else {
        param = Object.assign({}, this.myForm)
        Object.entries(data).forEach(([key, value]) => {
          if (!['key', 'val'].includes(key)) {
            param[key] = val ? value : ''
          }
        })
      }
      console.log('-------updated---------')
      this.$emit('update:form', param)
    }
  }
}
</script>
<style lang="scss" scoped>
$form-item-size: 18px;
.dynamic-form {
  &-title {
    width: 120px;
    padding-right: $padding;
    margin-bottom: $padding;
    font-size: $text-md;
    font-weight: 700;
    color: $title-color;
    text-align: right;
  }
  &-group {
    position: relative;
    left: 120px;
    padding: 15px;
    margin-bottom: 24px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 0 5px 0 #ccc;
    &-title {
      margin-bottom: $padding;
      font-size: 13px;
      color: $title-color;
    }
    &-options {
      position: absolute;
      top: 4px;
      right: 4px;
      text-align: right;
      & > button {
        border: 0;
      }
    }
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  &-item {
    position: relative;
    display: flex;
    align-items: center;
    & + & {
      margin-top: calc($padding/2);
    }
    &-content {
      flex: 1;
      .el-select {
        margin-bottom: calc($form-item-size/2);
      }
    }
    &-option {
      position: absolute;
      top: 0;
      right: -20px;
      & > .el-button {
        font-size: $text-sm;
      }
    }
  }
}
.suffix {
  min-width: 3em;
  margin-left: 5px;
  font-size: 13px;
  color: #777;
}
</style>
