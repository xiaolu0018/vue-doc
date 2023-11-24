<!--
 * @Author: 庞超
 * @Date: 2022-07-07 14:23:08
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-09 10:40:54
 * @Description:
 * @FilePath: \src\src\components\common\its-chart\src\pie.vue
-->
<template>
  <div ref="myChart" style="width: 100%; height: 100%"></div>
</template>
<script>
import chartsMixin from './mixins/charts-mixin'
import { getUnit } from '@/utils/unit'

export default {
  name: 'ItsChartPie',
  mixins: [chartsMixin],
  props: {
    name: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Array,
      default: () => [
        '#5470c6',
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc'
      ]
    },
    radius: {
      type: [Array, String],
      default() {
        return '50%'
      }
    }
  },
  data() {
    const unitFormatter = (params) => {
      const { data } = params
      return !['disk', 'bandwidth'].includes(data.unit)
        ? `${data.name} ` + data.value + ` ${data.unit}`
        : `${data.name} ` +
            getUnit(data.unit, data.value).val +
            ` ${getUnit(data.unit, data.value).unit}`
    }
    return {
      myChart: null,
      option: {
        grid: {
          top: 0,
          bottom: 0
        },
        title: {
          text: this.name,
          textStyle: {
            fontSize: 15
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: unitFormatter
        },
        color: this.colors,
        legend: {
          orient: 'vertical',
          show: !this.$attrs.hideLegend,
          selectedMode: false,
          top: 50,
          left: 'left',
          itemWidth: 12,
          itemHeight: 8,
          textStyle: {
            color: '#777',
            fontSize: 10
          }
        },
        series: [
          {
            name: this.name,
            type: 'pie',
            // radius: ['45%', '70%'],
            radius: this.radius || '50%',
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 5,
              borderColor: '#fff',
              borderWidth: 1
            },
            label: {
              show: true,
              // position: 'center',
              color: '#777',
              formatter: unitFormatter,
              textStyle: {
                fontSize: 12
              }
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold',
                color: '#000',
                formatter: unitFormatter
              }
            },
            labelLine: {
              show: true,
              length: 10,
              length2: 10,
              smooth: true
            },
            data: this.data
          }
        ]
      }
    }
  }
}
</script>
