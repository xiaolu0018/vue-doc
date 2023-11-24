import commonUtil from '@/api/axios'

const baseUrl = '/api/task'
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
    key: '业务Id',
    val: 'businessId'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const searchSub = (param) => commonUtil.generatePromisePost(baseUrl + `/searchSub`, param)
const stop = (taskId) => commonUtil.generatePromiseGet(baseUrl + `/stopTaskSub/${taskId}`)
const start = (taskId) => commonUtil.generatePromiseGet(baseUrl + `/starTaskSub/${taskId}`)
const del = (taskId) => commonUtil.generatePromiseGet(baseUrl + `/deleteTaskSub/${taskId}`)
const getResourceByTaskId = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/queryResourceByTaskId`, param)
export const updateAuditStatus = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/updateAuditStatus`, param)

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  remove,
  searchSub,
  stop,
  start,
  del,
  getResourceByTaskId,
  updateAuditStatus
}
