<template>
  <div ref="geoMap" style="width: 100%; height: 100%">geoMap</div>
</template>
<script>
import { registerMap, init } from '@/utils/echarts'
import { geoCoordMap } from './data/mock'
import mapJson from './data/china.json'
import { debounce } from 'lodash'
export default {
  name: 'ItsChartGeoMap',
  props: {
    mapData: {
      type: Array,
      default: () => []
    },
    scatterData: {
      type: Array,
      default: () => []
    },
    lineData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      timer: null,
      myChart: null,
      option: {
        title: {
          text: 'text',
          subtext: 'subtext',
          show: false
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const { componentSubType, data } = params
            const mapTip = `<b>${data.name}</b><br> 云池数量：${data.value}个 <br> GPU数量：${data.gpuNum}个 <br> CPU数量：${data.cpuNum}个 <br>`
            const scatterTip =
              componentSubType === 'scatter'
                ? `<b>${data.name}</b><br> 云类型：${data.cloudBusTypeString} <br> 云商：${data.cloudTypeString} <br> 云区域：${data.cpRegionName} <br>`
                : ''
            return componentSubType === 'map' ? mapTip : scatterTip
          },
          textStyle: {
            fontSize: 12,
            lineHeight: 25,
            color: '#fff'
          },
          position: function (point, params, dom, rect, size) {
            var x = point[0] //
            var y = point[1]
            var boxWidth = size.contentSize[0]
            var boxHeight = size.contentSize[1]
            var posX = 0 // x坐标位置
            var posY = 0 // y坐标位置

            if (x < boxWidth) {
              // 左边放不开
              posX = 5
            } else {
              // 左边放的下
              posX = x - boxWidth - 10
            }

            if (y < boxHeight) {
              // 上边放不开
              posY = 5
            } else {
              // 上边放得下
              posY = y - boxHeight - 10
            }

            return [posX, posY]
          },
          borderColor: '#164485',
          backgroundColor: 'rgba(0,0,0,0.5)'
        },
        // toolbox: {
        //   show: false,
        //   orient: 'vertical',
        //   left: 'right',
        //   top: 'center',
        //   feature: {
        //     dataView: { readOnly: false },
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        visualMap: {
          min: 0,
          max: 20,
          right: 0,
          text: ['High', 'Low'],
          realtime: false,
          calculable: true,
          show: false,
          seriesIndex: 0,
          // dimension: 0,
          inRange: {
            color: ['#1c1e4f99', '#972b52']
          },
          textStyle: {
            color: '#fafafa'
          }
        },
        geo: {
          map: 'china',
          // top: 240,
          // left: 220,
          layoutSize: '70%',
          layoutCenter: ['65%', '50%'],
          zoom: 1.4,
          roam: false,
          label: {
            show: true,
            color: '#fff'
          },
          regions: [
            {
              name: '南海诸岛',
              itemStyle: {
                // 隐藏地图
                normal: {
                  opacity: 0
                }
              },
              label: {
                show: false // 隐藏文字
              }
            }
          ],
          itemStyle: {
            areaColor: {
              type: 'linear', // linear | radial
              x: 0.5,
              y: 0.5,
              r: 0.9,
              colorStops: [
                {
                  offset: 0,
                  color: '#1c1e4f'
                },
                {
                  offset: 1,
                  color: '#912b50'
                }
              ],
              global: false
            },
            borderColor: '#3581b3',
            borderWidth: 2
          },
          emphasis: {
            itemStyle: {
              areaColor: '#2AB8FF',
              borderWidth: 0,
              borderColor: '#2AB8FF',
              color: '#333',
              label: {
                show: true
              },
              opacity: 1
            }
          }
        },
        series: [
          {
            name: '算力地图',
            type: 'map',
            map: 'china',
            // top: 240,
            // left: 220,
            zoom: 1.3,
            zlevel: 1,
            roam: true,
            geoIndex: 0,
            label: {
              show: true,
              color: '#fff'
            },
            itemStyle: {
              areaColor: {
                type: 'linear', // linear | radial
                x: 0.5,
                y: 0.5,
                r: 0.9,
                colorStops: [
                  {
                    offset: 0,
                    color: '#1c1e4f'
                  },
                  {
                    offset: 1,
                    color: '#912b50'
                  }
                ],
                global: false
              },
              shadowColor: '#182f68',
              shadowOffsetX: 0,
              shadowOffsetY: 2,
              borderWidth: 0,
              opacity: 1
            },
            emphasis: {
              itemStyle: {
                areaColor: '#2AB8FF99',
                borderWidth: 0,
                borderColor: '#2AB8FF',
                color: '#333',
                label: {
                  show: true
                },
                opacity: 1
              }
            },
            data: this.mapData
          },
          {
            name: '算力资源池',
            type: 'scatter',
            zlevel: 2,
            coordinateSystem: 'geo',
            symbolSize: function (val) {
              return 12 // val[2] / 200
            },
            itemStyle: {
              normal: {
                color: '#2AB8FF',
                shadowBlur: 20,
                shadowColor: '#333'
              }
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            emphasis: {
              itemStyle: {
                color: '#d34839',
                shadowBlur: 40,
                shadowColor: '#d34839'
              }
            },
            data: this.scatterData
          },
          {
            name: '算力资源池关联',
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 3,
            effect: {
              // 括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
              show: true,
              delay: 0,
              period: 4, // 箭头指向速度，值越小速度越快
              trailLength: 0.05, // 特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'circle', // 箭头图标
              symbolSize: 6, // 图标大小
              color: '#fff'
            },
            // symbol: ['none', 'arrow'],
            lineStyle: {
              normal: {
                width: 2, // 尾迹线条宽度
                opacity: 0.5, // 尾迹线条透明度
                curveness: 0.2, // 尾迹线条曲直度
                color: '#02bef9'
              },
              color: 'red'
            },
            data: this.lineData
          }
        ]
      }
    }
  },
  watch: {
    mapData: {
      handler(val) {
        this.myChart.clear()
        this.$set(this.option.series[0], 'data', val)
        this.option && this.myChart.setOption(this.option, true)
      },
      deep: true
    },
    scatterData: {
      handler(val) {
        this.myChart.clear()
        this.$set(this.option.series[1], 'data', val)
        this.option && this.myChart.setOption(this.option, true)
      },
      deep: true
    },
    lineData: {
      handler(val) {
        this.myChart.clear()
        this.$set(this.option.series[2], 'data', val)
        this.option && this.myChart.setOption(this.option, true)
      },
      deep: true
    }
  },
  created() {
    this.debounceResize = debounce(this.resize, 300)
  },
  mounted() {
    this.initChart()
    //  根据窗口大小调整曲线大小
    window.addEventListener('resize', this.debounceResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.debounceResize)
    this.myChart && this.myChart.dispose()
    this.myChart = null
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.timer = null
  },
  methods: {
    initChart() {
      if (this.myChart) {
        // console.log('xx-sadasdasdas')
        this.myChart.clear()
      }
      const chartDom = this.$refs.geoMap
      this.myChart = init(chartDom)
      registerMap('china', mapJson)
      this.option && this.myChart.setOption(this.option)
      this.setScatterCarousel(1, this.scatterData.length)
      this.myChart.on('click', (params) => {
        if (params.componentSubType === 'scatter') {
          this.$emit('scatter-click', params.value[2])
        }
      })
    },
    convertData(data) {
      var res = []
      for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    },
    resize() {
      this.myChart.resize()
      this.$nextTick(() => {
        this.myChart.clear()
        this.option && this.myChart.setOption(this.option, true)
      })
    },
    setActiveScatter(seriesIndex, dataIndex) {
      this.myChart.dispatchAction({
        type: 'downplay',
        seriesIndex
      })
      this.myChart.dispatchAction({
        type: 'highlight',
        seriesIndex,
        dataIndex
      })
      this.myChart.dispatchAction({
        type: 'showTip',
        seriesIndex,
        dataIndex
      })
    },
    setScatterCarousel(seriesIndex, length) {
      let scatterTimer = null
      let count = 0
      const self = this
      const setTimer = function () {
        scatterTimer = setInterval(function () {
          // console.log(1)
          const curId = self.scatterData[count % length].id
          self.$emit('scatter-click', curId)
          setTimeout(() => {
            self.setActiveScatter(seriesIndex, count % length)
            count++
          }, 2000)
        }, 10000)
      }

      setTimer()

      self.myChart.on('mouseover', function (params) {
        scatterTimer && clearInterval(scatterTimer)
        self.setActiveScatter(seriesIndex, params.dataIndex)
      })
      self.myChart.on('mouseout', function () {
        scatterTimer && clearInterval(scatterTimer)
        setTimer()
      })
      this.$once('hook:beforeDestroy', () => {
        // console.log('destoryed')
        clearInterval(scatterTimer)
        scatterTimer = null
      })
    }
  }
}
</script>
