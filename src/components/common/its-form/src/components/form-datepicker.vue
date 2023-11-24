<template>
  <el-input-number
    v-if="type === 'number'"
    v-model="test"
    :max="max"
    :min="min"
    :type="type"
    autocomplete="off"
    controls-position="right"
    :controls="true"
    @change="onChange"
  ></el-input-number>
  <el-input
    v-else
    v-model="test"
    :type="type || 'text'"
    :placeholder="placeholder"
    :show-password="showPassword"
    autocomplete="off"
    v-bind="$attrs"
    @change="onChange"
  ></el-input>
</template>
<script>
import { isNull } from '@/utils/unit'
export default {
  name: 'FormInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },

    type: {
      type: String,
      default: 'text'
    },
    min: {
      type: Number
    },
    max: {
      type: Number
    },
    placeholder: {
      type: String,
      default: ''
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowTooltip: true
    }
  },
  computed: {
    test: {
      get: function () {
        return isNull(this.value) ? undefined : this.value // fix: type=number,默认值为0
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
