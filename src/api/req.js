/*
 * @Author: 庞超
 * @Date: 2022-06-26 15:40:25
 * @LastEditors: 庞超
 * @LastEditTime: 2023-01-18 16:24:29
 * @Description:
 * @FilePath: /src/src/utils/req.js
 */
import request from './http'

const requestHandler = (res, resolve, reject) => {
  if (res && res.data) {
    resolve(res.data)
  } else {
    resolve(null)
  }
}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Object} header [自定义请求头]
 */
function get(url, params, headers = {}) {
  return new Promise((resolve, reject) => {
    request
      .get(url, { params, headers })
      .then((res) => requestHandler(res, resolve, reject))
      .catch((err) => (!!err.message && err.message === 'cancel' ? resolve(null) : reject(err)))
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的数据]
 * @param {Object} header [自定义请求头]
 */
function post(url, data, headers = {}) {
  return new Promise((resolve, reject) => {
    request
      .post(url, data, { headers })
      .then((res) => requestHandler(res, resolve, reject))
      .catch((err) => (!!err.message && err.message === 'cancel' ? resolve(null) : reject(err)))
  })
}
/**
 * put方法，对应put请求,用于更新数据.
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的数据]
 * @param {Object} header [自定义请求头]
 */
function put(url, data, headers = {}) {
  return new Promise((resolve, reject) => {
    request
      .put(url, data, { headers })
      .then((res) => requestHandler(res, resolve, reject))
      .catch((err) => (!!err.message && err.message === 'cancel' ? resolve(null) : reject(err)))
  })
}
/**
 * delete方法，对应delete请求,用于删除数据.
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的数据]
 * @param {Object} header [自定义请求头]
 */
function del(url, data, headers = {}) {
  return new Promise((resolve, reject) => {
    request
      .delete(url, data, { headers })
      .then((res) => requestHandler(res, resolve, reject))
      .catch((err) => (!!err.message && err.message === 'cancel' ? resolve(null) : reject(err)))
  })
}

/**
 * downloadExcel方法，用于下载 Excel 请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的数据]
 * @param {Object} header [自定义请求头]
 */
function downloadExcel(url, data, headers = {}, onDownloadProgress = () => {}) {
  return new Promise((resolve, reject) => {
    request
      .post(url, data, {
        responseType: 'blob',
        onDownloadProgress,
        timeout: 0,
        headers
      })
      .then((res) => {
        const fileBuffer = new Blob([res.data.result], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
        })
        res.data = { fileBuffer }
        requestHandler(res, resolve, reject)
      })
      .catch((err) => (!!err.message && err.message === 'cancel' ? resolve(null) : reject(err)))
  })
}

/**
 * @description 文件下载
 * @param {String} fileName 下载文件名称
 * @param {String} objectURL 下载链接
 * @author lxl
 * @date 2023-07-13 09:42:27
 */
function downloadHelper(fileName, objectURL) {
  const link = document.createElement('a')
  link.download = fileName
  link.href = objectURL
  link.click()
  link.remove()
}
export { del, downloadExcel, get, post, put, downloadHelper }
