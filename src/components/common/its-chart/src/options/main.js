import getSeriesStyles from './seriesStyles'
import * as axisStyles from './axisStyles'
export default (echarts) => ({
  ...getSeriesStyles(echarts),
  ...axisStyles
})
