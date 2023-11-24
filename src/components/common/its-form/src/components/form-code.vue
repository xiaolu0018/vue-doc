<template>
  <monaco-code-editor v-model="myVal" theme="vs-dark"></monaco-code-editor>
</template>
<script>
import { MonacoCodeEditor } from '@/components/code-editor'
export default {
  name: 'FormCode',
  components: { MonacoCodeEditor },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    myVal: {
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
