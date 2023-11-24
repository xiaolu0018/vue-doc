import commonUtil from '@/api/axios'

const baseUrl = '/api/setting/disk'
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
const sysFlavorList = () => commonUtil.generatePromiseGet(baseUrl + '/system/list')
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const updateStatus = ({ id, status }) =>
  commonUtil.generatePromisePost(baseUrl + `/updateStatus`, { id, status })
const getTypes = () => commonUtil.generatePromiseGet(baseUrl + '/data/list')
export default {
  getRunStatus,
  getSearchTypes,
  search,
  sysFlavorList,
  getDetail,
  create,
  update,
  remove,
  updateStatus,
  getTypes
}
