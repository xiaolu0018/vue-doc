/*
 * @Author: 庞超
 * @Date: 2022-07-07 16:08:31
 * @LastEditors: 庞超
 * @LastEditTime: 2022-07-13 09:12:32
 * @Description:
 * @FilePath: \src\src\api\system\tenant.js
 */
import commonUtil from '@/api/axios'

const baseUrl = '/api/system/tenant'
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
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  remove
}
