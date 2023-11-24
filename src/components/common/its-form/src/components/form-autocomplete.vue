<template>
  <el-autocomplete
    v-model="myValue"
    class="autocomplete-inline-input"
    :fetch-suggestions="queryNetcardRate"
    :placeholder="placeholder"
    :readonly="loading"
    style="width: 100%"
    @select="onSelected"
    @change="onChange"
  >
    <i class="el-icon-loading el-input__icon" v-if="loading" slot="suffix"></i>
    <i class="el-icon-arrow-down el-input__icon" v-else-if="myDicData.length" slot="suffix"></i>
    <template v-if="append" slot="append">
      {{ append }}
    </template>
  </el-autocomplete>
</template>
<script>
import { commonRequest } from '@/api/common'
import { getDataByProps } from '../helpers'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    append: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    props: {
      type: Object,
      default: () => {}
    },
    dicUrl: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    change: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      myDicData: [],
      loading: true
    }
  },
  computed: {
    myValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  watch: {
    data: {
      handler(val) {
        this.myDicData = getDataByProps(val, this.props)
        if (val.length) {
          this.loading = false
        }
      },
      deep: true
    }
  },
  created() {
    this.onLoad()
  },
  methods: {
    async onLoad() {
      try {
        const { dicUrl, data, props = {} } = this
        if (dicUrl) {
          const res = await commonRequest.getDicData(dicUrl)
          this.myDicData = getDataByProps(res.data.data, props)
          this.loading = false
          console.log(dicUrl)
        } else {
          this.myDicData = getDataByProps(data, props)
          this.loading = false
          console.log(this.myDicData)
        }
      } catch (error) {}
    },
    async queryNetcardRate(queryString, cb) {
      const data = this.myDicData.map((d) => {
        return {
          label: d.key,
          value: d.val
        }
      })
      const isMatched = data.find((d) => d.label === queryString)
      console.log()
      const results = queryString && !isMatched ? data.filter(this.createFilter(queryString)) : data
      cb(results)
    },
    createFilter(queryString) {
      return (item) => {
        return item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    },
    onSelected(row) {
      console.log(row)
      const isVliad = this.$parent.validateState !== 'error'
      const hasChange = typeof this.change === 'function'
      isVliad && hasChange && this.change({ column: this, value: row.value })
    },
    onChange(value) {
      console.log(value)
      const isVliad = this.$parent.validateState !== 'error'
      const hasChange = typeof this.change === 'function'
      isVliad && hasChange && this.change({ column: this, value })
    }
  }
}
</script>
