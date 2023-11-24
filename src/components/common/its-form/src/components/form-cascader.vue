<template>
  <el-cascader
    v-model="selectedValue"
    filterable
    style="width: 100%"
    :options="data"
    :props="attrProps"
    @change="onChange"
    v-bind="$attrs"
  />
</template>

<script>
import { commonRequest } from '@/api/common'
export default {
  name: 'FormCascader',
  props: {
    value: [Array, String, Number],
    data: {
      type: Array,
      default: () => []
    },
    dicUrl: String,
    options: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    selectedValue: {
      get: function () {
        return !this.data.length ? '' : this.value
      },
      set: function (val) {
        this.$emit('input', val)
      }
    },
    attrProps() {
      const url = this.dicUrl
      return {
        lazy: !!url,
        lazyLoad: url
          ? async (node, resolve) => {
              let data = []
              const { level = 1, value } = node
              if (level > 0) {
                //NOTE: form外层已经请求过dicUrl,level=0
                const res = await commonRequest.getDicData(
                  `/api/${this.options.dicUrl}${value || ''}&_t=${new Date().getTime()}`
                )
                if (res) {
                  data = (res || []).map(({ key, val }) => ({
                    key: val,
                    val: key,
                    leaf: level + 1 >= this.options?.maxLevel || 2
                  }))
                }
              }
              resolve(data || [])
            }
          : null,
        ...this.options
      }
    }
  },
  methods: {
    onChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>
