import eventBus from '@/utils/eventBus'
import G6 from '@antv/g6'
import { Notification } from 'element-ui'
import { registerCustomShape } from './helpers/custom-shape'
import { getBuildInImage } from '@/settings/build-in-images'
// 解析后端模板数据
export function parseGraphData(graphData) {
  const { edges: link, nodes: nodeData, combos } = graphData
  const edges = link.map(({ id, tagInId, tagOutId, ...other }) => ({
    source: tagInId,
    target: tagOutId,
    ...other
  }))

  const nodes = nodeData.map(({ properties, img, ...node }) => {
    // Notes: img存在，但是显示不正常的情况，不予处理
    const nodeImg = img ? img : getBuildInImage('resourceType', node.resourceType)
    return {
      img:
        nodeImg && !nodeImg.includes('node-default')
          ? `/api/file/${nodeImg.replace('/api/file/', '')}`
          : '/image/node-default.png',
      dataType: 'node',
      type: 'service-node',
      ...node
    }
  })
  // const hasNetworkNodes = nodes.some((n) => n.comboId === 'network')
  // const combos = poolData.map(({ img, ...combo }) => {
  //   return {
  //     img: img && `/api/file/${img}`,
  //     dataType: 'combo',
  //     type: 'cloud-pool-combo',
  //     ...combo,
  //     label: combo.label || '云池'
  //   }
  // })

  // const combosData = hasNetworkNodes ? [...combos, { id: 'network', label: '网络层' }] : combos
  return {
    edges,
    nodes,
    combos
  }
}

export default class ArcGraph {
  constructor(options) {
    const defaultOptions = {
      container: 'arc-stage',
      mContainer: null,
      toolbar: true,
      viewOnly: false,
      layout: null,
      edge: 'polyline',
      data: []
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.container = document.getElementById(this.options.container)
    this.graph = null
    this.sourceAnchorIdx = null
    this.sourceAnchorPid = null
    this.sourceAnchorType = null
    this.targetAnchorIdx = null
  }
  init(data = this.options.data) {
    const self = this
    if (!self.container) {
      console.warn('dom not ready')
    }
    // if (self.graph) {
    //   console.warn('graph exists')
    //   self.graph.destroy()
    //   self.graph = null
    // }
    // 注册自定义shape
    registerCustomShape(self)

    const container = document.getElementById(self.options.container)
    const width = container.scrollWidth
    const height = container.scrollHeight || 500

    let plugins = []
    const toolbar = new G6.ToolBar({
      position: { x: 10, y: 10 }
    })
    const contextMenu = this.contextMenu()
    if (this.options.mContainer) {
      const minimap = this.minimap(this.options.mContainer)
      plugins.push(minimap)
    }

    if (this.options.toolbar) {
      plugins.push(toolbar)
    }
    // 网格
    const grid = new G6.Grid()
    // 对齐线
    const snapLine = new G6.SnapLine()

    // const tooltip = new G6.Tooltip({
    //   offsetX: 10,
    //   offsetY: 20,
    //   getContent(e) {
    //     const outDiv = document.createElement('div')
    //     const isScene = e.item.getModel().resourceType === 'SCENE'
    //     outDiv.innerHTML = isScene? `
    //       <p>点击查看</p>` : ''
    //     return outDiv
    //   },
    //   itemTypes: ['node']
    // })

    plugins = [...plugins, contextMenu, grid, snapLine]
    self.graph = new G6.Graph({
      container: self.options.container,
      width,
      height,
      fitCenter: true,
      animate: true,
      // fitCenter: true,
      plugins: plugins,
      enabledStack: true,
      modes: {
        default: [
          'drag-combo',
          {
            type: 'drag-node',
            shouldBegin: (e) => {
              if (e.target.get('name') === 'anchor-point') return false
              return true
            }
          },
          // config the shouldBegin and shouldEnd to make sure the create-edge is began and ended at anchor-point circles
          {
            type: 'create-edge',
            trigger: 'drag', // set the trigger to be drag to make the create-edge triggered by drag
            shouldBegin: (e) => {
              // avoid beginning at other shapes on the node
              if (e.target && e.target.get('name') !== 'anchor-point') return false
              this.sourceAnchorIdx = e.target.get('anchorPointIdx')
              this.sourceAnchorPid = e.target.get('parentId')
              this.sourceAnchorType = e.target.get('resourceType')
              e.target.set('links', e.target.get('links') + 1) // cache the number of edge connected to this anchor-point circle
              return true
            },
            shouldEnd: (e) => {
              const edges = this.graph.save().edges
              if (!e.target) return false
              // avoid ending at other shapes on the node
              if (e.target.get('name') !== 'anchor-point') return false
              // avoid ending at the same node
              if (e.target.get('parentId') === this.sourceAnchorPid) return false

              // avoid duplicate links
              const isDup = edges.some(
                (edge) =>
                  [edge.source, edge.target].includes(e.target.get('parentId')) &&
                  [edge.source, edge.target].includes(this.sourceAnchorPid)
              )
              if (isDup) return false
              // check if nodes are linkable
              if (
                !(
                  e.target.get('linkableNodes').includes('ALL') ||
                  e.target.get('linkableNodes').includes(this.sourceAnchorType)
                )
              ) {
                Notification.warning({
                  title: '提示',
                  message: '此节点不允许连接！'
                })
                return false
              }

              if (e.target) {
                this.targetAnchorIdx = e.target.get('anchorPointIdx')
                e.target.set('links', e.target.get('links') + 1) // cache the number of edge connected to this anchor-point circle
                return true
              }
              this.targetAnchorIdx = undefined
              return true
            }
          }
        ],
        viewOnly: ['drag-canvas']
      },
      /**
       * 当实例化图时没有配置布局时：
       * 若数据中节点有位置信息（x 和 y），则按照数据的位置信息进行绘制；
       * 若数据中节点没有位置信息，则默认使用 Random Layout 进行布局。
       */
      layout: this.options.layout,
      defaultNode: {
        type: 'service-node',
        size: [52, 52],
        style: {
          radius: 5,
          stroke: '#69c0ff',
          fill: 'red',
          lineWidth: 1,
          fillOpacity: 1
        },
        labelCfg: {
          position: 'bottom',
          style: {
            fill: '#777',
            textAlign: 'center'
          }
        }
      },
      defaultEdge: {
        type: this.options.edge,
        animate: true,
        style: {
          stroke: '#F6BD16',
          lineWidth: 1
        }
      },
      defaultCombo: {
        type: 'cloud-pool-combo',
        size: [200, 200],
        labelCfg: {
          position: 'top',
          offset: [10, 10, 10, 10],
          style: {
            fill: '#0095FF',
            fontSize: 14
          }
        }
      },
      nodeStateStyles: {
        active: {
          stroke: '#ff0000',
          lineWidth: 3
        }
      }
    })
    self.options.viewOnly && self.graph.setMode('viewOnly')

    self.graph.data(data)
    self.graph.render()

    console.warn('graph rendered', self.graph.getCurrentMode())
    // 解决拖拽残影问题
    self.graph.get('canvas').set('localRefresh', false)
    // // 获取图上的所有节点实例
    // const nodes = graph.getNodes()
    // // 遍历节点实例，将所有节点提前。
    // nodes.forEach((node) => {
    //   node.toFront()
    // })

    // set listeners
    this.setListeners()

    if (typeof window !== 'undefined')
      window.onresize = () => {
        if (!self.graph || self.graph.get('destroyed')) return
        if (!container || !container.scrollWidth || !container.scrollHeight) return
        self.graph.changeSize(container.scrollWidth, container.scrollHeight)
      }
  }
  setListeners() {
    // G6.Util.processParallelEdges processes the edges with same source node and target node,
    // on this basis, processParallelEdgesOnAnchorPoint consider the end nodes and anchor points in the same time.
    const processParallelEdgesOnAnchorPoint = (
      edges,
      offsetDiff = 15,
      multiEdgeType = 'polyline',
      singleEdgeType = undefined,
      loopEdgeType = undefined
    ) => {
      const len = edges.length
      const cod = offsetDiff * 2
      const loopPosition = [
        'top',
        'top-right',
        'right',
        'bottom-right',
        'bottom',
        'bottom-left',
        'left',
        'top-left'
      ]
      const edgeMap = {}
      const tags = []
      const reverses = {}
      for (let i = 0; i < len; i++) {
        const edge = edges[i]
        const { source, target, sourceAnchor, targetAnchor } = edge
        const sourceTarget = `${source}|${sourceAnchor}-${target}|${targetAnchor}`

        if (tags[i]) continue
        if (!edgeMap[sourceTarget]) {
          edgeMap[sourceTarget] = []
        }
        tags[i] = true
        edgeMap[sourceTarget].push(edge)
        for (let j = 0; j < len; j++) {
          if (i === j) continue
          const sedge = edges[j]
          const {
            source: src,
            target: dst,
            sourceAnchor: srcAnchor,
            targetAnchor: dstAnchor
          } = sedge

          // 两个节点之间共同的边
          // 第一条的source = 第二条的target
          // 第一条的target = 第二条的source
          if (!tags[j]) {
            if (
              source === dst &&
              sourceAnchor === dstAnchor &&
              target === src &&
              targetAnchor === srcAnchor
            ) {
              edgeMap[sourceTarget].push(sedge)
              tags[j] = true
              reverses[
                `${src}|${srcAnchor}|${dst}|${dstAnchor}|${edgeMap[sourceTarget].length - 1}`
              ] = true
            } else if (
              source === src &&
              sourceAnchor === srcAnchor &&
              target === dst &&
              targetAnchor === dstAnchor
            ) {
              edgeMap[sourceTarget].push(sedge)
              tags[j] = true
            }
          }
        }
      }

      for (const key in edgeMap) {
        const arcEdges = edgeMap[key]
        const { length } = arcEdges
        for (let k = 0; k < length; k++) {
          const current = arcEdges[k]
          if (current.source === current.target) {
            if (loopEdgeType) current.type = loopEdgeType
            // 超过8条自环边，则需要重新处理
            current.loopCfg = {
              position: loopPosition[k % 8],
              dist: Math.floor(k / 8) * 20 + 50
            }
            continue
          }
          if (
            length === 1 &&
            singleEdgeType &&
            (current.source !== current.target || current.sourceAnchor !== current.targetAnchor)
          ) {
            current.type = singleEdgeType
            continue
          }
          current.type = multiEdgeType
          const sign =
            (k % 2 === 0 ? 1 : -1) *
            (reverses[
              `${current.source}|${current.sourceAnchor}|${current.target}|${current.targetAnchor}|${k}`
            ]
              ? -1
              : 1)
          if (length % 2 === 1) {
            current.curveOffset = sign * Math.ceil(k / 2) * cod
          } else {
            current.curveOffset = sign * (Math.floor(k / 2) * cod + offsetDiff)
          }
        }
      }
      return edges
    }

    this.graph.on('aftercreateedge', (e) => {
      // update the sourceAnchor and targetAnchor for the newly added edge
      this.graph.updateItem(e.edge, {
        sourceAnchor: this.sourceAnchorIdx,
        targetAnchor: this.targetAnchorIdx
      })

      // update the curveOffset for parallel edges
      const edges = this.graph.save().edges
      processParallelEdgesOnAnchorPoint(edges)
      this.graph.getEdges().forEach((edge, i) => {
        this.graph.updateItem(edge, {
          curveOffset: edges[i].curveOffset,
          curvePosition: edges[i].curvePosition
        })
      })
    })

    // after drag from the first node, the edge is created, update the sourceAnchor
    this.graph.on('afteradditem', (e) => {
      if (e.item && e.item.getType() === 'edge') {
        this.graph.updateItem(e.item, {
          sourceAnchor: this.sourceAnchorIdx
        })
      }
    })

    // if create-edge is canceled before ending, update the 'links' on the anchor-point circles
    this.graph.on('afterremoveitem', (e) => {
      if (e.item && e.item.source && e.item.target) {
        const sourceNode = this.graph.findById(e.item.source)
        const targetNode = this.graph.findById(e.item.target)
        const { sourceAnchor, targetAnchor } = e.item
        if (sourceNode && !isNaN(sourceAnchor)) {
          const sourceAnchorShape = sourceNode
            .getContainer()
            .find(
              (ele) =>
                ele.get('name') === 'anchor-point' && ele.get('anchorPointIdx') === sourceAnchor
            )
          sourceAnchorShape.set('links', sourceAnchorShape.get('links') - 1)
        }
        if (targetNode && !isNaN(targetAnchor)) {
          const targetAnchorShape = targetNode
            .getContainer()
            .find(
              (ele) =>
                ele.get('name') === 'anchor-point' && ele.get('anchorPointIdx') === targetAnchor
            )
          targetAnchorShape?.set('links', targetAnchorShape?.get('links') - 1)
        }
      }
    })

    // some listeners to control the state of nodes to show and hide anchor-point circles
    this.graph.on('node:mouseenter', (e) => {
      this.graph.setItemState(e.item, 'showAnchors', true)
      this.graph.setItemState(e.item, 'active', true)
    })
    this.graph.on('node:mouseleave', (e) => {
      this.graph.setItemState(e.item, 'showAnchors', false)
      this.graph.setItemState(e.item, 'active', false)
    })
    this.graph.on('node:dragenter', (e) => {
      this.graph.setItemState(e.item, 'showAnchors', true)
    })
    this.graph.on('node:dragleave', (e) => {
      this.graph.setItemState(e.item, 'showAnchors', false)
    })
    this.graph.on('node:dragstart', (e) => {
      this.graph.setItemState(e.item, 'showAnchors', true)
    })
    this.graph.on('node:dragout', (e) => {
      this.graph.setItemState(e.item, 'showAnchors', false)
    })
    this.graph.off('node:click').on('node:click', (e) => {
      eventBus?.$emit('node-click', e?.item?.getModel(), e)
    })
    this.graph.off('combo:click').on('combo:click', (e) => {
      // e.bubbles = false // 阻止冒泡
      eventBus.$emit('combo-click', e?.item?.getModel())
    })
    this.graph.on('canvas:click', (e) => {
      e.bubbles = false // 阻止冒泡
      eventBus.$emit('canvas-click')
    })
  }
  update(data) {
    this.graph.changeData(data)
  }
  updateLayout(data) {
    this.graph.updateLayout(data)
  }
  /**
   *
   * @param {String} type  元素类型，可选值为 'node'、'edge'
   * @param {Object} model
   * @param {Boolean} stack 操作是否入 undo & redo 栈
   * @param {Array} props 重复属性 增加下标
   *
   */
  addItem(type, model, props = [], stack = true) {
    const graphCoords = this.graph.getPointByClient(model.x, model.y)
    const item = { ...model, ...graphCoords }
    const combo = this.getInsideCombo(item)
    // 增加下标
    const duplicatesIdx = this.getDuplicateIdx(item, 'key')
    const duplicateParams = {}
    props.forEach((p) => {
      duplicateParams[p] = item[p] + duplicatesIdx
    })
    // 监听节点变化
    if (type === 'node') {
      eventBus.$emit('node-update', {
        type: 'add',
        node: item
      })
    }

    if (combo) {
      this.graph.addItem(type, { ...item, comboId: combo.getModel().id, ...duplicateParams }, stack)
      const child = this.graph.findById(item.id)
      combo.addNode(child)
    } else {
      this.graph.addItem(type, { ...item, ...duplicateParams }, stack)
    }
  }
  removeItem(item, stack = true) {
    this.graph.removeItem(item, stack)
  }
  updateItem(item, model, stack = true) {
    if (item.dataType === 'combo') {
      this.graph.updateItem(item.id, model, stack)
    } else {
      const comboId = item.comboId
      this.graph.updateItem(item.id, model, stack)
      comboId && this.graph.updateCombo(comboId)
    }
  }
  getInsideCombo(item) {
    const combos = this.graph.getCombos()
    const inSideCombos = combos.filter((combo) => {
      const { x, y, width, height } = combo.getBBox()
      return item.x >= x && item.x <= x + width && item.y >= y && item.y <= y + height
    })
    if (inSideCombos.length > 0) {
      return inSideCombos[0]
    }
    return null
  }
  /**
   * 获取节点重复编号
   * @param {*} nodes
   * @param {*} item
   * @param {String} field 唯一字段
   * @returns
   */
  getDuplicateIdx(item, field) {
    let nodes = []
    if (item.dataType === 'node') {
      nodes = this.graph.getNodes()
    } else if (item.dataType === 'combo') {
      nodes = this.graph.getCombos()
    }
    const idx = nodes.reduce((acc, node) => {
      if (node.getModel()[field] === item[field]) {
        acc++
      }
      return acc
    }, 0)
    return idx === 0 ? '' : '_' + String(idx)
  }
  getNodes() {
    return this.graph.getNodes()
  }
  contextMenu() {
    const self = this
    return new G6.Menu({
      getContent(evt) {
        let header
        const mode = self.graph.getCurrentMode()
        if (mode === 'viewOnly') return
        if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
          header = 'Canvas ContextMenu'
          return
        } else if (evt.item) {
          const itemType = evt.item.getType()
          header = `${itemType.toUpperCase()} `
          return `
          <ul>
            <li>删除</li>
          </ul>`
        }
      },
      handleMenuClick: (_target, item) => {
        const model = item.getModel()
        self.graph.removeItem(model.id)
        eventBus.$emit('node-update', {
          type: 'del',
          node: model
        })
      },
      // offsetX and offsetY include the padding of the parent container
      // 需要加上父级容器的 padding-left 16 与自身偏移量 10
      offsetX: 16 + 10,
      // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
      offsetY: 0,
      // the types of items that allow the menu show up
      // 在哪些类型的元素上响应
      itemTypes: ['node', 'edge', 'canvas', 'combo']
    })
  }
  minimap(container) {
    return new G6.Minimap({
      container,
      size: [276, 180]
    })
  }
  save() {
    return this.graph?.save()
  }
  clear() {
    this.graph?.clear()
  }
  destroy() {
    this.graph?.destroy()
  }
  getBg() {
    return this.graph?.toDataURL()
  }
  fitView(pd = 20) {
    this.graph?.fitView(pd)
  }
  fitCenter() {
    setTimeout(() => {
      this.graph?.fitView()
      console.log('fitCenter called')
    }, 1000)
  }
  hasNetworkCombo() {
    return !!this.graph.findById('network')
  }
  changeData(data) {
    this.graph?.changeData(data)
  }
}
