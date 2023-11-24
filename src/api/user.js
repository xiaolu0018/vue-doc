import { get, post } from '@/api/http'
import commonUtil from '@/api/axios'

const baseUrl = '/api/system'

const service = {
  // login: (data) => post(baseUrl + '/login/v2/login', data),
  // sendVerifyCode: (data) => post(baseUrl + '/login/v2/sendVerifyCode', data),
  // commitVerifyCode: (data) => post(baseUrl + '/login/v2/verify', data),
  login: (data) => post(baseUrl + '/login/login', data),
  sendPhoneCode: (data) => post(baseUrl + '/login/sendPhoneCode', data),
  sendEmailCode: (data) => post(baseUrl + '/login/sendEmailCode', data),
  commitVerifyCode: (data) => post(baseUrl + '/login/verify', data),
  loginByToken: (tokenId) => post(`/inx/registered/verify/token/${tokenId}`),
  logout: () => post(baseUrl + '/login/logout'),
  getInfo: () => get(baseUrl + '/user/detail'),
  modifyPassword: (params) =>
    commonUtil.generatePromisePost(baseUrl + '/user/modifyPassword', params)
}

export { service }
