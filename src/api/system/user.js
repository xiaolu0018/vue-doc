import commonUtil from '@/api/axios'

const baseUrl = '/api/system/user'
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
    key: '用户账号',
    val: 'username'
  },
  {
    key: '手机号',
    val: 'phone'
  },
  {
    key: '邮箱',
    val: 'email'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const reset = (id) => commonUtil.generatePromisePost(baseUrl + `/resetPassword/${id}`)

const updateStatus = (id) => commonUtil.generatePromisePost(baseUrl + `/updateStatus/${id}`)
const updateLockStatus = ({ id }) => commonUtil.generatePromisePost(baseUrl + `/unlock/${id}`)
export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  updateStatus,
  updateLockStatus,
  update,
  remove,
  reset
}
