/**
 *
 * @param {Array} tree 树
 * @param {Object} node 当前节点
 * @param {Function} filterFn 过滤条件
 * @returns
 */
export function findPath(tree, filterFn) {
  const path = []
  const list = [...tree]
  const visitedSet = new Set()

  while (list.length) {
    const node = list[0]
    if (visitedSet.has(node)) {
      path.pop()
      list.shift()
    } else {
      visitedSet.add(node)
      node.children && list.unshift(...node.children)
      path.push(node)
      if (filterFn(node)) {
        return path
      }
    }
  }
}

/**
 *
 * @param {*} tree
 * @returns
 */
export function getFirstNodePath(tree) {
  var temp = []
  var forFn = function (arr) {
    if (arr && arr.length > 0) {
      temp.push(arr[0])
      if (arr[0].children) {
        forFn(arr[0].children)
      }
    }
  }
  forFn(tree)
  return temp
}
/**
 * @param {Array} list 要遍历的树结构数据,不支持[,,,]
 * @param {Function}  callback 遍历操作函数, (treeItem) => newItem
 * @param {String} childrenKey 子节点名称，默认children
 * @return {Array} 遍历操作后的新树结构数据
 * @description travelTreeMap遍历整个树结构数据，通过callback返回的item组成新的数据,类似map函数
 * @author lxl
 * @date 2023-04-17 14:20:37
 */
export function travelTreeMap(list = [], callback = () => {}, childrenKey = 'children') {
  if (!Array.isArray(list)) {
    return
  }
  return list.map((item) => {
    let newItem = callback(item) || {}
    newItem[childrenKey]?.length &&
      (newItem[childrenKey] = travelTreeMap(newItem[childrenKey], callback, childrenKey))
    return newItem
  })
}

export function listToTree(data, pid = 1, isChildNull = false) {
  const d = []
  const compare = (a, b) => {
    if (a.parentId === b.parentId) {
      return a.order - b.order
    } else {
      return a.parentId - b.parentId
    }
  }
  data.sort(compare).forEach((val) => {
    if (val.parentId === pid) {
      const list = listToTree(data, val.id, isChildNull)
      const obj = { ...val }
      if (!isChildNull || list.length !== 0) {
        obj.children = list
      }
      d.push(obj)
    }
  })
  return d
}
