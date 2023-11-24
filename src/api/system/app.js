/*
 * @Author: 庞超
 * @Date: 2022-07-07 14:23:08
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-19 11:18:14
 * @Description:
 * @FilePath: \src\src\api\system\app.js
 */
import commonUtil from '@/api/axios'

const baseUrl = '/api/system/app'
const appUrl = '/api/app'
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
    key: 'App名称',
    val: 'appName'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const reset = (id) => commonUtil.generatePromisePost(baseUrl + `/updateSecret`, { id })
const searchSecret = (id) => commonUtil.generatePromisePost(baseUrl + `/searchSecret`, { id })
const cbSearch = (param) => commonUtil.generatePromisePost(appUrl + `/callback/search`, param)

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  remove,
  reset,
  searchSecret,
  cbSearch
}
