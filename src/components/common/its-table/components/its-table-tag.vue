<template>
  <span
    class="its-table-tag"
    :data-color="colorMap[prop ? String(prop).toUpperCase() : '0'] || color"
    :title="prop"
  >
    {{ text }}
    <i v-if="showIcon" style="color: #66b1ff" class="el-icon-s-comment" aria-hidden="true"></i>
  </span>
</template>

<script>
import { getRGBAColor } from '@/utils/unit'
import { colorMap } from './colorMap'
export default {
  name: 'ItsTableTag',
  props: {
    showIcon: {
      type: Boolean,
      default: false
    },
    textMaxLength: {
      type: Object,
      default: () => ({})
    },
    color: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    prop: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      width: 'auto',
      colorMap
    }
  },
  methods: {
    getRGBAColor,
    getWidth() {
      const { textMaxLength, prop } = this
      if (textMaxLength && prop && textMaxLength[prop]) {
        this.width = textMaxLength[prop] + 1.5 + 'em'
      } else {
        this.width = 'auto'
      }
    }
  }
}
</script>
