<template>
  <el-switch
    v-model="test"
    :active-text="activeText"
    :inactive-text="inactiveText"
    :active-value="activeValue || true"
    :inactive-value="inactiveValue || false"
  ></el-switch>
</template>
<script>
export default {
  name: 'FormSwitch',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    activeText: {
      type: String,
      default: ''
    },
    inactiveText: {
      type: String,
      default: ''
    },
    activeValue: {
      type: Boolean,
      default: true
    },
    inactiveValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    test: {
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
