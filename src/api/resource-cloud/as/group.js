/*
 * @Author: 武鑫鑫
 * @Date: 2023-03-08 17:23:08
 * @LastEditors: 武鑫鑫
 * @LastEditTime: 2022-08-22 13:54:44
 * @Description:
 * @FilePath: \src\src\api\resource-cloud\as.js
 */
import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/as/group'
const getSearchTypes = () => [
  {
    key: '名称',
    val: 'name'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const getInstanceSearch = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/instance/search`, param)
const getPolicySearch = (param) => commonUtil.generatePromisePost(baseUrl + `/policy/search`, param)
const getScheduleSearch = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/schedule/search`, param)

const removeInstanceInAsGroup = (id) =>
  commonUtil.generatePromisePost(baseUrl + `/delete/instance`, { id })
const start = (id) => commonUtil.generatePromisePost(baseUrl + '/start', { id })
const stop = (id) => commonUtil.generatePromisePost(baseUrl + `/stop`, { id })
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const unbindClb = (param) => commonUtil.generatePromisePost(baseUrl + `/unbind/clb`, param)
export default {
  getSearchTypes,
  search,
  getDetail,
  update,
  remove,
  getInstanceSearch,
  getPolicySearch,
  getScheduleSearch,
  removeInstanceInAsGroup,
  start,
  stop,
  unbindClb
}
