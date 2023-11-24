<template>
  <dc-editor v-model="content" :conf="conf"></dc-editor>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    conf: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    content: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
