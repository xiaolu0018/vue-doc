/**
 * @fileName base.js
 * @description 基础服务
 * @date 2023-04-04 10:55:35
 * @author lxl
 */
import commonUtil from '@/api/axios'
const baseUrl = '/api/ir/baseInfo'
const serviceUrl = '/api/ir/baseService'
const getRunStatus = () => [
  {
    key: '禁用',
    val: 0
  },
  {
    key: '启用',
    val: 1
  }
]
const getSearchTypes = () => []

const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const detail = (id) => commonUtil.generatePromiseGet(baseUrl + '/detail/' + id)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const start = (param) => commonUtil.generatePromisePost(baseUrl + `/start`, param)
const stop = (param) => commonUtil.generatePromisePost(baseUrl + `/stop`, param)
const getFlowData = (param) => commonUtil.generatePromisePost(baseUrl + `/buildFlowJson`, param)
export const queryList = (type = '') =>
  commonUtil.generatePromiseGet(baseUrl + `/queryList?type=${type}`)
export const queryProperty = (type) =>
  commonUtil.generatePromiseGet(serviceUrl + `/queryPropertyByResourceType/${type}`)
export const queryBaseInfoProperty = (type) =>
  commonUtil.generatePromiseGet(baseUrl + `/queryBaseInfoProperty?resourceType=${type}`)
// 获取解构参数
export const getDeconstructParam = (param) =>
  commonUtil.generatePromisePost('/api/ir/param/batchQueryParam', param)
export const getBaseInfoDefaultOutParam = (type) =>
  commonUtil.generatePromiseGet(baseUrl + `/queryBaseInfoDefaultOutParam?resourceType=${type}`)
// 获取图片
export default {
  getRunStatus,
  getSearchTypes,
  search,
  detail,
  create,
  update,
  remove,
  start,
  stop,
  getFlowData,
  queryList,
  queryProperty,
  queryBaseInfoProperty
}
