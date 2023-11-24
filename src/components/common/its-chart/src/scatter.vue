<template>
  <div ref="myChart" style="width: 100%; height: 100%"></div>
</template>
<script>
import chartsMixin from './mixins/charts-mixin'

export default {
  name: 'ItsChartScatter',
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
    },
    series: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      myChart: null,
      option: {
        grid: {
          top: 0,
          bottom: 20,
          left: 50
        },
        tooltip: {
          trigger: 'item'
        },
        singleAxis: [
          {
            left: 20,
            type: 'category',
            boundaryGap: false,
            data: this.data.map((d) => d.name.substring(0, 2)),
            top: 20,
            bottom: 20,
            right: 20,
            // height: 20,
            axisLabel: {
              interval: 0,
              color: '#ccc'
            }
          }
        ],
        series: [
          {
            singleAxisIndex: 0,
            coordinateSystem: 'singleAxis',
            type: 'scatter',
            symbol:
              'path://M472.535913 1003.339745C181.939986 582.061852 128 538.825863 128 383.999903 128 171.921956 299.921956 0 511.999903 0s383.999903 171.921956 383.999902 383.999903c0 154.825961-53.939986 198.06195-344.535913 619.339842-19.069995 27.547993-59.859985 27.545993-78.927979 0z',
            data: this.data.map((d) => d.value),
            symbolSize: function (dataItem) {
              return dataItem > 20 ? 20 : dataItem < 5 && dataItem > 0 ? 4 : dataItem
            },
            symbolOffset: [0, -10],
            itemStyle: {
              color: '#fe3c64'
            },
            emphasis: {
              itemStyle: {
                color: '#02bef9'
              }
            }
          }
        ]
      }
    }
  },
  watch: {
    data: {
      handler(val) {
        this.$set(
          this.option.series[0],
          'data',
          val.map((d) => d.value)
        )
        this.$set(
          this.option.singleAxis,
          'data',
          val.map((d) => d.name)
        )
      },
      deep: true
    }
  }
}
</script>
