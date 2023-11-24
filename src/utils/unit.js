import { safeRandom } from '@/utils/encrypt'

/**
 * @param val any
 * 是否为空
 */
export function isNull(val) {
  return typeof val === 'undefined' || val === null || val === ''
}
/**
 * @param arr any
 * 是否为非空数组
 */
export function isNonEmptyArray(arr) {
  return Array.isArray(arr) && arr.length
}

// 数据是否为空(包括空数组，空对象)
export function isEmpty(obj) {
  if (typeof obj === 'undefined' || obj === null || obj === '') {
    return true
  } else if (Array.isArray(obj)) {
    return !isNonEmptyArray(obj) // 空数组
  } else if (Object.keys(obj)?.length) {
    // 对象所有值为空
    return !Object.values(obj).filter((item) => (Array.isArray(item) ? item.length : Boolean(item)))
      .length
  }
  return true
}
// 数据是否为空字符串
export function isEmptyString(str) {
  return typeof str === 'undefined' || str === null || str === ''
}

/**
 * @param type disk | bandwidth
 * @param value Number类型，数据大小
 * @description 根据disk(B)和bandwidth(bps)，返回对应单位unit以及大小val
 **/
export function getUnit(type, value) {
  const map = {
    oss: ['KB', 'MB', 'GB'],
    disk: ['GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
    bandwidth: ['Mbps', 'Gbps', 'Tbps', 'Pbps', 'Ebps', 'Zbps', 'Ybps']
  }
  const sizes = map[type]
  const k = 1024 // TODO:这里有问题，bps应该是1000进制，不是1024
  const i = Math.floor(Math.log(value) / Math.log(k))
  return {
    val: value < 1024 ? value : (value / Math.pow(k, i)).toPrecision(3),
    unit: isFinite(i) ? sizes[i] : sizes[0]
  }
}
// uuid
export function uuid() {
  const len = 32 // 32长度
  let radix = 16 // 16进制
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  const uuid = []
  let i
  radix = radix || chars.length
  if (len) {
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (safeRandom() * radix)]
  } else {
    let r
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (safeRandom() * 16)
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}
/**
 * 随机代码
 * @param { object } options
 * @param { string } options.prefix 前缀
 * @param { number } options.len 长度
 * @returns
 */
export const salt = (options) => {
  const { prefix = '', len = 10 } = options
  return (
    prefix +
    safeRandom()
      .toString(32)
      .slice(2, len + 2)
  )
}
// 十六进制颜色转为rgba
export function getRGBAColor(str, opacity) {
  if (/^#\w{3}$/g.test(str)) {
    const [, r, g, b] = /#(\w{1})(\w{1})(\w{1})/.exec(str)
    return `rgba(${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(b, 16)},${opacity})`
  } else if (/^#\w{6}$/g.test(str)) {
    const [, r, g, b] = /#(\w{2})(\w{2})(\w{2})/.exec(str)
    return `rgba(${parseInt(r, 16)},${parseInt(g, 16)},${parseInt(b, 16)},${opacity})`
  }
  return `rgba(255,255,255,${opacity})`
}

// 字符串切割，然后前后交换
export function desensitizedCommon(str, begin, end) {
  if (!str && begin + end >= str.length) {
    return ''
  }

  let leftStr = str.substring(0, begin)
  let rightStr = str.substring(str.length - end, str.length)

  let strCon = ''
  for (let i = 0; i < str.length - end - begin; i++) {
    strCon += '*'
  }
  return leftStr + strCon + rightStr
}

/**
 * @param {string} url
 * @returns {Object}
 * @description 解析路径参数，返回key-value object格式
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach((v) => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * base64 转 blob
 * @param { string } base64 base64 字符串
 * @return { blob } 二进制图片Blob对象
 */
export const base64ToBlob = (base64) => {
  const parts = base64.split(';base64,')
  const contentType = parts[0].split(':')[1]
  const raw = window.atob(parts[1])
  const rawLength = raw.length

  const uInt8Array = new Uint8Array(rawLength)

  for (let i = 0; i < rawLength; i += 1) {
    uInt8Array[i] = raw.charCodeAt(i)
  }
  return new Blob([uInt8Array], { type: contentType })
}

/**
 * @description 遍历obj，返回符合条件的key
 * @param {Object} obj 要遍历的对象
 * @param {Any} value 匹配比较的value
 * @param {Function} compare 匹配方法
 * @return {String} obj中符合匹配条件的key
 * @author lxl
 * @date 2023-05-25 16:37:49
 */
export const findKey = (obj, value, compare = (a, b) => a === b) => {
  return Object.keys(obj).find((k) => compare(obj[k], value))
}

// string首字母大写
export const titleCase = (str) => str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
