import commonUtil from '@/api/axios'

const baseUrl = '/api/system/role'
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
    key: '角色名称',
    val: 'name'
  }
]
const getRoutes = () => commonUtil.generatePromiseGet('/api/system/routes')
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const updateStatus = (id) => commonUtil.generatePromisePost(baseUrl + `/updateStatus/${id}`)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const reset = (id) => commonUtil.generatePromisePost(baseUrl + `/updateSecret`, { id })
const searchSecret = (id) => commonUtil.generatePromisePost(baseUrl + `/searchSecret`, { id })
const menuPerms = (id) => commonUtil.generatePromiseGet(baseUrl + `/menus/${id}`)
const PermsList = () => commonUtil.generatePromiseGet(`/api/system/menu/list`)

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
  getRoutes,
  menuPerms,
  PermsList
}
