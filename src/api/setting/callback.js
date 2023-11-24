/*
 * @Author: 庞超
 * @Date: 2022-09-20 17:37:57
 * @LastEditors: 庞超
 * @LastEditTime: 2022-09-21 17:40:20
 * @Description:
 * @FilePath: /src/src/api/setting/callback.js
 */
import commonUtil from '@/api/axios'

const baseUrl = '/api/restful/app/callback'
const getRunStatus = () => [
  {
    key: '禁用',
    val: 0
  },
  {
    key: '启用',
    val: 1
  },
  {
    key: '已删除',
    val: 2
  }
]
const getSearchTypes = () => [
  {
    key: '应用名称',
    val: 'appName'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const updateStatus = (param) => commonUtil.generatePromisePost(baseUrl + `/updateStatus`, param)
const remove = ([id]) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  updateStatus,
  remove
}
