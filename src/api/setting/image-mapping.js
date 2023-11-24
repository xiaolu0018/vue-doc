/*
 * @Author: 庞超
 * @Date: 2022-07-07 14:23:08
 * @LastEditors: 庞超
 * @LastEditTime: 2022-07-13 09:11:17
 * @Description:
 * @FilePath: \src\src\api\setting\image-mapping.js
 */
import commonUtil from '@/api/axios'

const baseUrl = '/api/setting/imageMapping'
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const deleteExpiredMappings = ({ cloudType, ids }) =>
  commonUtil.generatePromisePost(baseUrl + `/deleteUnableImage`, {
    cloudType,
    ids
  })
export default {
  search,
  create,
  remove,
  deleteExpiredMappings
}
