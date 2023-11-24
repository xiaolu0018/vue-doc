// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入各种图表，图表后缀都为 Chart
import {
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  MapChart,
  LinesChart,
  PictorialBarChart
} from 'echarts/charts'
// 引入提示框，标题，直角坐标系等组件，组件后缀都为 Component
import {
  ToolboxComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  GeoComponent,
  VisualMapComponent,
  DataZoomComponent,
  DataZoomSliderComponent,
  DataZoomInsideComponent
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  GeoComponent,
  VisualMapComponent,
  DataZoomComponent,
  DataZoomSliderComponent,
  DataZoomInsideComponent,
  LineChart,
  BarChart,
  PieChart,
  ScatterChart,
  MapChart,
  LinesChart,
  PictorialBarChart,
  CanvasRenderer
])

const { graphic, init, registerMap } = echarts
export { graphic, init, registerMap }
export default echarts
