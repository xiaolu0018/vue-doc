<template>
  <div class="form-select-input">
    <el-input
      v-model="inputVal"
      clearable
      v-if="isInput"
      :placeholder="placeholder"
      @change="onInputChange"
    ></el-input>
    <el-select
      v-model="selectVal"
      v-else
      filterable
      allow-create
      :placeholder="placeholder"
      @change="onChange"
    >
      <el-option
        v-for="item in data"
        :key="item.key"
        :label="item.key"
        :value="item.val"
      ></el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  name: 'FormSelectInput',
  props: {
    value: [Array, String, Number],
    placeholder: {
      type: String,
      default: '请输入'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      inputVal: '',
      selectVal: [],
      iValue: null,
      multiple: true,
      isInput: false
    }
  },
  computed: {
    iValue: {
      get: function () {
        return !this.data.length ? '' : this.value
      },
      set: function (val) {
        this.$emit('input', val)
      }
    }
  },
  created() {
    this.isInput = this.data.length === 0
  },
  methods: {
    onChange(val) {
      const last = val[val.length - 1]
      const isInput = !this.options.some(({ value }) => value === last)
      this.$nextTick(() => {
        this.isInput = isInput // suppress console errors
        if (this.isInput) {
          this.iValue = this.inputVal = last
          this.selectVal = []
        } else {
          this.iValue = val
        }
      })
    },
    onInputChange(val) {
      if (!val) {
        this.isInput = false
        this.iValue = this.selectVal = []
      } else {
        this.iValue = val
      }
    }
  }
}
</script>
