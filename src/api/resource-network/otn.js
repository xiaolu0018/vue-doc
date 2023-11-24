import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/otn'
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
const list = (param) => commonUtil.generatePromiseGet(baseUrl + '/list', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })

const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })

// 路由条目

const routeEntrySearch = (param) => commonUtil.generatePromisePost(baseUrl + '/entry/search', param)

export default {
  getRunStatus,
  getSearchTypes,
  search,
  list,
  getDetail,
  create,
  update,
  remove,
  getLogSearch,
  routeEntrySearch
}
