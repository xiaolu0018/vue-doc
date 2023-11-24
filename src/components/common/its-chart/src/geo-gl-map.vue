<template>
  <div ref="geoMap" style="width: 100%; height: 100%">geoMap</div>
</template>
<script>
import 'echarts-gl'
import chinaMapJson from './data/china-new.json'
import { registerMap, init } from '@/utils/echarts'
export default {
  name: 'DcChartGeoGlMap',
  props: {
    barData: {
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
      myChart: null,
      option: {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            const { componentSubType, data } = params
            const mapTip = `${data.name}:<br> 云池数量:${data.value} <br> GPU数量:${data.gpuNum} <br> CPU数量:${data.cpuNum} <br>`
            const otherTip =
              componentSubType === 'bar3D' ? `${data.name}<br> 云池数量:${data.value[2]}` : ''
            return componentSubType === 'map' ? mapTip : otherTip
          }
        },
        visualMap: [
          {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            text: ['bar3D'],
            calculable: false,
            max: 300,
            inRange: {
              color: ['#9ff32b', '#9ff32b'] // 柱图配色
            }
          },
          {
            show: false,
            type: 'continuous',
            seriesIndex: 1,
            text: ['scatter3D'],
            left: 'right',
            max: 100,
            calculable: false,
            inRange: {
              color: ['red', 'blue', 'purple'] // 气泡配色
            }
          }
        ],
        geo3D: {
          map: 'china',
          roam: false,
          // regions: [
          //   {
          //     name: '南海诸岛',
          //     value: 0,
          //     itemStyle: {
          //       normal: {
          //         opacity: 0,
          //         label: {
          //           show: false
          //         }
          //       }
          //     }
          //   }
          // ],
          // environment: new graphic.LinearGradient(
          //   0,
          //   0,
          //   0,
          //   1,
          //   [
          //     {
          //       offset: 0,
          //       color: '#000' // 天空颜色
          //     },
          //     {
          //       offset: 0.7,
          //       color: '#000' // 地面颜色
          //     },
          //     {
          //       offset: 1,
          //       color: '#000' // 地面颜色
          //     }
          //   ],
          //   false
          // ),
          shading: 'lambert',
          lambertMaterial: {
            detailTexture: '/image/bg.png',
            roughness: 0.6,
            textureTiling: 1
          },
          // groundPlane: {
          //   show: true,
          //   lambertMaterial: {
          //     detailTexture: '/image/map_bg.png',
          //     roughness: 0.6,
          //     textureTiling: 1
          //   }
          // },
          itemStyle: {
            areaColor: '#333', // 地图配色
            opacity: 1,
            borderWidth: 0.4,
            borderColor: '#7db41b' // 地图边配色
          },
          label: {
            show: false,
            textStyle: {
              color: '#fff',
              fontSize: 16,
              backgroundColor: 'rgba(0,0,0,1)' // 鼠标移入文字加背景
            }
          },
          emphasis: {
            // 当鼠标放上去  地区区域是否显示名称
            itemStyle: {
              areaColor: '#7db41b' // 鼠标移入地图配色
            },
            label: {
              show: true,
              textStyle: {
                color: '#fff',
                fontSize: 16,
                backgroundColor: 'rgba(0,0,0,1)' // 鼠标移入文字加背景
              }
            }
          },
          light: {
            // 光照阴影
            main: {
              color: '#fff', // 光照颜色
              intensity: 1.2, // 光照强度
              // shadowQuality: 'high', // 阴影亮度
              shadow: true, // 是否显示阴影
              alpha: 55,
              beta: 10
            },
            ambient: {
              intensity: 0.3
            }
          }
        },
        series: [
          {
            name: 'bar3D',
            type: 'bar3D',
            coordinateSystem: 'geo3D',
            barSize: 0.5, // 柱子粗细
            shading: 'lambert',
            opacity: 1,
            bevelSize: 0.5,
            minHeight: 1,
            label: {
              show: false,
              formatter: '{b}'
            },
            data: this.barData
          },
          {
            name: 'scatter3D',
            type: 'scatter3D',
            coordinateSystem: 'geo3D',
            symbol: 'pin',
            symbolSize: 30,
            opacity: 1,
            label: {
              show: false,
              formatter: '{b}'
            },
            itemStyle: {
              borderWidth: 0.5,
              borderColor: '#fff' // 气泡边的颜色
            },
            data: this.scatterData
          },
          // 画线

          {
            type: 'lines3D',
            coordinateSystem: 'geo3D',
            effect: {
              show: false,
              trailWidth: 5,
              trailOpacity: 0.5,
              trailLength: 0.2,
              constantSpeed: 5
            },
            blendMode: 'lighter',
            lineStyle: {
              color: '#9ae5fc',
              width: 1,
              opacity: 0.6
            },
            zlevel: 10,
            data: this.lineData
          }
        ]
      }
    }
  },
  watch: {
    barData: {
      handler(val) {
        this.$set(this.option.series[0], 'data', val)
      },
      deep: true
    },
    scatterData: {
      handler(val) {
        this.$set(this.option.series[1], 'data', val)
      },
      deep: true
    },
    lineData: {
      handler(val) {
        if (val) {
          this.$set(this.option.series[2], 'data', val)
          this.option && this.myChart.setOption(this.option, true)
        }
      },
      deep: true
    }
  },
  mounted() {
    this.initChart()
    //  根据窗口大小调整曲线大小
    window.addEventListener('resize', () => {
      this.resize()
    })
  },
  beforeDestory() {
    window.removeEventListener('resize', () => {
      this.resize()
    })
  },
  methods: {
    initChart() {
      const chartDom = this.$refs.geoMap
      this.myChart = init(chartDom)
      registerMap('china', chinaMapJson)
      this.option && this.myChart.setOption(this.option)
      this.myChart.on('click', (params) => {
        // console.log(params)
        if (params.componentSubType === 'bar3D') {
          this.$emit('scatter-click', params.value)
        }
      })
    },
    resize() {
      this.$nextTick(() => {
        this.myChart.resize()
      })
    }
  }
}
</script>
