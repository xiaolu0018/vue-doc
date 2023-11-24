export const sortNodesByConnection = (data) => {
  const { nodes, edges } = data

  // 创建一个 Map 来存储每个节点的连接数
  const connectionCountMap = new Map()

  // 计算每个节点的连接数
  edges.forEach((edge) => {
    const sourceId = edge.source
    const targetId = edge.target

    connectionCountMap.set(sourceId, (connectionCountMap.get(sourceId) || 0) + 1)
    connectionCountMap.set(targetId, (connectionCountMap.get(targetId) || 0) + 1)
  })

  // 按连接数对节点进行排序
  nodes.sort((nodeA, nodeB) => {
    const aConnectionCount = connectionCountMap.get(nodeA.id) || 0
    const bConnectionCount = connectionCountMap.get(nodeB.id) || 0

    return bConnectionCount - aConnectionCount
  })

  return nodes
}

export const getConnectedNodePositions = (data, nodeId) => {
  const { edges, nodes } = data
  const node = nodes.find((n) => n.id === nodeId)

  if (!node) {
    console.log(`Node with ID ${nodeId} does not exist.`)
    return []
  }

  const connectedNodes = []

  edges.forEach((edge) => {
    const sourceId = edge.source
    const targetId = edge.target

    if (sourceId === nodeId) {
      const targetNode = nodes.find((n) => n.id === targetId)
      connectedNodes.push({ id: targetId, x: targetNode.x, y: targetNode.y })
    } else if (targetId === nodeId) {
      const sourceNode = nodes.find((n) => n.id === sourceId)
      connectedNodes.push({ id: sourceId, x: sourceNode.x, y: sourceNode.y })
    }
  })

  return connectedNodes
}
