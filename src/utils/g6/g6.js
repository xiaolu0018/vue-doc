/*
 * @Author: 庞超
 * @Date: 2022-06-07 13:51:44
 * @LastEditors: 庞超
 * @LastEditTime: 2022-06-11 01:21:21
 * @Description:
 * @FilePath: \src\src\utils\g6.js
 */
import G6 from '@antv/g6'
function useGraph(container, { width, height }) {
  const graph = new G6.Graph({
    container,
    width,
    height: height - 100,
    fitView: true,
    fitViewPadding: 10,
    fitCenter: true,
    autoPaint: true,
    defaultNode: {
      labelCfg: {
        style: {
          fill: '#666',
          // fontSize: 12,
          background: {
            // fill: '#fff',
            // stroke: '#000000',
            padding: [4, 10],
            radius: 10,
            lineWidth: 0.2
          }
        }
      }
    },
    defaultCombo: {
      type: 'rect',
      style: {
        opacity: 0
      }
    },
    modes: {
      modes: {
        default: ['drag-canvas', 'click-select', 'drag-node']
      }
    }
  })
  function render(data) {
    graph.data(data)
    graph.render()
  }
  return {
    graph,
    render
  }
}

export { G6, useGraph }
