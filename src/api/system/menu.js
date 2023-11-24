import commonUtil from '@/api/axios'

const baseUrl = '/api/system/menu'
const appUrl = '/api/app'
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
    key: '菜单名称',
    val: 'name'
  }
]
const getRoutes = () => commonUtil.generatePromiseGet('/api/system/routes')
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const updateStatus = (id) => commonUtil.generatePromisePost(baseUrl + `/updateStatus/${id}`)
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const reset = (id) => commonUtil.generatePromisePost(baseUrl + `/updateSecret`, { id })
const searchSecret = (id) => commonUtil.generatePromisePost(baseUrl + `/searchSecret`, { id })
const cbSearch = (param) => commonUtil.generatePromisePost(appUrl + `/callback/search`, param)

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  updateStatus,
  remove,
  reset,
  searchSecret,
  cbSearch,
  getRoutes
}
