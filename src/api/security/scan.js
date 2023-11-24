import commonUtil from '@/api/axios'

const baseUrl = '/api/security/scan'
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
    key: '实例名称',
    val: 'name'
  },
  {
    key: '资源ID',
    val: 'id'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)

const taskdetail = (param) => commonUtil.generatePromisePost(baseUrl + '/task/detail', param)
const tasksearch = (param) => commonUtil.generatePromisePost(baseUrl + '/task/search', param)
const getOfflineTool = (param) =>
  commonUtil.generatePromisePost(baseUrl + '/task/getOfflineTool', param)
const uploadResult = (param) =>
  commonUtil.generatePromisePost(baseUrl + '/task/uploadResult', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const createTask = (param) => commonUtil.generatePromisePost(baseUrl + '/task/create', param)
const deleteTask = (id) => commonUtil.generatePromisePost(baseUrl + '/task/delete', { id })
const templateList = (param) =>
  commonUtil.generatePromisePost(baseUrl + '/task/getTemplateList', param)
const baselineTemplateInfo = (param) =>
  commonUtil.generatePromisePost(baseUrl + '/task/getBaselineTemplateInfo', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })

export default {
  uploadResult,
  getOfflineTool,
  getRunStatus,
  getSearchTypes,
  tasksearch,
  search,
  getDetail,
  create,
  taskdetail,
  createTask,
  update,
  deleteTask,
  templateList,
  baselineTemplateInfo,
  remove
}
