import { uuid } from '@/utils/unit'

const mxgraph = require('mxgraph')({
  mxImageBasePath: './src/images',
  mxBasePath: './src'
})

function useGraph(container) {
  let _container = container
  const { mxGraph, mxUtils, mxCodec, mxEvent, mxPoint, mxConstants } = mxgraph
  const computedStyle = window.getComputedStyle(_container)
  /** 定义布局宽高等 begin *******************************/
  const base_width = 140
  const base_height = 200
  const base_child_width = 50
  const base_child_height = 50
  const base_detail_width = 200

  // 控制间距
  const space_x = 200
  const space_y = 100
  const space_detail_x = 80
  const padding_detail = 30

  // let scale = 1;
  // const graphWidth = (base_detail_width + base_width + space_x + space_detail_x) * 2 + base_width;
  let containerWidth = Number(computedStyle.width.substring(0, computedStyle.width.length - 2))
  let containerHeight = Number(computedStyle.height.substring(0, computedStyle.height.length - 2))
  // function resize() {
  //   if (containerWidth > graphWidth && containerWidth <= graphWidth * 1.4) {
  //     scale = 1;
  //   } else if (containerWidth > graphWidth * 0.9 && containerWidth <= graphWidth) {
  //     scale = 0.9;
  //   } else if (containerWidth <= graphWidth * 0.9) {
  //     scale = 0.8;
  //   } else if (containerWidth > graphWidth * 1.4) {
  //     scale = 1.2;
  //   }
  // }

  // resize();

  /** 定义布局宽高等 end *******************************/

  function setContainer(container) {
    _container = container
  }

  function setGraphSize(width, height) {
    containerWidth = width
    containerHeight = height
  }
  function createGraph() {
    const graph = new mxGraph(_container)
    graph.setEnabled(false)
    // graph.setPanning(false);
    graph.setTooltips(false)
    // graph.panningHandler.useLeftButtonForPanning = true;
    // graph.panningHandler.ignoreCell = true;
    // graph._container.style.cursor = 'move';
    graph.resizeContainer = false
    mxEvent.disableContextMenu(_container)
    graph.setHtmlLabels(true)
    // graph.zoomTo(scale);

    // graph.centerZoom = false;
    window.addEventListener('resize', () => {
      // resize();
      graph.fit(null, false, 0)
      graph.center(true, true, 0.5, 0.5)

      // var sc = graph.getView().getScale();
      // graph.zoomTo(Math.round(sc/2));
      // graph.zoomTo(scale);

      // console.log(graph.getDefaultParent());
      // const [cell1] = graph.getChildCells(graph.getDefaultParent());
      // const { x, y } = cell1.geometry;
      // console.log('geometry', { x, y });
    })

    configStylesheet(graph)

    return graph
  }

  function decode(graph, xml) {
    const xmlDocument = mxUtils.parseXml(xml)
    const decoder = new mxCodec(xmlDocument)
    const node = xmlDocument.documentElement
    decoder.decode(node, graph.getModel())
  }

  function load(graph, url) {
    const req = mxUtils.load(url)
    const root = req.getDocumentElement()
    const dec = new mxCodec(root.ownerDocument)
    dec.decode(root, graph.getModel())
  }

  function draw(graph, opts = []) {
    graph.getModel().beginUpdate()
    try {
      const parent = graph.getDefaultParent()
      const vetexMap = doDraw(graph, opts, parent)
      Object.keys(vetexMap).forEach((e) => {
        const { current, targets } = vetexMap[e]
        if (targets && targets.length > 0) {
          targets.forEach((t) => {
            const { id, labels, points, style } = t
            const label =
              labels && labels.length > 0
                ? `<div><span>${labels[0]}</span><br /><br /><span>${labels[1]}</span></div>`
                : ''
            const edge = graph.insertEdge(parent, null, label, current, vetexMap[id].current, style)
            edge.geometry.points = points.map(({ x, y }) => new mxPoint(x, y))
          })
        }
      })
    } finally {
      graph.getModel().endUpdate()
      const time = setTimeout(() => {
        clearTimeout(time)
        graph.fit(null, false, 0)
        graph.center(true, true, 0.5, 0.5)
      }, 0)
    }
  }

  function drawEmpty(graph) {
    graph.getModel().beginUpdate()
    try {
      const parent = graph.getDefaultParent()
      const emptyWidth = 300
      const emptyHeight = 50
      const x = (containerWidth - emptyWidth) / 2
      const y = (400 - emptyHeight) / 2
      graph.insertVertex(
        parent,
        null,
        '没有数据可以展示',
        x,
        y,
        emptyWidth,
        emptyHeight,
        'text;rounded=0;fontSize=35;fontColor=#ababab;textOpacity=50;strokeColor=none;fillColor=none;'
      )
    } finally {
      graph.getModel().endUpdate()
    }
  }

  function doDraw(graph, opts, parent) {
    let vetexMap = {}
    opts.forEach((e) => {
      const { id, value, children, x, y, width, height, style, targets, disabled } = e
      let vetexValue = value
      if (value && typeof value !== 'string') {
        const { label, icon } = value
        vetexValue = `<div ${
          disabled ? 'class="gray"' : ''
        }><div><img src="image/resource/${icon}.png" /></div><span>${label}</span></div>`
      }
      const vertex = graph.insertVertex(
        parent,
        id,
        vetexValue,
        x,
        y,
        width,
        height,
        disabled ? style + ';fillColor=#f1f2f6' : style
      )
      vetexMap[id] = { current: vertex, targets }
      if (children && children.length > 0) {
        const childVetexMap = doDraw(graph, children, vertex)
        vetexMap = Object.assign({}, vetexMap, childVetexMap)
      }
    })
    return vetexMap
  }

  function configStylesheet(graph) {
    const defaultStyle = graph.getStylesheet().getDefaultVertexStyle()
    const style = mxUtils.clone(defaultStyle)
    style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE
    style[mxConstants.STYLE_FILLCOLOR] = '#ffffff'
    graph.getStylesheet().putCellStyle('base', style)

    const style1 = mxUtils.clone(style)
    style1[mxConstants.STYLE_STROKECOLOR] = '#DCDFE6'
    graph.getStylesheet().putCellStyle('box', style1)

    const style2 = mxUtils.clone(style1)
    style2[mxConstants.STYLE_STROKECOLOR] = 'none'
    graph.getStylesheet().putCellStyle('child', style2)

    const defaultEdgeStyle = graph.getStylesheet().getDefaultEdgeStyle()
    const edgeStyle = mxUtils.clone(defaultEdgeStyle)
    edgeStyle[mxConstants.STYLE_ROUNDED] = 1
    edgeStyle[mxConstants.STYLE_STROKEWIDTH] = 2
    graph.getStylesheet().putCellStyle('edge', edgeStyle)
  }

  class DrawModel {
    constructor(x, y, w, h, value, style, disabled) {
      this.x = x
      this.y = y
      this.width = w
      this.height = h
      this.id = uuid()
      this.value = value || ''
      this.style = style || 'box'
      this.disabled = !!disabled
      this.targets = []
      this.children = []
    }
    addChild(child) {
      this.children.push(child)
    }
    addTarget(target) {
      this.targets.push(target)
    }
  }

  class TargetModel {
    constructor(id, labels, points, style) {
      this.id = id
      this.labels = labels || []
      this.points = points || []
      this.style = style || 'edge'
    }
  }

  function checkResIsEmpty(overview = {}) {
    const { vpc = 0, ecs = 0, disk = 0, eIp = 0 } = overview || {}
    return Number(vpc) + Number(ecs) + Number(disk) + Number(eIp) === 0
  }

  function convertDrawOpts(overviewData, dynamicData) {
    const {
      Wocloud: overview_wocloud,
      Aliyun: overview_aliyun,
      Tencent: overview_tencent,
      MEC: overview_mec,
      Aws: overview_aws,
      Huawei: overview_huawei
    } = overviewData
    const {
      Wocloud: dynamic_wocloud,
      Aliyun: dynamic_aliyun,
      Tencent: dynamic_tencent,
      MEC: dynamic_mec,
      Aws: dynamic_aws,
      Huawei: dynamic_huawei
    } = dynamicData
    const opts = []
    // 添加中心节点
    const center_width = base_width
    const center_height = base_height
    const center_center_disable = Object.values(overviewData).every((item) => {
      return checkResIsEmpty(item)
    })
    // const center_x = (Math.max(containerWidth, graphWidth) - center_width) / 2;
    const center_x = (containerWidth - center_width) / 2
    const center_y = (containerHeight - center_height) / 2
    const center = new DrawModel(
      center_x,
      center_y,
      center_width,
      center_height,
      null,
      'box',
      center_center_disable
    )
    const center_child_width = base_child_width
    const center_child_height = base_child_height
    const center_child_x = (center_width - center_child_width) / 2
    const center_child_y = (center_height - center_child_height) / 2
    const center_child_value = { label: '骨干网', icon: 'gugan' }
    const center_child = new DrawModel(
      center_child_x,
      center_child_y,
      center_child_width,
      center_child_height,
      center_child_value,
      'child',
      center_center_disable
    )
    center.addChild(center_child)

    // 添加左侧节点
    const left_center_disabled = checkResIsEmpty(overview_aliyun)
    const left_center_width = center_width
    const left_center_height = center_height
    const left_center_x = center_x - left_center_width - space_x
    const left_center_y = center_y
    const left_center = new DrawModel(
      left_center_x,
      left_center_y,
      left_center_width,
      left_center_height,
      null,
      'box',
      left_center_disabled
    )
    const left_center_child_width = center_child_width
    const left_center_child_height = center_child_height
    const left_center_child_x = (left_center_width - left_center_child_width) / 2
    const left_center_child_y = (left_center_height - left_center_child_height) / 2
    const left_center_child_value = { label: '阿里云', icon: 'cloud' }
    const left_center_child = new DrawModel(
      left_center_child_x,
      left_center_child_y,
      left_center_child_width,
      left_center_child_height,
      left_center_child_value,
      'child',
      left_center_disabled
    )
    left_center.addChild(left_center_child)

    center.addTarget(
      new TargetModel(left_center.id, [
        `接入点：${dynamic_aliyun ? dynamic_aliyun['accessPoint'] || 0 : 0}个`,
        `入：${dynamic_aliyun ? dynamic_aliyun['enterBandwitch'] || 0 : 0}kbps，出：${
          dynamic_aliyun ? dynamic_aliyun['outBandwitch'] || 0 : 0
        }kbps`
      ])
    )

    // 添加左侧详情
    const left_center_detail_width = base_detail_width
    const left_center_detail_height = left_center_height
    const left_center_detail_x = left_center_x - left_center_detail_width - space_detail_x
    const left_center_detail_y = left_center_y
    const left_center_detail = new DrawModel(
      left_center_detail_x,
      left_center_detail_y,
      left_center_detail_width,
      left_center_detail_height,
      null,
      'box',
      left_center_disabled
    )
    // 添加详情子项
    const left_center_detail_0_width = center_child_width
    const left_center_detail_0_height = center_child_width
    const left_center_detail_0_x = padding_detail
    const left_center_detail_0_y = padding_detail
    const left_center_detail_0_value = {
      label: `VPC：${overview_aliyun ? overview_aliyun['vpc'] || 0 : 0}个`,
      icon: 'vpc'
    }
    const left_center_detail_0 = new DrawModel(
      left_center_detail_0_x,
      left_center_detail_0_y,
      left_center_detail_0_width,
      left_center_detail_0_height,
      left_center_detail_0_value,
      'child',
      left_center_disabled
    )
    left_center_detail.addChild(left_center_detail_0)

    const left_center_detail_1_width = center_child_width
    const left_center_detail_1_height = center_child_width
    const left_center_detail_1_x =
      left_center_detail_width - left_center_detail_0_width - padding_detail
    const left_center_detail_1_y = padding_detail
    const left_center_detail_1_value = {
      label: `虚拟机：${overview_aliyun ? overview_aliyun['ecs'] || 0 : 0}个`,
      icon: 'vm'
    }
    const left_center_detail_1 = new DrawModel(
      left_center_detail_1_x,
      left_center_detail_1_y,
      left_center_detail_1_width,
      left_center_detail_1_height,
      left_center_detail_1_value,
      'child',
      left_center_disabled
    )
    left_center_detail.addChild(left_center_detail_1)

    const left_center_detail_2_width = center_child_width
    const left_center_detail_2_height = center_child_width
    const left_center_detail_2_x = padding_detail
    const left_center_detail_2_y =
      left_center_detail_height - left_center_detail_0_height - padding_detail
    const left_center_detail_2_value = {
      label: `磁盘：${overview_aliyun ? overview_aliyun['disk'] || 0 : 0}个`,
      icon: 'disk'
    }
    const left_center_detail_2 = new DrawModel(
      left_center_detail_2_x,
      left_center_detail_2_y,
      left_center_detail_2_width,
      left_center_detail_2_height,
      left_center_detail_2_value,
      'child',
      left_center_disabled
    )
    left_center_detail.addChild(left_center_detail_2)

    const left_center_detail_3_width = center_child_width
    const left_center_detail_3_height = center_child_width
    const left_center_detail_3_x =
      left_center_detail_width - left_center_detail_0_width - padding_detail
    const left_center_detail_3_y =
      left_center_detail_height - left_center_detail_0_height - padding_detail
    const left_center_detail_3_value = {
      label: `弹性IP：${overview_aliyun ? overview_aliyun['eIp'] || 0 : 0}个`,
      icon: 'ip'
    }
    const left_center_detail_3 = new DrawModel(
      left_center_detail_3_x,
      left_center_detail_3_y,
      left_center_detail_3_width,
      left_center_detail_3_height,
      left_center_detail_3_value,
      'child',
      left_center_disabled
    )
    left_center_detail.addChild(left_center_detail_3)

    left_center.addTarget(new TargetModel(left_center_detail.id))

    // 添加左上侧节点
    const left_top_disabled = checkResIsEmpty(overview_wocloud)
    const left_top_width = center_width
    const left_top_height = center_height
    const left_top_x = center_x - left_top_width - space_x
    const left_top_y = center_y - left_top_height - space_y
    const left_top = new DrawModel(
      left_top_x,
      left_top_y,
      left_top_width,
      left_top_height,
      null,
      'box',
      left_top_disabled
    )
    const left_top_child_width = center_child_width
    const left_top_child_height = center_child_height
    const left_top_child_x = (left_top_width - left_top_child_width) / 2
    const left_top_child_y = (left_top_height - left_top_child_height) / 2
    const left_top_child_value = { label: '联通云', icon: 'cloud' }
    const left_top_child = new DrawModel(
      left_top_child_x,
      left_top_child_y,
      left_top_child_width,
      left_top_child_height,
      left_top_child_value,
      'child',
      left_top_disabled
    )
    left_top.addChild(left_top_child)

    center.addTarget(
      new TargetModel(
        left_top.id,
        [
          `接入点：${dynamic_wocloud ? dynamic_wocloud['accessPoint'] || 0 : 0}个`,
          `入：${dynamic_wocloud ? dynamic_wocloud['enterBandwitch'] || 0 : 0}kbps，出：${
            dynamic_wocloud ? dynamic_wocloud['outBandwitch'] || 0 : 0
          }kbps`
        ],
        [
          {
            x: center_x,
            y: left_top_y + left_top_height / 2
          }
        ],
        'edge;spacingRight=200;'
      )
    )

    // 添加左上侧详情
    const left_top_detail_width = base_detail_width
    const left_top_detail_height = left_top_height
    const left_top_detail_x = left_top_x - left_top_detail_width - space_detail_x
    const left_top_detail_y = left_top_y
    const left_top_detail = new DrawModel(
      left_top_detail_x,
      left_top_detail_y,
      left_top_detail_width,
      left_top_detail_height,
      null,
      'box',
      left_top_disabled
    )
    // 添加详情子项
    const left_top_detail_0_width = center_child_width
    const left_top_detail_0_height = center_child_width
    const left_top_detail_0_x = padding_detail
    const left_top_detail_0_y = padding_detail
    const left_top_detail_0_value = {
      label: `VPC：${overview_wocloud ? overview_wocloud['vpc'] || 0 : 0}个`,
      icon: 'vpc'
    }
    const left_top_detail_0 = new DrawModel(
      left_top_detail_0_x,
      left_top_detail_0_y,
      left_top_detail_0_width,
      left_top_detail_0_height,
      left_top_detail_0_value,
      'child',
      left_top_disabled
    )
    left_top_detail.addChild(left_top_detail_0)

    const left_top_detail_1_width = center_child_width
    const left_top_detail_1_height = center_child_width
    const left_top_detail_1_x = left_top_detail_width - left_top_detail_0_width - padding_detail
    const left_top_detail_1_y = padding_detail
    const left_top_detail_1_value = {
      label: `虚拟机：${overview_wocloud ? overview_wocloud['ecs'] || 0 : 0}个`,
      icon: 'vm'
    }
    const left_top_detail_1 = new DrawModel(
      left_top_detail_1_x,
      left_top_detail_1_y,
      left_top_detail_1_width,
      left_top_detail_1_height,
      left_top_detail_1_value,
      'child',
      left_top_disabled
    )
    left_top_detail.addChild(left_top_detail_1)

    const left_top_detail_2_width = center_child_width
    const left_top_detail_2_height = center_child_width
    const left_top_detail_2_x = padding_detail
    const left_top_detail_2_y = left_top_detail_height - left_top_detail_0_height - padding_detail
    const left_top_detail_2_value = {
      label: `磁盘：${overview_wocloud ? overview_wocloud['disk'] || 0 : 0}个`,
      icon: 'disk'
    }
    const left_top_detail_2 = new DrawModel(
      left_top_detail_2_x,
      left_top_detail_2_y,
      left_top_detail_2_width,
      left_top_detail_2_height,
      left_top_detail_2_value,
      'child',
      left_top_disabled
    )
    left_top_detail.addChild(left_top_detail_2)

    const left_top_detail_3_width = center_child_width
    const left_top_detail_3_height = center_child_width
    const left_top_detail_3_x = left_top_detail_width - left_top_detail_0_width - padding_detail
    const left_top_detail_3_y = left_top_detail_height - left_top_detail_0_height - padding_detail
    const left_top_detail_3_value = {
      label: `弹性IP：${overview_wocloud ? overview_wocloud['eIp'] || 0 : 0}个`,
      icon: 'ip'
    }
    const left_top_detail_3 = new DrawModel(
      left_top_detail_3_x,
      left_top_detail_3_y,
      left_top_detail_3_width,
      left_top_detail_3_height,
      left_top_detail_3_value,
      'child',
      left_top_disabled
    )
    left_top_detail.addChild(left_top_detail_3)

    left_top.addTarget(new TargetModel(left_top_detail.id))

    // 添加左下侧节点
    const left_bottom_disabled = checkResIsEmpty(overview_aws)
    const left_bottom_width = center_width
    const left_bottom_height = center_height
    const left_bottom_x = center_x - left_bottom_width - space_x
    const left_bottom_y = center_y + center_height + space_y
    const left_bottom = new DrawModel(
      left_bottom_x,
      left_bottom_y,
      left_bottom_width,
      left_bottom_height,
      null,
      'box',
      left_bottom_disabled
    )
    const left_bottom_child_width = center_child_width
    const left_bottom_child_height = center_child_height
    const left_bottom_child_x = (left_bottom_width - left_bottom_child_width) / 2
    const left_bottom_child_y = (left_bottom_height - left_bottom_child_height) / 2
    const left_bottom_child_value = { label: '亚马逊云', icon: 'cloud' }
    const left_bottom_child = new DrawModel(
      left_bottom_child_x,
      left_bottom_child_y,
      left_bottom_child_width,
      left_bottom_child_height,
      left_bottom_child_value,
      'child',
      left_bottom_disabled
    )
    left_bottom.addChild(left_bottom_child)

    center.addTarget(
      new TargetModel(
        left_bottom.id,
        [
          `接入点：${dynamic_aws ? dynamic_aws['accessPoint'] || 0 : 0}个`,
          `入：${dynamic_aws ? dynamic_aws['enterBandwitch'] || 0 : 0}kbps，出：${
            dynamic_aws ? dynamic_aws['outBandwitch'] || 0 : 0
          }kbps`
        ],
        [
          {
            x: center_x,
            y: left_bottom_y + left_bottom_height / 2
          }
        ],
        'edge;spacingRight=200;'
      )
    )

    // 添加左下侧详情
    const left_bottom_detail_width = base_detail_width
    const left_bottom_detail_height = left_top_height
    const left_bottom_detail_x = left_bottom_x - left_bottom_detail_width - space_detail_x
    const left_bottom_detail_y = left_bottom_y
    const left_bottom_detail = new DrawModel(
      left_bottom_detail_x,
      left_bottom_detail_y,
      left_bottom_detail_width,
      left_bottom_detail_height,
      null,
      'box',
      left_bottom_disabled
    )
    // 添加详情子项
    const left_bottom_detail_0_width = center_child_width
    const left_bottom_detail_0_height = center_child_width
    const left_bottom_detail_0_x = padding_detail
    const left_bottom_detail_0_y = padding_detail
    const left_bottom_detail_0_value = {
      label: `VPC：${overview_aws ? overview_aws['vpc'] || 0 : 0}个`,
      icon: 'vpc'
    }
    const left_bottom_detail_0 = new DrawModel(
      left_bottom_detail_0_x,
      left_bottom_detail_0_y,
      left_bottom_detail_0_width,
      left_bottom_detail_0_height,
      left_bottom_detail_0_value,
      'child',
      left_bottom_disabled
    )
    left_bottom_detail.addChild(left_bottom_detail_0)

    const left_bottom_detail_1_width = center_child_width
    const left_bottom_detail_1_height = center_child_width
    const left_bottom_detail_1_x =
      left_bottom_detail_width - left_bottom_detail_0_width - padding_detail
    const left_bottom_detail_1_y = padding_detail
    const left_bottom_detail_1_value = {
      label: `虚拟机：${overview_aws ? overview_aws['ecs'] || 0 : 0}个`,
      icon: 'vm'
    }
    const left_bottom_detail_1 = new DrawModel(
      left_bottom_detail_1_x,
      left_bottom_detail_1_y,
      left_bottom_detail_1_width,
      left_bottom_detail_1_height,
      left_bottom_detail_1_value,
      'child',
      left_bottom_disabled
    )
    left_bottom_detail.addChild(left_bottom_detail_1)

    const left_bottom_detail_2_width = center_child_width
    const left_bottom_detail_2_height = center_child_width
    const left_bottom_detail_2_x = padding_detail
    const left_bottom_detail_2_y =
      left_bottom_detail_height - left_bottom_detail_0_height - padding_detail
    const left_bottom_detail_2_value = {
      label: `磁盘：${overview_aws ? overview_aws['disk'] || 0 : 0}个`,
      icon: 'disk'
    }
    const left_bottom_detail_2 = new DrawModel(
      left_bottom_detail_2_x,
      left_bottom_detail_2_y,
      left_bottom_detail_2_width,
      left_bottom_detail_2_height,
      left_bottom_detail_2_value,
      'child',
      left_bottom_disabled
    )
    left_bottom_detail.addChild(left_bottom_detail_2)

    const left_bottom_detail_3_width = center_child_width
    const left_bottom_detail_3_height = center_child_width
    const left_bottom_detail_3_x =
      left_bottom_detail_width - left_bottom_detail_0_width - padding_detail
    const left_bottom_detail_3_y =
      left_bottom_detail_height - left_bottom_detail_0_height - padding_detail
    const left_bottom_detail_3_value = {
      label: `弹性IP：${overview_aws ? overview_aws['eIp'] || 0 : 0}个`,
      icon: 'ip'
    }
    const left_bottom_detail_3 = new DrawModel(
      left_bottom_detail_3_x,
      left_bottom_detail_3_y,
      left_bottom_detail_3_width,
      left_bottom_detail_3_height,
      left_bottom_detail_3_value,
      'child',
      left_bottom_disabled
    )
    left_bottom_detail.addChild(left_bottom_detail_3)

    left_bottom.addTarget(new TargetModel(left_bottom_detail.id))

    // 添加右侧节点
    const right_center_disabled = checkResIsEmpty(overview_tencent)
    const right_center_width = center_width
    const right_center_height = center_height
    const right_center_x = center_x + center_width + space_x
    const right_center_y = center_y
    const right_center = new DrawModel(
      right_center_x,
      right_center_y,
      right_center_width,
      right_center_height,
      null,
      'box',
      right_center_disabled
    )
    const right_center_child_width = center_child_width
    const right_center_child_height = center_child_height
    const right_center_child_x = (right_center_width - right_center_child_width) / 2
    const right_center_child_y = (right_center_height - right_center_child_height) / 2
    const right_center_child_value = { label: '腾讯云', icon: 'cloud' }
    const right_center_child = new DrawModel(
      right_center_child_x,
      right_center_child_y,
      right_center_child_width,
      right_center_child_height,
      right_center_child_value,
      'child',
      right_center_disabled
    )
    right_center.addChild(right_center_child)

    center.addTarget(
      new TargetModel(right_center.id, [
        `接入点：${dynamic_tencent ? dynamic_tencent['accessPoint'] || 0 : 0}个`,
        `入：${dynamic_tencent ? dynamic_tencent['enterBandwitch'] || 0 : 0}kbps，出：${
          dynamic_tencent ? dynamic_tencent['outBandwitch'] || 0 : 0
        }kbps`
      ])
    )

    // 添加右侧详情
    const right_center_detail_width = base_detail_width
    const right_center_detail_height = right_center_height
    const right_center_detail_x = right_center_x + right_center_width + space_detail_x
    const right_center_detail_y = right_center_y
    const right_center_detail = new DrawModel(
      right_center_detail_x,
      right_center_detail_y,
      right_center_detail_width,
      right_center_detail_height,
      null,
      'box',
      right_center_disabled
    )
    // 添加详情子项
    const right_center_detail_0_width = center_child_width
    const right_center_detail_0_height = center_child_width
    const right_center_detail_0_x = padding_detail
    const right_center_detail_0_y = padding_detail
    const right_center_detail_0_value = {
      label: `VPC：${overview_tencent ? overview_tencent['vpc'] || 0 : 0}个`,
      icon: 'vpc'
    }
    const right_center_detail_0 = new DrawModel(
      right_center_detail_0_x,
      right_center_detail_0_y,
      right_center_detail_0_width,
      right_center_detail_0_height,
      right_center_detail_0_value,
      'child',
      right_center_disabled
    )
    right_center_detail.addChild(right_center_detail_0)

    const right_center_detail_1_width = center_child_width
    const right_center_detail_1_height = center_child_width
    const right_center_detail_1_x =
      right_center_detail_width - right_center_detail_0_width - padding_detail
    const right_center_detail_1_y = padding_detail
    const right_center_detail_1_value = {
      label: `虚拟机：${overview_tencent ? overview_tencent['ecs'] || 0 : 0}个`,
      icon: 'vm'
    }
    const right_center_detail_1 = new DrawModel(
      right_center_detail_1_x,
      right_center_detail_1_y,
      right_center_detail_1_width,
      right_center_detail_1_height,
      right_center_detail_1_value,
      'child',
      right_center_disabled
    )
    right_center_detail.addChild(right_center_detail_1)

    const right_center_detail_2_width = center_child_width
    const right_center_detail_2_height = center_child_width
    const right_center_detail_2_x = padding_detail
    const right_center_detail_2_y =
      right_center_detail_height - right_center_detail_0_height - padding_detail
    const right_center_detail_2_value = {
      label: `磁盘：${overview_tencent ? overview_tencent['disk'] || 0 : 0}个`,
      icon: 'disk'
    }
    const right_center_detail_2 = new DrawModel(
      right_center_detail_2_x,
      right_center_detail_2_y,
      right_center_detail_2_width,
      right_center_detail_2_height,
      right_center_detail_2_value,
      'child',
      right_center_disabled
    )
    right_center_detail.addChild(right_center_detail_2)

    const right_center_detail_3_width = center_child_width
    const right_center_detail_3_height = center_child_width
    const right_center_detail_3_x =
      right_center_detail_width - right_center_detail_0_width - padding_detail
    const right_center_detail_3_y =
      right_center_detail_height - right_center_detail_0_height - padding_detail
    const right_center_detail_3_value = {
      label: `弹性IP：${overview_tencent ? overview_tencent['eIp'] || 0 : 0}个`,
      icon: 'ip'
    }
    const right_center_detail_3 = new DrawModel(
      right_center_detail_3_x,
      right_center_detail_3_y,
      right_center_detail_3_width,
      right_center_detail_3_height,
      right_center_detail_3_value,
      'child',
      right_center_disabled
    )
    right_center_detail.addChild(right_center_detail_3)

    right_center.addTarget(new TargetModel(right_center_detail.id))

    // 添加右上侧节点
    const right_top_disabled = checkResIsEmpty(overview_huawei)
    const right_top_width = center_width
    const right_top_height = center_height
    const right_top_x = center_x + center_width + space_x
    const right_top_y = center_y - right_top_height - space_y
    const right_top = new DrawModel(
      right_top_x,
      right_top_y,
      right_top_width,
      right_top_height,
      null,
      'box',
      right_top_disabled
    )
    const right_top_child_width = center_child_width
    const right_top_child_height = center_child_height
    const right_top_child_x = (right_top_width - right_top_child_width) / 2
    const right_top_child_y = (right_top_height - right_top_child_height) / 2
    const right_top_child_value = { label: '华为云', icon: 'cloud' }
    const right_top_child = new DrawModel(
      right_top_child_x,
      right_top_child_y,
      right_top_child_width,
      right_top_child_height,
      right_top_child_value,
      'child',
      right_top_disabled
    )
    right_top.addChild(right_top_child)

    center.addTarget(
      new TargetModel(
        right_top.id,
        [
          `接入点：${dynamic_huawei ? dynamic_huawei['accessPoint'] || 0 : 0}个`,
          `入：${dynamic_huawei ? dynamic_huawei['enterBandwitch'] || 0 : 0}kbps，出：${
            dynamic_huawei ? dynamic_huawei['outBandwitch'] || 0 : 0
          }kbps`
        ],
        [
          {
            x: center_x + center_width,
            y: right_top_y + right_top_height / 2
          }
        ],
        'edge;spacingLeft=200;'
      )
    )

    // 添加右上侧详情
    const right_top_detail_width = base_detail_width
    const right_top_detail_height = right_top_height
    const right_top_detail_x = right_top_x + right_top_width + space_detail_x
    const right_top_detail_y = right_top_y
    const right_top_detail = new DrawModel(
      right_top_detail_x,
      right_top_detail_y,
      right_top_detail_width,
      right_top_detail_height,
      null,
      'box',
      right_top_disabled
    )
    // 添加详情子项
    const right_top_detail_0_width = center_child_width
    const right_top_detail_0_height = center_child_width
    const right_top_detail_0_x = padding_detail
    const right_top_detail_0_y = padding_detail
    const right_top_detail_0_value = {
      label: `VPC：${overview_huawei ? overview_huawei['vpc'] || 0 : 0}个`,
      icon: 'vpc'
    }
    const right_top_detail_0 = new DrawModel(
      right_top_detail_0_x,
      right_top_detail_0_y,
      right_top_detail_0_width,
      right_top_detail_0_height,
      right_top_detail_0_value,
      'child',
      right_top_disabled
    )
    right_top_detail.addChild(right_top_detail_0)

    const right_top_detail_1_width = center_child_width
    const right_top_detail_1_height = center_child_width
    const right_top_detail_1_x = right_top_detail_width - right_top_detail_0_width - padding_detail
    const right_top_detail_1_y = padding_detail
    const right_top_detail_1_value = {
      label: `虚拟机：${overview_huawei ? overview_huawei['ecs'] || 0 : 0}个`,
      icon: 'vm'
    }
    const right_top_detail_1 = new DrawModel(
      right_top_detail_1_x,
      right_top_detail_1_y,
      right_top_detail_1_width,
      right_top_detail_1_height,
      right_top_detail_1_value,
      'child',
      right_top_disabled
    )
    right_top_detail.addChild(right_top_detail_1)

    const right_top_detail_2_width = center_child_width
    const right_top_detail_2_height = center_child_width
    const right_top_detail_2_x = padding_detail
    const right_top_detail_2_y =
      right_top_detail_height - right_top_detail_0_height - padding_detail
    const right_top_detail_2_value = {
      label: `磁盘：${overview_huawei ? overview_huawei['disk'] || 0 : 0}个`,
      icon: 'disk'
    }
    const right_top_detail_2 = new DrawModel(
      right_top_detail_2_x,
      right_top_detail_2_y,
      right_top_detail_2_width,
      right_top_detail_2_height,
      right_top_detail_2_value,
      'child',
      right_top_disabled
    )
    right_top_detail.addChild(right_top_detail_2)

    const right_top_detail_3_width = center_child_width
    const right_top_detail_3_height = center_child_width
    const right_top_detail_3_x = right_top_detail_width - right_top_detail_0_width - padding_detail
    const right_top_detail_3_y =
      right_top_detail_height - right_top_detail_0_height - padding_detail
    const right_top_detail_3_value = {
      label: `弹性IP：${overview_huawei ? overview_huawei['eIp'] || 0 : 0}个`,
      icon: 'ip'
    }
    const right_top_detail_3 = new DrawModel(
      right_top_detail_3_x,
      right_top_detail_3_y,
      right_top_detail_3_width,
      right_top_detail_3_height,
      right_top_detail_3_value,
      'child',
      right_top_disabled
    )
    right_top_detail.addChild(right_top_detail_3)

    right_top.addTarget(new TargetModel(right_top_detail.id))

    // 添加右下侧节点
    const right_bottom_disabled = checkResIsEmpty(overview_mec)
    const right_bottom_width = center_width
    const right_bottom_height = center_height
    const right_bottom_x = center_x + center_width + space_x
    const right_bottom_y = center_y + center_height + space_y
    const right_bottom = new DrawModel(
      right_bottom_x,
      right_bottom_y,
      right_bottom_width,
      right_bottom_height,
      null,
      'box',
      right_bottom_disabled
    )
    const right_bottom_child_width = center_child_width
    const right_bottom_child_height = center_child_height
    const right_bottom_child_x = (right_bottom_width - right_bottom_child_width) / 2
    const right_bottom_child_y = (right_bottom_height - right_bottom_child_height) / 2
    const right_bottom_child_value = { label: '边缘云', icon: 'cloud' }
    const right_bottom_child = new DrawModel(
      right_bottom_child_x,
      right_bottom_child_y,
      right_bottom_child_width,
      right_bottom_child_height,
      right_bottom_child_value,
      'child',
      right_bottom_disabled
    )
    right_bottom.addChild(right_bottom_child)

    center.addTarget(
      new TargetModel(
        right_bottom.id,
        [
          `接入点：${dynamic_mec ? dynamic_mec['accessPoint'] || 0 : 0}个`,
          `入：${dynamic_mec ? dynamic_mec['enterBandwitch'] || 0 : 0}kbps，出：${
            dynamic_mec ? dynamic_mec['outBandwitch'] || 0 : 0
          }kbps`
        ],
        [
          {
            x: center_x + center_width,
            y: right_bottom_y + right_bottom_height / 2
          }
        ],
        'edge;spacingLeft=200;'
      )
    )

    // 添加右下侧详情
    const right_bottom_detail_width = base_detail_width
    const right_bottom_detail_height = right_bottom_height
    const right_bottom_detail_x = right_bottom_x + right_bottom_width + space_detail_x
    const right_bottom_detail_y = right_bottom_y
    const right_bottom_detail = new DrawModel(
      right_bottom_detail_x,
      right_bottom_detail_y,
      right_bottom_detail_width,
      right_bottom_detail_height,
      null,
      'box',
      right_bottom_disabled
    )
    // 添加详情子项
    const right_bottom_detail_0_width = center_child_width
    const right_bottom_detail_0_height = center_child_width
    const right_bottom_detail_0_x = padding_detail
    const right_bottom_detail_0_y = padding_detail
    const right_bottom_detail_0_value = {
      label: `VPC：${overview_mec ? overview_mec['vpc'] || 0 : 0}个`,
      icon: 'vpc'
    }
    const right_bottom_detail_0 = new DrawModel(
      right_bottom_detail_0_x,
      right_bottom_detail_0_y,
      right_bottom_detail_0_width,
      right_bottom_detail_0_height,
      right_bottom_detail_0_value,
      'child',
      right_bottom_disabled
    )
    right_bottom_detail.addChild(right_bottom_detail_0)

    const right_bottom_detail_1_width = center_child_width
    const right_bottom_detail_1_height = center_child_width
    const right_bottom_detail_1_x =
      right_bottom_detail_width - right_bottom_detail_0_width - padding_detail
    const right_bottom_detail_1_y = padding_detail
    const right_bottom_detail_1_value = {
      label: `虚拟机：${overview_mec ? overview_mec['ecs'] || 0 : 0}个`,
      icon: 'vm'
    }
    const right_bottom_detail_1 = new DrawModel(
      right_bottom_detail_1_x,
      right_bottom_detail_1_y,
      right_bottom_detail_1_width,
      right_bottom_detail_1_height,
      right_bottom_detail_1_value,
      'child',
      right_bottom_disabled
    )
    right_bottom_detail.addChild(right_bottom_detail_1)

    const right_bottom_detail_2_width = center_child_width
    const right_bottom_detail_2_height = center_child_width
    const right_bottom_detail_2_x = padding_detail
    const right_bottom_detail_2_y =
      right_bottom_detail_height - right_bottom_detail_0_height - padding_detail
    const right_bottom_detail_2_value = {
      label: `磁盘：${overview_mec ? overview_mec['disk'] || 0 : 0}个`,
      icon: 'disk'
    }
    const right_bottom_detail_2 = new DrawModel(
      right_bottom_detail_2_x,
      right_bottom_detail_2_y,
      right_bottom_detail_2_width,
      right_bottom_detail_2_height,
      right_bottom_detail_2_value,
      'child',
      right_bottom_disabled
    )
    right_bottom_detail.addChild(right_bottom_detail_2)

    const right_bottom_detail_3_width = center_child_width
    const right_bottom_detail_3_height = center_child_width
    const right_bottom_detail_3_x =
      right_bottom_detail_width - right_bottom_detail_0_width - padding_detail
    const right_bottom_detail_3_y =
      right_bottom_detail_height - right_bottom_detail_0_height - padding_detail
    const right_bottom_detail_3_value = {
      label: `弹性IP：${overview_mec ? overview_mec['eIp'] || 0 : 0}个`,
      icon: 'ip'
    }
    const right_bottom_detail_3 = new DrawModel(
      right_bottom_detail_3_x,
      right_bottom_detail_3_y,
      right_bottom_detail_3_width,
      right_bottom_detail_3_height,
      right_bottom_detail_3_value,
      'child',
      right_bottom_disabled
    )
    right_bottom_detail.addChild(right_bottom_detail_3)

    right_bottom.addTarget(new TargetModel(right_bottom_detail.id))

    opts.push(center)
    opts.push(left_center)
    opts.push(left_center_detail)
    opts.push(left_top)
    opts.push(left_top_detail)
    opts.push(left_bottom)
    opts.push(left_bottom_detail)
    opts.push(right_center)
    opts.push(right_center_detail)
    opts.push(right_top)
    opts.push(right_top_detail)
    opts.push(right_bottom)
    opts.push(right_bottom_detail)
    return opts
  }

  function clear(graph) {
    const cells = graph.getChildVertices(graph.getDefaultParent())
    graph.removeCells(cells)
  }

  return {
    setContainer,
    setGraphSize,
    createGraph,
    decode,
    load,
    draw,
    drawEmpty,
    convertDrawOpts,
    clear
  }
}

export { mxgraph, useGraph }
