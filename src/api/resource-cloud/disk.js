/*
 * @Author: 庞超
 * @Date: 2022-07-07 14:23:08
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-22 13:54:40
 * @Description:
 * @FilePath: \src\src\api\resource-cloud\disk.js
 */
import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/disk'
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
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })
const mount = (param) => commonUtil.generatePromisePost(baseUrl + `/attach`, param)
const unmount = (param) => commonUtil.generatePromisePost(baseUrl + `/detach`, param)
const resize = (param) => commonUtil.generatePromisePost(baseUrl + `/resize`, param)
const updateInfo = (id, param) =>
  commonUtil.generatePromisePut(baseUrl + `/update`, { id, ...param })

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  remove,
  getLogSearch,
  mount,
  unmount,
  resize,
  updateInfo
}
