import commonUtil from '@/api/axios'

const baseUrl = '/api/security/ddos'
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
    key: '实例名称',
    val: 'name'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const getSecurityipSearch = (param) => commonUtil.generatePromisePost(baseUrl + `/ip/search`, param)
const getAlertDetail = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/ip/alert/detail`, param)
const removesecurityip = (id) => commonUtil.generatePromisePost(baseUrl + `/ip/delete`, { id })
const createsecurityip = (param) => commonUtil.generatePromisePost(baseUrl + `/ip/create`, param)
const getBlockSearch = (param) => commonUtil.generatePromisePost(baseUrl + `/block/search`, param)
const blockcreate = (param) => commonUtil.generatePromisePost(baseUrl + `/block/create`, param)
const blockStop = (id) => commonUtil.generatePromisePost(baseUrl + `/block/stop`, { id })
const getCleanSearch = (param) => commonUtil.generatePromisePost(baseUrl + `/clean/search`, param)
const cleanStop = (id) => commonUtil.generatePromisePost(baseUrl + `/clean/stop`, { id })
const cleancreate = (param) => commonUtil.generatePromisePost(baseUrl + `/clean/create`, param)

export default {
  getRunStatus,
  getSearchTypes,
  removesecurityip,
  search,
  getDetail,
  create,
  update,
  remove,
  blockStop,
  blockcreate,
  cleanStop,
  cleancreate,
  getSecurityipSearch,
  getCleanSearch,
  getAlertDetail,
  getBlockSearch,
  createsecurityip
}
