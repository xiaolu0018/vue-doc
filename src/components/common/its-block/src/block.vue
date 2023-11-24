<script>
import CommonBlock from './block-common.vue'
import RandomBlock from './block-random.vue'
export default {
  name: 'ItsBlock',
  components: { CommonBlock, RandomBlock },
  props: {
    random: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      required: true
    },
    active: {
      type: [String, Number],
      required: true
    }
  },
  methods: {
    handleActiveUpdated(val) {
      this.$emit('update:active', val)
    },
    handleChange(val) {
      this.$emit('change', val)
    }
  },
  render() {
    const { random, data, active, handleActiveUpdated, handleChange } = this
    const blockConf = {
      props: {
        data,
        active
      },
      on: {
        'update:active': handleActiveUpdated,
        change: handleChange
      }
    }
    if (random) {
      return <RandomBlock {...blockConf}></RandomBlock>
    } else {
      return <CommonBlock {...blockConf}></CommonBlock>
    }
  }
}
</script>
