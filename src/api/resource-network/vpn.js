/*
 * @Author: 庞超
 * @Date: 2022-07-07 14:23:08
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-03 09:57:11
 * @Description:
 * @FilePath: \src\src\api\resource-network\vpn.js
 */
import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/vpn'
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
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const list = () => commonUtil.generatePromiseGet(baseUrl + '/list')
const queryNetwork = (param) => commonUtil.generatePromisePost(baseUrl + '/queryNetwork', param)
const queryTunnel = (param) => commonUtil.generatePromisePost(baseUrl + '/queryTunnel', param)
const bindTunnel = (param) => commonUtil.generatePromisePost(baseUrl + '/bindTunnel', param)
const unBindTunnel = (param) => commonUtil.generatePromisePost(baseUrl + '/unBindTunnel', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })
const updateInfo = (id, param) =>
  commonUtil.generatePromisePut(baseUrl + `/updateInfo/${id}`, param)

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  remove,
  getLogSearch,
  updateInfo,
  queryNetwork,
  queryTunnel,
  bindTunnel,
  unBindTunnel,
  list
}
