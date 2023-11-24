import commonUtil from '@/api/axios'

const baseUrl = '/api/security/waf'
const wafUrl = '/api/security/waf/domain'
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
    key: '域名',
    val: 'cname'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const sourceipupdate = (param) => commonUtil.generatePromisePost(wafUrl + `/update`, param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const getSourceipSearch = (param) => commonUtil.generatePromisePost(wafUrl + `/search`, param)
const getAlertDetail = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/ip/alert/detail`, param)
const removesourceip = (id) => commonUtil.generatePromisePost(baseUrl + `/domain/delete`, { id })
const createsourceip = (param) => commonUtil.generatePromisePost(wafUrl + `/add`, param)
const getIpFilterSearch = (param) => commonUtil.generatePromisePost(baseUrl + `/ip/search`, param)
const blockcreate = (param) => commonUtil.generatePromisePost(baseUrl + `/block/create`, param)
const blockStop = (id) => commonUtil.generatePromisePost(baseUrl + `/block/stop`, { id })
const getAttackLogSearch = (param) => commonUtil.generatePromisePost(wafUrl + `/attackLog`, param)
const cleanStop = (id) => commonUtil.generatePromisePost(baseUrl + `/clean/stop`, { id })
const cleancreate = (param) => commonUtil.generatePromisePost(baseUrl + `/clean/create`, param)

export default {
  getRunStatus,
  getSearchTypes,
  removesourceip,
  search,
  getDetail,
  create,
  update,
  remove,
  sourceipupdate,
  blockStop,
  blockcreate,
  cleanStop,
  cleancreate,
  getSourceipSearch,
  getAttackLogSearch,
  getAlertDetail,
  getIpFilterSearch,
  createsourceip
}
