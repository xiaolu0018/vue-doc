/*
 * @Author: 庞超
 * @Date: 2022-07-07 14:23:08
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-22 13:54:40
 * @Description:
 * @FilePath: \src\src\api\resource-cloud\disk.js
 */
import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/clb'
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
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + '/update', param)
const start = (id) => commonUtil.generatePromisePost(baseUrl + '/start', { id })
const stop = (id) => commonUtil.generatePromisePost(baseUrl + `/stop`, { id })
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const removeListener = (id) => commonUtil.generatePromisePost(baseUrl + `/listener/delete`, { id })
const removeServerGroup = (id) =>
  commonUtil.generatePromisePost(baseUrl + `/servergroup/delete`, { id })
const removeServer = (id, servers) =>
  commonUtil.generatePromisePost(baseUrl + `/servergroup/removeServers`, { id, servers })
const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })
const mount = (param) => commonUtil.generatePromisePost(baseUrl + `/attach`, param)
const unmount = (param) => commonUtil.generatePromisePost(baseUrl + `/detach`, param)
const resize = (param) => commonUtil.generatePromisePost(baseUrl + `/resize`, param)

// 监听
const listener = (param) => commonUtil.generatePromisePost(baseUrl + `/listener/search`, param)
const crtSearch = (listenerId) =>
  commonUtil.generatePromiseGet(baseUrl + `/listener/${listenerId}/certificates`)
// 服务器组
const servergroup = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/servergroup/search`, param)
const servergroupDetail = (serverGroupId) =>
  commonUtil.generatePromiseGet(baseUrl + `/servergroup/${serverGroupId}/servers`)
// 策略组
const policySearch = (param) => commonUtil.generatePromisePost(baseUrl + '/policy/search', param)
const policyUpdate = (param) => commonUtil.generatePromisePost(baseUrl + '/policy/update', param)
const policyRuleSearch = (param) => commonUtil.generatePromisePost(baseUrl + '/rule/search', param)
const removePolicy = (id) => commonUtil.generatePromisePost(baseUrl + `/policy/delete`, { id })
const removePolicyRule = (id) => commonUtil.generatePromisePost(baseUrl + `/rule/delete`, { id })

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  start,
  stop,
  remove,
  getLogSearch,
  mount,
  unmount,
  resize,
  listener,
  removeListener,
  servergroup,
  removeServerGroup,
  servergroupDetail,
  removeServer,
  policySearch,
  policyRuleSearch,
  policyUpdate,
  removePolicy,
  removePolicyRule,
  crtSearch
}
