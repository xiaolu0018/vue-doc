import commonUtil from '@/api/axios'

const baseUrl = '/api/strategy/group'
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
    key: '编排策略名称',
    val: 'name'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const searchSub = (id) => commonUtil.generatePromisePost(baseUrl + `/searchSub`, { id })
const updateStatus = ({ id, status }) =>
  commonUtil.generatePromisePost(baseUrl + `/updateStatus`, { id, status })

const weightSearch = (param) => commonUtil.generatePromisePost(baseUrl + '/searchWeight', param)
const weightCreate = (param) => commonUtil.generatePromisePost(baseUrl + '/createWeight', param)
const weightUpdate = (param) => commonUtil.generatePromisePost(baseUrl + '/updateWeight', param)
const weightRemove = (ids) => commonUtil.generatePromisePost(baseUrl + '/deleteWeight', { ids })
export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  remove,
  searchSub,
  updateStatus,
  weightSearch,
  weightCreate,
  weightUpdate,
  weightRemove
}
