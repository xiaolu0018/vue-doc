import commonUtil from '@/api/axios'

const baseUrl = '/api/setting/flavor'
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
const list = () => commonUtil.generatePromiseGet(baseUrl + '/list')
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const updateStatus = ({ id, status }) =>
  commonUtil.generatePromisePost(baseUrl + `/updateStatus`, { id, status })
const getFlavorType = () => commonUtil.generatePromiseGet('/api/common/enums/flavorType')

export default {
  getRunStatus,
  getFlavorType,
  getSearchTypes,
  search,
  list,
  getDetail,
  create,
  update,
  remove,
  updateStatus
}
