<script>
export default {
  name: 'ItsTeleport',
  props: {
    /* 移动至哪个标签内，最好使用id */
    to: {
      type: String,
      required: true
    }
  },

  mounted() {
    const dom = document.querySelector(this.to)
    this.$el && dom && dom.appendChild(this.$el)
  },

  destroyed() {
    const dom = document.querySelector(this.to)
    this.$el && dom && dom.removeChild(this.$el)
  },

  render() {
    return <div>{this.$scopedSlots.default()}</div>
  }
}
</script>
