import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/office'
const subnetUrl = '/api/resource/subnet'
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
const list = (param) => commonUtil.generatePromiseGet(baseUrl + '/list', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const updateInfo = (id, param) =>
  commonUtil.generatePromisePut(baseUrl + `/updateInfo/${id}`, param)
const subnetCreate = (param) => commonUtil.generatePromisePost(subnetUrl + '/create', param)
const subnet = (param) => commonUtil.generatePromiseGet(subnetUrl + `/list`, param)
const subnetUnbind = (param) => commonUtil.generatePromisePost(subnetUrl + `/unbind`, param)
const subnetUpdateInfo = (id, param) =>
  commonUtil.generatePromisePut(subnetUrl + `/update`, { id, ...param })
const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })

// 路由条目

const officeEntrySearch = (param) =>
  commonUtil.generatePromisePost(baseUrl + '/entry/search', param)
const officeEntryDelete = (param) =>
  commonUtil.generatePromisePost(baseUrl + '/entry/delete', param)

export default {
  getRunStatus,
  getSearchTypes,
  search,
  list,
  getDetail,
  create,
  update,
  remove,
  subnet,
  subnetCreate,
  subnetUnbind,
  getLogSearch,
  updateInfo,
  subnetUpdateInfo,
  officeEntrySearch,
  officeEntryDelete
}
