import commonUtil from '@/api/axios'

const baseUrl = '/api/alarm/history'
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
    key: '指标名称',
    val: 'groupName'
  },
  {
    key: 'APP名称',
    val: 'appName'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const level = () => commonUtil.generatePromiseGet('/api/common/enums/level')

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  remove,
  level
}
