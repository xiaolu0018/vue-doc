/*
 * @Author: 庞超
 * @Date: 2023-01-18 09:51:19
 * @LastEditors: 庞超
 * @LastEditTime: 2023-01-18 15:15:16
 * @Description:
 * @FilePath: /src/src/utils/http.js
 */
import axios from 'axios'
import { MessageBox, Notification } from 'element-ui'

import store from '@/store'

const request = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 60 * 1000
})

const cancelToken = axios.CancelToken
const recentReq = []

request.interceptors.request.use(
  (config) => {
    // if (config.method === 'post' && config.data) {
    //   config.data = util.findAndFormatProp(config.data, 'password', (e) => encrypt.encrypt(e))
    // }
    if (
      recentReq.some(
        (f) =>
          f.url === config.url &&
          f.validateId === config.validateId &&
          new Date().getTime() - f.ts <= 1000
      )
    ) {
      const hasQuery = config.url.indexOf('?') > -1
      config.url = config.url + `${hasQuery ? '&' : '?'}_t=${Date.now()}`
      // const source = cancelToken.source()
      // config.cancelToken = source.token
      // source.cancel('cancel')
      // console.warn(`request ${config.url} is duplicated, canceled by axios`)
    } else {
      recentReq.push({
        url: config.url,
        validateId: JSON.stringify(config.data || config.params),
        ts: new Date().getTime()
      })
    }
    if (config.url !== '/api/login/login') {
      config.headers['dcits_login_token'] = store.state.user.token
    }
    return config
  },
  (err) => Promise.reject(err)
)
let flag = 0
request.interceptors.response.use(
  (response) => {
    const res = response.data
    const isDownload = response.headers['content-disposition']
    if (isDownload) {
      response.data = { result: res }
    } else if (res.code !== 200) {
      let message = ''
      if (res.code === 401) {
        message = '登录超时,请重新登录'
        !flag &&
          MessageBox.alert(message, '提示', {
            callback: async () => {
              await store.dispatch('user/logout')
              flag = 0
            },
            showClose: false
          })
        flag++
        return
      }
      if (res.code === 403) {
        message = '您的权限不足,请向管理员申请后重试'
      } else {
        message = res.errorMsg || '未知异常,请联系工作人员'
        console.warn('未知异常：', res.errorMsg)
      }
      message &&
        Notification.warning({
          title: '警告',
          message
        })
    }
    return response
  },
  (err) => {
    // message === "cancel" 请求取消不抛错误信息
    if (err.message !== 'cancel') {
      Notification.warning({
        title: '警告',
        message: err.message
      })
    }
    return Promise.reject(err)
  }
)
const get = (url, params) => request.request({ url, method: 'get', params })
const post = (url, data) => request.request({ url, method: 'post', data })
const remove = (url) => request.delete(url)

export { get, post, remove, request }
export default request
