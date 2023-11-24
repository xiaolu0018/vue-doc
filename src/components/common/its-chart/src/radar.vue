<template>
  <div ref="myChart" style="width: 100%; height: 100%"></div>
</template>
<script>
import chartsMixin from './mixins/charts-mixin'

export default {
  name: 'ItsChartPie',
  mixins: [chartsMixin],
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      myChart: null,
      option: {
        color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
        title: {
          text: '',
          show: false
        },
        tooltip: {
          trigger: 'item'
        },
        center: ['60%', '60%'],
        radius: 80,
        legend: {
          orient: 'vertical',
          // icon: 'circle', //图例形状
          data: ['CPU', 'GPU', '带宽'],
          top: 0,
          left: 0,
          itemWidth: 8, // 图例标记的图形宽度。[ default: 25 ]
          itemHeight: 8, // 图例标记的图形高度。[ default: 14 ]
          itemGap: 10, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
          textStyle: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#00E4FF'
          }
        },
        radar: {
          indicator: this.data.map((d) => {
            return { text: d.cloudName }
          }),
          center: ['50%', '55%'],
          radius: '70%',
          startAngle: 90,
          splitNumber: 4,
          shape: 'polygon',
          name: {
            textStyle: {
              color: '#fff',
              fontSize: 14
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: '#0d6dba',
              opacity: 0.1
            }
          },
          axisLabel: {
            show: false,
            fontSize: 14,
            color: '#fff',
            fontWeight: 'normal'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#4f8bbe',
              opacity: 1
            }
          },
          splitLine: {
            lineStyle: {
              color: '#4f8bbe',
              opacity: 0.5
            }
          }
        },
        series: [
          {
            type: 'radar',
            data: [
              {
                value: this.data.map((d) => d.cpu),
                name: 'CPU',
                type: 'radar',
                symbol: 'circle',
                symbolSize: 5,
                areaStyle: {
                  normal: {
                    color: 'rgba(245, 166, 35, 0.4)'
                  }
                },
                itemStyle: {
                  color: 'rgba(245, 166, 35, 1)',
                  borderColor: 'rgba(245, 166, 35, 0.3)',
                  borderWidth: 10
                },
                lineStyle: {
                  normal: {
                    type: 'dashed',

                    color: 'rgba(245, 166, 35, 1)',
                    width: 1
                  }
                }
              },
              {
                value: this.data.map((d) => d.gpu),
                name: 'GPU',
                type: 'radar',
                symbol: 'circle',
                symbolSize: 5,
                itemStyle: {
                  normal: {
                    color: 'rgba(19, 173, 255, 1)',
                    borderColor: 'rgba(19, 173, 255, 0.4)',
                    borderWidth: 10
                  }
                },
                areaStyle: {
                  normal: {
                    color: 'rgba(19, 173, 255, 0.5)'
                  }
                },
                lineStyle: {
                  normal: {
                    color: 'rgba(19, 173, 255, 1)',
                    width: 1,
                    type: 'dashed'
                  }
                }
              },
              {
                value: this.data.map((d) => d.bandwidth),
                name: '带宽',

                type: 'radar',
                symbol: 'circle',
                symbolSize: 5,
                itemStyle: {
                  normal: {
                    color: 'rgba(129, 173, 255, 1)',
                    borderColor: 'rgba(129, 173, 255, 0.4)',
                    borderWidth: 10
                  }
                },
                areaStyle: {
                  normal: {
                    color: 'rgba(129, 173, 255, 0.5)'
                  }
                },
                lineStyle: {
                  normal: {
                    color: 'rgba(129, 173, 255, 1)',
                    width: 1,
                    type: 'dashed'
                  }
                }
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
