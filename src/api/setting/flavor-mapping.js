/*
 * @Author: 庞超
 * @Date: 2022-07-07 14:23:08
 * @LastEditors: 庞超
 * @LastEditTime: 2022-07-18 16:54:31
 * @Description:
 * @FilePath: \src\src\api\setting\flavor-mapping.js
 */
import commonUtil from '@/api/axios'

const baseUrl = '/api/setting/flavorMapping'
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const searchByZone = (param) => commonUtil.generatePromisePost(baseUrl + '/searchByZone', param)
const deleteLapseFlavorMapping = ({ cloudTypes, ids }) =>
  commonUtil.generatePromisePost(`/api/setting/flavorMapping/deleteLapseFlavorMapping`, {
    cloudTypes,
    ids
  })
export default {
  search,
  create,
  remove,
  searchByZone,
  deleteLapseFlavorMapping
}
