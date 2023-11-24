import commonUtil from '@/api/axios'
const baseUrl = '/api/resource/vpc'
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
  },
  {
    key: '云池',
    val: 'poolCloudName'
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
const subnet = (id) => commonUtil.generatePromisePost(baseUrl + `/subnet/detail`, { id })
const subnetDelete = (id) => commonUtil.generatePromisePost(subnetUrl + `/delete`, { id })
const subnetUpdateInfo = (id, param) =>
  commonUtil.generatePromisePut(subnetUrl + `/update`, { id, ...param })
const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })
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
  subnetDelete,
  getLogSearch,
  updateInfo,
  subnetUpdateInfo
}
