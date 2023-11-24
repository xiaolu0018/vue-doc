import commonUtil from '@/api/axios'

// todo: 待更新

const baseUrl = '/api/menu/subTree'
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
const search = (param) => commonUtil.generatePromisePost(baseUrl, param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const searchSub = (param) => commonUtil.generatePromisePost(baseUrl + `/searchSub`, param)

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  remove,
  searchSub
}
