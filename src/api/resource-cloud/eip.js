/*
 * @Author: 庞超
 * @Date: 2022-07-07 14:23:08
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-22 13:54:44
 * @Description:
 * @FilePath: \src\src\api\resource-cloud\eip.js
 */
import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/eip'
const getRunStatus = () => [
  {
    key: '禁用',
    val: 'Disable'
  },
  {
    key: '启用',
    val: 'Enable'
  },
  {
    key: '已删除',
    val: 'Delete'
  }
]
const getSearchTypes = () => [
  {
    key: '名称',
    val: 'name'
  },
  {
    key: '资源池',
    val: 'poolCloudName'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (id, param) => commonUtil.generatePromisePut(baseUrl + `/update`, { id, ...param })
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })
const bind = (param) => commonUtil.generatePromisePost(baseUrl + `/bind`, param)
const unbind = (param) => commonUtil.generatePromisePost(baseUrl + `/unbind`, param)
const queryEipResource = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/queryEipResource`, param)
export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  remove,
  getLogSearch,
  bind,
  unbind,
  queryEipResource
}
