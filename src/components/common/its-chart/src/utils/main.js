import getOption from '../options/main'
/**
 * @param option Object
 *
 *
 */
export const defaultConf = {
  tooltip: {
    trigger: 'axis'
  },
  grid: {
    left: '5%',
    right: '5%',
    top: '10%',
    bottom: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: [],
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: '#999'
    }
  },
  yAxis: {
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
  },
  series: []
}
const defaultOption = {
  title: '',
  legend: [],
  data: [],
  xAxisData: [],
  seriesType: ['normal']
}
/**
 *
 * @param {*} echarts
 * @param {*} option
 * @returns
 */
export function mergeOption(echarts, option = defaultOption) {
  const {
    data, // {name: String, value: [String, Arrary]} name 在单个series时作为xAxisData
    legend = [],
    color = [],
    seriesType = [],
    orientation = 'vertical',
    xAxisData = [],
    axisType = 'axisStyle2',
    grid,
    yAxisIndex
  } = option

  const options = getOption(echarts)
  if (!['vertical', 'horizontal'].includes(orientation)) {
    console.warn('orientation is either vertical or horizontal!')
  }
  const isMuti = data.some((d) => Array.isArray(d) || Array.isArray(d.value))
  const axisStyles = options[axisType]
  const xAxis = Object.assign({}, defaultConf.xAxis, {
    data: xAxisData.length ? xAxisData : data.map((d) => d.name),
    ...axisStyles.xAxis
  })
  const sigleyAxis = Object.assign({}, defaultConf.yAxis, {
    ...axisStyles.yAxis
  })
  const yAxis = Array.isArray(axisStyles.yAxis) ? axisStyles.yAxis : sigleyAxis
  const dataZoom = axisStyles?.dataZoom || []
  const mutiSeries = data.map((d, idx) => {
    const curSeriesType = seriesType[idx] || seriesType[0] || 'normal'
    const mutiOption = options[curSeriesType] || options['normal']
    const isMutiData = d.value && Array.isArray(d.value)
    return {
      name: legend[idx], // series名称必须和legend名称对应
      data: isMutiData ? d.value : d,
      stack: d.stack,
      yAxisIndex: yAxisIndex === idx ? 1 : 0, // 双Y
      ...mutiOption
    }
  })
  const singleOption = options[seriesType[0]] || options['normal']
  const singleSeries = [{ name: legend[0] || '', data, ...singleOption }]
  const customConf = {
    legend: {
      data: legend
    },
    grid,
    xAxis: orientation === 'vertical' ? xAxis : yAxis,
    yAxis: orientation === 'vertical' ? yAxis : xAxis,
    dataZoom,
    series: isMuti ? mutiSeries : singleSeries
  }
  if (color.length) customConf.color = color
  return Object.assign({}, defaultConf, customConf)
}
