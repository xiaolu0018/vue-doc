<template>
  <el-select
    v-model="selectedValue"
    :placeholder="placeholder"
    :multiple="multiple"
    filterable
    :clearable="clearable"
    style="width: 100%"
    @change="onChange"
    v-bind="$attrs"
  >
    <el-option v-for="{ key, val } in data" :key="val" :label="key" :value="val"></el-option>
  </el-select>
</template>
<script>
export default {
  name: 'FormSelect',
  props: {
    value: [Array, String, Number],
    data: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    rowDel: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    selectedValue: {
      get: function () {
        // fix: 动态渲染时数据未回显
        return this.value
      },
      set: function (val) {
        this.$emit('input', val)
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
