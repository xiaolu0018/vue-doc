import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/nat'
const snatUrl = '/api/resource/nat/snat'
const dnatUrl = '/api/resource/nat/dnat'
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
    key: '云池ID',
    val: 'poolCloudId'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const list = (param) => commonUtil.generatePromiseGet(baseUrl + '/list', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })

const snatCreate = (param) => commonUtil.generatePromisePost(snatUrl + '/create', param)
const snatSearch = (param) => commonUtil.generatePromisePost(snatUrl + '/search', param)
const snatDetail = (id) => commonUtil.generatePromisePost(snatUrl + `/detail`, { id })
const snatDelete = (id) => commonUtil.generatePromisePost(snatUrl + `/delete`, { id })
const snatUpdate = (param) => commonUtil.generatePromisePost(snatUrl + `/update`, param)
const dnatCreate = (param) => commonUtil.generatePromisePost(dnatUrl + '/create', param)
const dnatSearch = (param) => commonUtil.generatePromisePost(dnatUrl + '/search', param)
const dnatDetail = (id) => commonUtil.generatePromisePost(dsnatUrl + `/detail`, { id })
const dnatDelete = (id) => commonUtil.generatePromisePost(dnatUrl + `/delete`, { id })
const dnatUpdate = (param) => commonUtil.generatePromisePost(dnatUrl + `/update`, param)

export default {
  getRunStatus,
  getSearchTypes,
  search,
  list,
  getDetail,
  create,
  update,
  remove,
  snatCreate,
  snatSearch,
  snatDetail,

  snatDelete,
  snatUpdate,
  dnatCreate,
  dnatSearch,
  dnatDetail,

  dnatDelete,
  dnatUpdate
}
