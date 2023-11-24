<template>
  <el-checkbox-group v-model="checkList">
    <el-checkbox
      v-for="item of dicData"
      :key="item.label"
      :label="item.label"
      :disabled="item.disabled"
    ></el-checkbox>
  </el-checkbox-group>
</template>
<script>
export default {
  name: 'FormCheckbox',
  props: {
    value: {
      type: Array,
      default: () => []
    },
    dicData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {
    checkList: {
      get: function () {
        return this.value
      },
      set: function (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
