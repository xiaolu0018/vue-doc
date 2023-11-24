import commonUtil from '@/api/axios'
import { downloadExcel } from '@/api/req'
const baseUrl = '/api/setting/account'
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
    key: '云账号名称',
    val: 'username'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const updateStatus = (param) => commonUtil.generatePromisePost(baseUrl + `/updateStatus`, param)
const remove = ([id]) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const setDefault = (id) => commonUtil.generatePromisePost(baseUrl + `/default/${id}`)
const regionExport = (param) => downloadExcel(`/api/resource/region/export`, param)

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  updateStatus,
  remove,
  setDefault,
  regionExport
}
