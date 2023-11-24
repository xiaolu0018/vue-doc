import G6 from '@antv/g6'
import { sortNodesByConnection, getConnectedNodePositions } from './utils'
const bgColor = '#d2edff'
const combobgColor = '#EFF9FF'
const borderColor = '#0095FF'
// todo: 自定义布局
const _customLayout = {
  name: 'custom-layout',
  type: 'layout',
  cb: () => ({
    init(data) {
      const self = this
      self.combos = data.combos
      self.nodes = sortNodesByConnection(data)
      self.edges = data.edges
    },
    execute() {
      // todo
      const self = this
      const step = 100
      const rank = 100
      //  self.nodes = self.nodes.map((n, idx)=> {
      //    n.x = step * (idx + 1)
      //    n.y = rank * (idx + 1)
      //  })
      console.log(111)
    },
    layout(data) {
      const self = this
      self.init(data)
      self.execute()
    },
    updateCfg(cfg) {
      const self = this
      Util.mix(self, cfg)
    },
    destroy() {
      const self = this
      self.positions = null
      self.nodes = null
      self.edges = null
      self.destroyed = true
    }
  })
}

const cloudPoolCombo = {
  name: 'cloud-pool-combo',
  type: 'combo',
  cb: () => ({
    drawShape: function drawShape(cfg, group) {
      const self = this
      // Get the padding from the configuration
      cfg.padding = cfg.padding || [50, 20, 20, 20]
      // Get the shape's style, where the style.width and style.height correspond to the width and height in the figure of Illustration of Built-in Rect Combo
      const style = self.getShapeStyle(cfg)
      // Add a rect shape as the keyShape which is the same as the extended rect Combo
      const rect = group.addShape('rect', {
        attrs: {
          ...style,
          x: -style.width / 2 - (cfg.padding[3] - cfg.padding[1]) / 2,
          y: -style.height / 2 - (cfg.padding[0] - cfg.padding[2]) / 2,
          width: style.width,
          height: style.height,
          stroke: borderColor,
          fill: combobgColor,
          radius: 6
        },
        draggable: true,
        name: 'combo-keyShape'
      })
      return rect
    }
  }),
  extend: 'rect'
}

const serviceNode = {
  name: 'service-node',
  type: 'node',
  cb: (self) => ({
    drawShape(cfg, group) {
      const r = 6
      const isScene = cfg.resourceType === 'SCENE'
      let mode
      try {
        mode = self?.graph?.getCurrentMode?.()
      } catch (error) {
        console.log(mode)
      }
      // 边框
      const shape = group.addShape('rect', {
        attrs: {
          x: 0,
          y: 0,
          width: 60,
          height: 60,
          stroke: borderColor,
          fill: bgColor,
          radius: r,
          lineDash: isScene && mode === 'viewOnly' && [4, 4]
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'service-node-main-box',
        draggable: false
      })
      // logo
      group.addShape('image', {
        attrs: {
          x: 8,
          y: 10,
          height: 40,
          width: 44,
          cursor: 'pointer',
          img: cfg.img
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'service-node-icon',
        draggable: true
      })
      // label
      group.addShape('text', {
        attrs: {
          textBaseline: 'top',
          textAlign: 'center',
          x: 30,
          y: 65,
          lineHeight: 20,
          text: cfg.label,
          fill: '#595959'
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'service-node-label'
      })

      return shape
    },
    // draw anchor-point circles according to the anchorPoints in afterDraw
    afterDraw(cfg, group) {
      const mode = self?.graph?.getCurrentMode()
      if (mode === 'viewOnly') return
      const bbox = group.getChildren()[0].getBBox()
      const anchorPoints = this.getAnchorPoints(cfg)
      anchorPoints.forEach((anchorPos, i) => {
        group.addShape('circle', {
          attrs: {
            r: 5,
            x: bbox.x + bbox.width * anchorPos[0],
            y: bbox.y + bbox.height * anchorPos[1],
            fill: '#fff',
            stroke: '#5F95FF'
          },
          name: `anchor-point`, // the name, for searching by group.find(ele => ele.get('name') === 'anchor-point')
          anchorPointIdx: i, // flag the idx of the anchor-point circle
          links: 0, // cache the number of edges connected to this shape
          visible: false, // invisible by default, shows up when links > 1 or the node is in showAnchors state
          draggable: true, // allow to catch the drag events on this shape
          parentId: cfg.id,
          resourceType: cfg.resourceType,
          linkableNodes: cfg.related ? cfg.related.split('|') : cfg.related // linkable nodes
        })
      })
    },
    getAnchorPoints(cfg) {
      return (
        cfg.anchorPoints || [
          [0, 0.5],
          [0.5, 0],
          [1, 0.5],
          [0.5, 1]
        ]
      )
    },
    // response the state changes and show/hide the link-point circles
    setState(name, value, item) {
      // 显示锚点
      if (name === 'showAnchors') {
        const anchorPoints = item
          .getContainer()
          .findAll((ele) => ele.get('name') === 'anchor-point')
        anchorPoints.forEach((point) => {
          if (value) point.show()
          else point.hide()
        })
      }
      // 选择状态
      else if (name === 'active') {
        const cfg = item.getModel()
        const isScene = cfg.resourceType === 'SCENE'
        let mode
        try {
          mode = self?.graph?.getCurrentMode?.()
        } catch (error) {
          // console.warn(error)
        }

        if (isScene && mode === 'viewOnly') {
          const rect = item
            .getContainer()
            .findAll((ele) => ele.get('name') === 'service-node-main-box')
          rect[0]?.attr('lineWidth', value ? 2 : 1)
        }
      }
      // todo: 进行中
      else if (name === 'running') {
      }
    }
  })
}

export const bgAminate = {
  name: 'background-animate',
  type: 'node',
  cb: () => ({
    afterDraw(cfg, group) {
      console.log(cfg)
      const r = cfg.size[0] / 2
      const back1 = group.addShape('circle', {
        zIndex: -3,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.style.fill,
          opacity: 0.6
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'back1-shape'
      })
      const back2 = group.addShape('circle', {
        zIndex: -2,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.style.fill,
          opacity: 0.6
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'back2-shape'
      })
      const back3 = group.addShape('circle', {
        zIndex: -1,
        attrs: {
          x: 0,
          y: 0,
          r,
          fill: cfg.style.fill,
          opacity: 0.6
        },
        // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
        name: 'back3-shape'
      })
      group.sort() // Sort according to the zIndex
      back1.animate(
        {
          // Magnifying and disappearing
          r: r + 10,
          opacity: 0.1
        },
        {
          duration: 3000,
          easing: 'easeCubic',
          delay: 0,
          repeat: true // repeat
        }
      ) // no delay
      back2.animate(
        {
          // Magnifying and disappearing
          r: r + 10,
          opacity: 0.1
        },
        {
          duration: 3000,
          easing: 'easeCubic',
          delay: 1000,
          repeat: true // repeat
        }
      ) // 1s delay
      back3.animate(
        {
          // Magnifying and disappearing
          r: r + 10,
          opacity: 0.1
        },
        {
          duration: 3000,
          easing: 'easeCubic',
          delay: 2000,
          repeat: true // repeat
        }
      ) // 3s delay
    }
  }),
  extend: 'circle'
}

const lineArrow = {
  name: 'line-arrow',
  type: 'edge',
  cb: () => ({
    getPath(points) {
      const startPoint = points[0]
      const endPoint = points[1]
      return [
        ['M', startPoint.x, startPoint.y],
        ['L', startPoint.x + (endPoint.x - startPoint.x) / 3, startPoint.y],
        ['L', startPoint.x + ((endPoint.x - startPoint.x) * 1) / 2 + 20, endPoint.y],
        ['L', endPoint.x, endPoint.y]
      ]
    },
    getShapeStyle(cfg) {
      const startPoint = cfg.startPoint
      const endPoint = cfg.endPoint
      const controlPoints = this.getControlPoints(cfg)
      let points = [startPoint] // the start point
      // the control points
      if (controlPoints) {
        points = points.concat(controlPoints)
      }
      // the end point
      points.push(endPoint)
      const path = this.getPath(points)
      const style = Object.assign(
        {},
        G6.Global.defaultEdge.style,
        {
          stroke: '#BBB',
          lineWidth: 1,
          path
        },
        cfg.style
      )
      return style
    }
  }),
  extend: 'line'
}
const lineDashData = [4, 2, 1, 2]
const lineDash = {
  name: 'line-dash',
  type: 'edge',
  cb: () => ({
    afterDraw(cfg, group) {
      // get the first shape in the group, it is the edge's path here=
      const shape = group.get('children')[0]
      let index = 0
      // Define the animation
      shape.animate(
        () => {
          index++
          if (index > 9) {
            index = 0
          }
          const res = {
            lineDashData,
            lineDashOffset: -index
          }
          // returns the modified configurations here, lineDash and lineDashOffset here
          return res
        },
        {
          repeat: true, // whether executes the animation repeatly
          duration: 30000 // the duration for executing once
        }
      )
    }
  }),
  extend: 'line-arrow'
}

const customShapes = {
  cloudPoolCombo,
  serviceNode,
  bgAminate,
  lineArrow,
  lineDash,
  _customLayout
}

export function registerCustomShape(graph) {
  // 批量注册

  for (let elm of Object.values(customShapes)) {
    const { name, type, cb, extend } = elm
    const capType = type.charAt(0).toUpperCase() + type.slice(1)
    G6[`register${capType}`](name, cb(graph), extend)
  }
}
