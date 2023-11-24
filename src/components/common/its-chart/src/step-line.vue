<!--
 * @Author: 庞超
 * @Date: 2022-08-08 14:00:43
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-29 14:55:32
 * @Description: 阶梯折线图
 * @FilePath: \src\src\components\common\its-chart\src\step-line.vue
-->
<template>
  <div ref="myChart" style="width: 100%; height: 100%"></div>
</template>
<script>
import chartsMixin from './mixins/charts-mixin'
export default {
  name: 'StepLine',
  mixins: [chartsMixin],
  props: {
    /**
     * @type { Object } conf
     * @type { String } conf.title 标题
     * @type { Array } conf.dimension 维度
     * @type { String|Function } conf.unit 单位
     */
    conf: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      myChart: null,
      option: {
        background: 'transparent',
        title: {
          text: this.title,
          textStyle: {
            fontSize: '16'
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        visualMap: [
          {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0
          }
        ],
        legend: {
          show: false,
          data: [],
          top: true,
          right: true
        },
        grid: {
          left: '22px',
          right: '22px',
          top: '32px',
          bottom: '10px',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        dataZoom: {
          type: 'inside',
          start: 99,
          minValueSpan: 11
        },
        series: []
      }
    }
  },
  watch: {
    data: {
      handler: 'resolveData',
      deep: true
    },
    conf: {
      handler: 'setConf',
      deep: true
    }
  },
  mounted() {
    this.resolveData(this.data)
    this.setConf(this.conf)
  },
  methods: {
    resetOptData() {
      this.option.legend.data = []
      this.option.series = []
    },
    setConf(conf) {
      this.resolveUnit(conf.unit)
      this.option.title.text = conf.title
      this.option.xAxis.data = conf.dimension
      this.myChart?.setOption(this.option, true)
    },
    resolveData(data) {
      const defaultSeries = {
        name: '',
        type: 'line',
        data: [],
        color: '#5b8c00'
      }
      // 如果更新了数据，不清空原有数据会显示多层
      this.resetOptData()
      data.forEach((item, idx) => {
        this.option.legend.data.push(item.legend)
        const series = Object.assign({}, defaultSeries, item.series)
        this.option.series.push(series)
        // get max value, and add 10% max
        let max = Math.max.apply([], item.series.data)
        max = Number.parseFloat(Number(max + max * 0.1).toFixed(2))
        this.option.visualMap[idx].max = max
      })
      this.option.legend.show = this.option.legend.length > 1
      this.myChart?.setOption(this.option, true)
      // base-mixins --> resize debounce hook
      this.debounceResize()
    },
    resolveUnit(unit) {
      if (!unit) return
      let formatter = (val) => val
      if (typeof unit === 'string') {
        formatter = (val) => `${val}${unit}`
      } else if (unit instanceof Function) {
        formatter = unit
      }
      this.option.yAxis.axisLabel.formatter = formatter
      this.option.tooltip.formatter = this.formatterTooltip(formatter)
    },
    // formatter tooltip value adapter
    formatterTooltip(formatter) {
      return (params) => {
        var relVal = params[0].name
        params.forEach((param) => {
          relVal += `<br/>${param.marker} ${param.seriesName}  ${formatter(param.value)}`
        })
        return relVal
      }
    }
  }
}
</script>
