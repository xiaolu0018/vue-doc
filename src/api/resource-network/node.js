/*
 * @Author: 庞超
 * @Date: 2022-07-19 15:17:13
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-03 09:57:31
 * @Description:
 * @FilePath: \src\src\api\resource-network\node.js
 */
import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/network/node'
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
const officeNodeRemove = (id) =>
  commonUtil.generatePromisePost(baseUrl + `/deleteOfficeNetwork`, { id })
const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })

export const updateOfficeNetwork = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/updateOfficeNetwork`, param)

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  remove,
  officeNodeRemove,
  getLogSearch
}
