<script>
export default {
  name: 'ItsNpanel',
  props: {
    // eslint-disable-next-line vue/require-default-prop
    header: String,
    minheight: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      body_style: { display: 'flex', 'flex-direction': 'column' },
      padding_style: { padding: '10px' },
      content_style: { flex: '1' },
      min_height_style: { 'min-height': this.minheight + 'px' },
      border_bottom_style: { 'border-bottom': 'solid 1px #dcdfe6' },
      border_top_style: { 'border-top': 'solid 1px #dcdfe6' },
      header_style: {}
    }
  },
  render(h) {
    const header = this.$slots.header
    const def = this.$slots.default
    const footer = this.$slots.footer
    const body = []
    if (header) {
      body.push(h('div', { style: [this.border_bottom_style] }, header))
    } else if (this.header) {
      body.push(h('div', { style: [this.padding_style, this.border_bottom_style] }, this.header))
    }
    if (def) body.push(h('div', { style: [this.content_style] }, def))
    if (footer) body.push(h('div', { style: [this.border_top_style] }, footer))
    return h('div', { style: [this.body_style, this.min_height_style] }, body)
  }
}
</script>
