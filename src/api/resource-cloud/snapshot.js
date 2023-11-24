/*
 * @Author: 庞超
 * @Date: 2022-07-07 14:23:08
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-22 13:54:44
 * @Description:
 * @FilePath: \src\src\api\resource-cloud\eip.js
 */
import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/snapshot'
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
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (id, param) =>
  commonUtil.generatePromisePost(baseUrl + `/updateInfo`, { id, ...param })
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })
const bind = (param) => commonUtil.generatePromisePost(baseUrl + `/bind`, param)
const unbind = (param) => commonUtil.generatePromisePost(baseUrl + `/unbind`, param)

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
  bind,
  unbind
}
