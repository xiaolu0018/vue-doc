import commonUtil from '@/api/axios'

const baseUrl = '/api/system/dict'
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
    key: '父级ID',
    val: 'parentId'
  },
  {
    key: '字典代码',
    val: 'code'
  },
  {
    key: '字典名称',
    val: 'dictValue'
  },
  {
    key: '字典值',
    val: 'dictKey'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const searchParentId = (param) => commonUtil.generatePromisePost(baseUrl + `/searchParentId`, param)
const syncCloudRegion = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/fetch/resource`, param)
const updateStatus = (id) => commonUtil.generatePromisePost(baseUrl + `/updateStatus/${id}`)
export default {
  getRunStatus,
  getSearchTypes,
  search,
  create,
  update,
  remove,
  updateStatus,
  searchParentId,
  syncCloudRegion
}
