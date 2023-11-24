import { safeRandom } from '@/utils/encrypt'

/**
 * 从数组里获取对象或值
 * @param {*} source 源对象数组
 * @param {*} prop 返回的属性
 * @param {*} option 筛选对象
 * @returns
 */
export function findOne(source, prop, option) {
  if (!source) return null
  let first = null
  if (option) {
    first = source.find((f) => Object.keys(option).every((k) => option[k] === f[k]))
  } else {
    first = source.find(() => true)
  }
  if (prop) {
    return first ? first[prop] : null
  }
  return first
}
/**
 * 从数组里获取对象或值列表
 * @param {*} source
 * @param {*} prop
 * @param {*} option
 * @returns
 */
export function findList(source, prop, option) {
  let list = []
  if (!source) return list
  if (option) {
    list = source.filter((f) => Object.keys(option).every((k) => option[k] === f[k]))
  } else {
    list = source
  }
  if (prop) {
    if (prop instanceof Array) {
      list = list.map((m) => {
        const entry = {}
        prop.forEach((e) => (entry[e] = m[e]))
        return entry
      })
    } else if (typeof prop === 'string') {
      list = list.map((m) => m[prop])
    } else {
      // { key: name, val: id }
      list = list.map((m) => {
        const entry = {}
        Object.keys(prop).forEach((e) => (entry[e] = m[prop[e]]))
        return entry
      })
    }
  }
  return list
}

export function getDict(data, key, val, ...args) {
  return data.map((d) => {
    const param = {}
    args.forEach((a) => {
      param[a] = d[a]
    })
    return { key: d[key], val: d[val], ...param }
  })
}
export function getDictByProps(data, props) {
  return data.map((d) => {
    const param = {}
    Object.entries(props).forEach(([key, val]) => {
      param[key] = d[val]
    })
    return param
  })
}
