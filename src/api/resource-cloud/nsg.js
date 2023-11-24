/*
 * @Author: 庞超
 * @Date: 2022-07-07 14:23:08
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-22 13:54:48
 * @Description:
 * @FilePath: \src\src\api\resource-cloud\nsg.js
 */
import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/nsg'
const getRunStatus = () => [
  {
    key: '不可用',
    val: 'unAvailable'
  },
  {
    key: '可用',
    val: 'Available'
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
const list = (param) => commonUtil.generatePromiseGet(baseUrl + '/list', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePut(baseUrl + `/update`, param)
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const mount = (param) => commonUtil.generatePromisePost(baseUrl + `/attach`, param)
const unmount = (param) => commonUtil.generatePromisePost(baseUrl + `/detach`, param)
const queryNsgResource = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/queryNsgResource`, param)

const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })
const getRuleSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/nsgRuleDetail`, { id })
const getVmSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/nsgInstanceDetail`, { id })
const ruleDelete = (id) => commonUtil.generatePromisePost(baseUrl + `/rule/delete`, { id })

export default {
  getRunStatus,
  getSearchTypes,
  search,
  list,
  getDetail,
  create,
  update,
  remove,
  getLogSearch,
  getRuleSearch,
  getVmSearch,
  mount,
  unmount,
  queryNsgResource,
  // updateInfo,
  ruleDelete
}
