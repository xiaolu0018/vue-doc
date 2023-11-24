import request from '@/api/http'

const headerConfig_form = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
const headerConfig_json = { headers: { 'Content-Type': 'application/json' } }
const requestHandler = (res, resolve, reject) => {
  if (res && res.data && res.data.result) {
    resolve(res.data.result)
  } else {
    resolve(null)
  }
}
const formatRequestParam = (param) =>
  Object.entries(param)
    .map(([x, y]) => `${x}=${y}`)
    .join('&')

/**
 * Get方法请求远程地址
 * @param {String} url 请求路径
 * @param {Object} params 参数
 * @param {Object} headers 请求头配置
 * @returns {Promise} 返回请求的Promise
 */
const generatePromiseGet = (url, params, headers = {}) => {
  return new Promise((resolve, reject) => {
    request
      .get(url, { params, headers })
      .then((res) => requestHandler(res, resolve, reject))
      .catch((err) => (!!err.message && err.message === 'cancel' ? resolve(null) : reject(err)))
  })
}
/**
 * Post方法请求远程地址
 * @param {String} url 请求路径
 * @param {Object} param 请求参数
 * @param {Object} options 可选配置
 * @returns {Promise} 返回请求的Promise
 */
const generatePromisePost2 = (url, param, options) => {
  // Content-Type默认form data
  let reqs = [url, param || {}]
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line eqeqeq
    if (param || param == 0) {
      if (options && options['Content-Type']) {
        reqs.push(options)
      } else {
        reqs[1] = formatRequestParam(param)
        reqs.push({ ...headerConfig_form, ...(options || {}) })
      }
    } else {
      reqs = [url]
    }
    request
      .post(...reqs)
      .then((res) => requestHandler(res, resolve, reject))
      .catch((err) => (!!err.message && err.message === 'cancel' ? resolve(null) : reject(err)))
  })
}
/**
 * Post方法请求远程地址
 * @param {String} url 请求路径
 * @param {Object} param 请求参数
 * @param {Boolean} useHeaderConfig 是否使用Header配置
 * @param {Boolean} isJsonConfig 是否使用application/json配置，默认使用application/x-www-form-urlencoded配置
 * @param {Object} opthons 可选配置
 * @returns {Promise} 返回请求的Promise
 */
const generatePromisePost = (url, param, useHeaderConfig, isJsonConfig, opthons) => {
  let reqs = []
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line eqeqeq
    if (param || param == 0) {
      if (useHeaderConfig) {
        if (opthons) {
          reqs = [url, param, opthons]
        } else if (isJsonConfig) {
          reqs = [url, param, headerConfig_json]
        } else {
          reqs = [url, formatRequestParam(param), headerConfig_form]
        }
      } else {
        reqs = [url, param]
      }
    } else {
      reqs = [url]
    }
    request
      .post(...reqs)
      .then((res) => requestHandler(res, resolve, reject))
      .catch((err) => (!!err.message && err.message === 'cancel' ? resolve(null) : reject(err)))
  })
}

/**
 * Get方法请求远程地址
 * @param {String} url 请求路径
 * @returns {Promise} 返回请求的Promise
 */
const generatePromiseDelete = (url, param) => {
  return new Promise((resolve, reject) => {
    request
      .delete(url, param ? { data: param } : undefined)
      .then((res) => requestHandler(res, resolve, reject))
      .catch((err) => (!!err.message && err.message === 'cancel' ? resolve(null) : reject(err)))
  })
}

const generatePromisePut = (url, param) => {
  return new Promise((resolve, reject) => {
    request
      .put(url, param)
      .then((res) => requestHandler(res, resolve, reject))
      .catch((err) => (!!err.message && err.message === 'cancel' ? resolve(null) : reject(err)))
  })
}

/**
 * 查找对象是否包含prop属性（模糊查询），并通过formatter方法修改此属性
 * @param {Object} entry 要修改的对象
 * @param {String} prop 查询字段
 * @param {Function} formatter 修改函数
 */
const findAndFormatProp = (entry, prop, formatter) => {
  if (!!entry && typeof entry === 'object' && Object.keys(entry).length > 0) {
    if (entry.length) {
      // 数组
      return entry.map((m) => findAndFormatProp(m, prop, formatter))
    } else {
      // 对象
      Object.entries(entry).forEach(([key, val]) => {
        if (key.toLowerCase().includes(prop.toLowerCase())) {
          entry[key] = formatter(val)
        } else {
          entry[key] = findAndFormatProp(val, prop, formatter)
        }
      })
      return entry
    }
  } else {
    return entry
  }
}

/**
 * 根据图片url转为png文件对象
 * @param url
 * @param imageName
 * @returns {Promise<unknown>}
 */
export function getImageFileFromUrl(url, imageName) {
  return new Promise((resolve, reject) => {
    var blob = null
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.setRequestHeader('Accept', 'image/png')
    xhr.responseType = 'blob'
    // 加载时处理
    xhr.onload = () => {
      // 获取返回结果
      blob = xhr.response
      let imgFile = new File([blob], imageName, { type: 'image/png' })
      // 返回结果
      resolve(imgFile)
    }
    xhr.onerror = (e) => {
      reject(e)
    }
    // 发送
    xhr.send()
  })
}

export default {
  generatePromiseGet,
  generatePromisePost,
  generatePromiseDelete,
  generatePromisePut,
  formatRequestParam,
  findAndFormatProp
}
