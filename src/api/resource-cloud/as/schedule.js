/*
 * @Author: 武鑫鑫
 * @Date: 2023-03-08 17:23:08
 * @LastEditors: 武鑫鑫
 * @LastEditTime: 2022-08-22 13:54:44
 * @Description:
 * @FilePath: \src\src\api\resource-cloud\as.js
 */
import commonUtil from '@/api/axios'

const baseUrl = '/api/restful/resource/as/policy/schedule'
const getSearchTypes = () => [
  {
    key: '名称',
    val: 'name'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const start = (id) => commonUtil.generatePromisePost(baseUrl + `/start`, { id })
const stop = (id) => commonUtil.generatePromisePost(baseUrl + `/stop`, { id })
const excute = (id) => commonUtil.generatePromisePost(baseUrl + `/excute`, { id })

export default {
  getSearchTypes,
  search,
  getDetail,
  remove,
  update,
  start,
  stop,
  excute
}
