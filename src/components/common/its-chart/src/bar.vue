<template>
  <div ref="myChart" style="width: 100%; height: 100%"></div>
</template>
<script>
import { graphic } from '@/utils/echarts'
import chartsMixin from './mixins/charts-mixin'

export default {
  name: 'ItsChartBar',
  mixins: [chartsMixin],
  props: {
    data: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'line'
    },
    orientation: {
      type: String,
      default: 'vertical'
    },
    xAxis: {
      type: Object,
      default: () => {}
    },
    yAxis: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    const xAxis = {
      type: 'category',
      data: [],
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999',
        interval: 0
      }
    }
    const yAxis = {
      type: 'value',
      minInterval: 1,
      axisLine: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: '#999'
      }
    }
    return {
      myChart: null,
      option: {
        grid: {
          top: 0,
          bottom: 20,
          left: 60
        },
        tooltip: {
          trigger: 'item'
        },
        xAxis: this.orientation === 'vertical' ? xAxis : yAxis,
        yAxis: this.orientation === 'vertical' ? yAxis : xAxis,
        series: [
          {
            data: [],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'transparent',
              borderWidth: 1,
              borderRadius: 15,
              borderColor: '#777',
              shadowBlur: 1
            },
            barWidth: 12,
            itemStyle: {
              color: new graphic.LinearGradient(0, 0, 0.3, 0.5, [
                { offset: 0, color: '#321aec' },
                { offset: 1, color: '#d34839' }
              ]),
              borderRadius: 15,
              borderWidth: 8,
              borderColor: 'transparent'
            },
            emphasis: {
              borderRadius: 15,
              itemStyle: {
                color: new graphic.LinearGradient(0, 0, 1, 1, [
                  { offset: 0, color: '#321aec' },
                  { offset: 1, color: '#d34839' }
                ])
              }
            }
          }
        ]
      },
      rollingData: [],
      rowNum: 7
    }
  },
  watch: {
    rollingData: {
      handler(val) {
        this.$set(
          this.option.series[0],
          'data',
          val.map((d) => d.value)
        )
        this.$set(
          this.option.yAxis,
          'data',
          val.map((d) => d.name)
        )
        this.myChart.setOption(this.option, true)
      },
      deep: true
    }
  },
  created() {
    this.rollingData = this.data.filter((_d, idx) => idx < this.rowNum)
    this.setRollingData()
  },
  methods: {
    setRollingData() {
      let i = 0
      let timer = setInterval(() => {
        i++
        if (i + this.rowNum > this.data.length) i = 0
        this.rollingData = this.data.filter((_d, idx) => idx > i - 1 && idx < i + this.rowNum)
      }, 2000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
        timer = null
      })
    }
  }
}
</script>
