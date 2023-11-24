import commonUtil from '@/api/axios'
import { downloadExcel } from '@/api/req'

const baseUrl = '/api/pool/cloud'
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
const getUsedSearch = (param) => commonUtil.generatePromisePost(baseUrl + `/quota/quotaList`, param)
const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })
const getCpRegionList = (param) =>
  commonUtil.generatePromiseGet('/api/setting/region/getCloudRegionsList', param)
const batchCreatePool = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/batchCreatePool`, param)
// quota
const quotaSearch = (param) => commonUtil.generatePromisePost(baseUrl + '/quota/search', param)
const quotaCreate = (param) => commonUtil.generatePromisePost(baseUrl + '/quota/create', param)
const quotaUpdate = (param) => commonUtil.generatePromisePost(baseUrl + '/quota/update', param)
const quotaRemove = (ids) => commonUtil.generatePromisePost(baseUrl + '/quota/delete', { ids })
const quotaBatch = (param) => commonUtil.generatePromisePost(baseUrl + `/quota/batch`, param)
const regionExport = (param) => downloadExcel(`/api/resource/region/export`, param)

export default {
  getRunStatus,
  getSearchTypes,
  getCpRegionList,
  search,
  getDetail,
  create,
  update,
  remove,
  batchCreatePool,
  getUsedSearch,
  getLogSearch,
  quotaSearch,
  quotaCreate,
  quotaUpdate,
  quotaRemove,
  quotaBatch,
  regionExport
}
