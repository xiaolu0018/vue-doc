/**
 * @fileName tag.js
 * @description 标签管理
 * @date 2023-04-06 10:26:21
 * @author lxl
 */
import commonUtil from '@/api/axios'
const baseUrl = '/api/ir/tag'

const searchMenuTags = (menuId, type = '') =>
  commonUtil.generatePromiseGet(`${baseUrl}/${menuId}/tags?type=${type}`, {
    time: new Date().getTime()
  })
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const bind = (param) => commonUtil.generatePromisePost(baseUrl + `/bind`, param)
const unbind = (param) => commonUtil.generatePromisePost(baseUrl + `/unbind`, param)

export default {
  searchMenuTags,
  create,
  update,
  remove,
  bind,
  unbind
}
