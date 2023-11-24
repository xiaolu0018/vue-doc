<template>
  <el-radio-group v-model="checkList" @input="onChange">
    <el-radio v-for="item of data" :key="item.val" :label="item.val" :disabled="item.disabled">
      {{ item.key }}
    </el-radio>
  </el-radio-group>
</template>
<script>
export default {
  name: 'FormRadio',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    data: {
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
  },
  methods: {
    onChange(val) {
      this.$emit('change', val)
    }
  }
}
</script>
