import commonUtil from '@/api/axios'

const baseUrl = '/api/system-resource-bill'
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
    val: 'resourceName'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/list', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const detail = (resourceId) => commonUtil.generatePromisePost(baseUrl + `/detail/` + resourceId)
export default {
  getRunStatus,
  getSearchTypes,
  search,
  create,
  update,
  detail
}
