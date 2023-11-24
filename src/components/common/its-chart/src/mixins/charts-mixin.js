/*
 * @Author: 庞超
 * @Date: 2022-08-08 14:07:25
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-09 14:05:19
 * @Description: echarts mixin
 * @FilePath: \src\src\components\common\its-chart\src\mixins\charts-mixin.js
 */
import { init } from '@/utils/echarts'
import { debounce } from 'lodash'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      myChart: null,
      optionName: 'option'
    }
  },
  created() {
    this.debounceResize = debounce(this.resize, 300)
  },
  mounted() {
    this.initChart()
    window.addEventListener('resize', this.debounceResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.debounceResize)
    this.debounceResize.cancel()
    this.myChart && this.myChart.dispose()
    this.myChart = null
  },
  methods: {
    // 如果外部 option 名称被占用，可以通过该方法更换 option 对象名称
    // 该方法需要在 beforeMount 时使用
    setOptionName(optName) {
      this.optionName = this[optName] ? optName : 'option'
    },
    initChart() {
      const optName = this.optionName || 'option'
      const chartDom = this.$refs.myChart
      this.myChart = init(chartDom)
      this[optName] && this.myChart?.setOption(this[optName])
    },
    resize() {
      this.myChart.resize()
    }
  }
}
