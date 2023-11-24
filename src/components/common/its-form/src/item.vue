<template>
  <fragment v-if="isReload">
    <!-- full slot -->
    <template v-if="item.slot">
      <slot :name="item.prop" :row="item"></slot>
    </template>
    <template v-else>
      <el-form-item
        v-if="!item.hide"
        :key="item.prop"
        :label="!item.labelWidth ? '' : item.label"
        :placeholder="item.placeholder"
        :label-width="item.labelWidth || labelWidth"
        :prop="item.prop"
        :rules="item.rules"
        :class="{ inline: item.span < 24 }"
        :style="`width:${(item.span / 24) * 100}%`"
        :required="item.required"
      >
        <template #label>
          <span>
            {{ item.label }}
            <el-tooltip
              :disabled="!item.tips"
              :content="item.tips"
              placement="top"
              v-if="item.tips"
            >
              <svg-icon icon-class="question" />
            </el-tooltip>
          </span>
        </template>
        <div class="flex">
          <div class="flex-1">
            <!-- partial slot -->
            <template v-if="item.formslot">
              <slot :name="item.prop" :row="item"></slot>
            </template>
            <template v-else>
              <component
                :is="componentMap[item.type || 'input']"
                v-model="itemValue"
                v-bind="filterProps(item)"
                @change="onChange($event, item)"
                v-on="$listeners"
              ></component>
            </template>
          </div>
          <span class="suffix" v-if="suffix">{{ item.suffix }}</span>
        </div>
      </el-form-item>
    </template>
  </fragment>
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
import FormAutoComplete from './components/form-autocomplete'
import FormCascader from './components/form-cascader.vue'
import FormCode from './components/form-code.vue'
import { isNonEmptyArray, isNull } from '@/utils/unit'
import { componentMap } from './data/const'
import { commonRequest } from '@/api/common'
import { getDataByProps } from './helpers'
export default {
  name: 'ItsFormItem',
  components: {
    FormInput,
    FormRadio,
    FormSwitch,
    FormSelect,
    FormCheckbox,
    FormTree,
    FormDatePicker,
    FormUpload,
    FormAutoComplete,
    FormCascader,
    FormCode
  },
  props: {
    labelWidth: {
      type: String,
      default: ''
    },
    suffix: {
      type: Boolean,
      default: true
    },
    // 是否需要单独请求数据
    isolation: {
      type: Boolean,
      default: false
    },
    item: {
      type: [Array, Object],
      default: () => []
    },
    // eslint-disable-next-line vue/require-default-prop
    value: null,
    form: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      componentMap,
      isReload: true
    }
  },
  computed: {
    filterProps() {
      return function (props) {
        const prop = Object.assign({}, props)
        delete prop.$dicUrl
        return prop
      }
    },
    itemValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.isolation && this.loadData(this.item)
    }, 0)
  },
  methods: {
    onChange(val, item) {
      const row = !isNonEmptyArray(item.data) ? null : item.data?.find((d) => d.val === val)
      item.change && item.change(val, item, row, this)
      // 监听关联字段
      item._watchDep && item._watchDep(val, item, row, this)

      // 定制需求：设置关联字段的值： props里除了key,val外，其他字段默认用当前字段的data设置初始值
      const param = Object.assign({}, this.form)
      const currentNode = item.data?.find((d) => d.val === val)
      const data = val ? currentNode : item.data?.[0]
      if (!data) return
      Object.entries(data).forEach(([key, value]) => {
        if (!['key', 'val'].includes(key)) {
          param[key] = val ? value : ''
        }
      })
      this.$emit('update:form', param)
      // 级联
      !item.dicUrl &&
        Array.isArray(item.cascader) &&
        this.$emit('cascader', { key: item.prop, val }, item.cascader)

      //NOTE: isCascaderItem，是否cascaderItem参数依赖，data处理
      this.$emit('cascaderForData', { key: item.prop, val })
    },
    updateRowFiled(...args) {
      this.$emit('updateRowFiled', ...args)
    },
    loadData(item) {
      item.defaultValue && this.$emit('input', item.defaultValue)
      item.dicUrl && this.getDicData(item)
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
        const dicData = await commonRequest.getDataByDicUrl(item.dicUrl, item.method)
        if (dicData) {
          const data = getDataByProps(dicData, item)
          if (data.length) {
            this.$set(this.item, 'data', data)
            if (item.formslot || item.slot) return // 自定义表单元素不设置默认值
            // // 如果不存在 则初始化数据
            // if (isNull(this.form[item.prop]) || updateFlag) {
            //   this.$set(this.form, item.prop, data[0].val)
            //   typeof item.change === 'function' && item.change(data[0].val, item)
            //   typeof item._watchDep === 'function' && item._watchDep(data[0].val, item)
            // }
          } else {
            this.$set(item, 'data', [])
            // this.$set(this.form, item.prop, '')
          }
        }

        this.isReload = false
        this.$nextTick(() => {
          this.isReload = true
        })
      }, 50)
    }
  }
}
</script>
<style lang="scss" scoped>
// ::v-deep .el-form-item__content {
//   line-height: $form-item-height;
// }
// ::v-deep .el-input--mini .el-input__inner, .el-select__input {
//   height: $form-item-height;
//   line-height: $form-item-height;
// }
// ::v-deep .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
//  margin-bottom: $form-padding;
// }
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
</style>
