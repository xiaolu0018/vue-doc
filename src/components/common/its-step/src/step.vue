<script>
export default {
  name: 'ItsStep',
  props: {
    steps: {
      type: Array,
      required: true
    },
    active: {
      type: [String, Number],
      required: true
    }
  },
  render() {
    const { steps, active } = this
    const items = steps.map((s, i) => {
      const itemConf = {
        style: {
          'font-size': '15px',
          'font-weight': 'bold',
          padding: '10px 30px',
          'border-bottom': `2px solid ${active === i ? '#2d8cf0' : '#f2f2f2'}`,
          color: active === i ? '#2d8cf0' : active < i ? '#909399' : '#000000'
        }
      }
      return (
        <div {...itemConf}>
          <span>{`${i + 1}.${s}`}</span>
        </div>
      )
    })
    return <div flex>{items}</div>
  }
}
</script>
