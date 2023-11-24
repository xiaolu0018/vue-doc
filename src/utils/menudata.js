/**
 * 解析header和aside的menu列表，通过过滤条件
 * @param {Array} menus 原始菜单的集合
 * @param {*} filter 过滤方法
 */
const getAsideMenu = (menus, filter) => {
  const out = []
  menus.forEach((item) => {
    const { children } = item
    if (children) {
      const output = getAsideMenu(children, filter)
      if (output.length > 0) {
        let obj = {}
        Object.entries(item).forEach(([key, val]) => {
          if (key !== 'children') obj[key] = val
        })
        obj = Object.assign({}, obj, { children: output })
        out.push(obj)
      }
    } else {
      if (!filter || (filter && filter(item))) {
        const obj = {}
        Object.entries(item).forEach(([key, val]) => (obj[key] = val))
        out.push(obj)
      }
    }
  })
  return out
}
const getMenuNodes = (menus, filter) => {
  const localMenus = JSON.parse(JSON.stringify(menus))
  return getAsideMenu(localMenus, filter)
}

export { getMenuNodes }
