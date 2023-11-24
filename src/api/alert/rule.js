import commonUtil from '@/api/axios'

const baseUrl = '/api/alarm/rule'
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
    key: '规则名称',
    val: 'name'
  },
  {
    key: '指标名称',
    val: 'metricName'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/updateInfo`, param)
const updateStatus = ({ id, status }) =>
  commonUtil.generatePromisePost(baseUrl + `/updateStatus`, { id, status })
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const getBusinessType = () => commonUtil.generatePromisePost(baseUrl + `/type/searchAll`)

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  updateStatus,
  remove,
  getBusinessType
}
