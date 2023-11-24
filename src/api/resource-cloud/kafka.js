import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/kafka'
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
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/instance/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/instance/detail', param)
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/instance/delete`, { id })
const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })

const topicSearch = (param) => commonUtil.generatePromisePost(baseUrl + '/topic/search', param)
const topicRemove = (id) => commonUtil.generatePromisePost(baseUrl + `/topic/delete`, { id })
const topicDetail = (id) => commonUtil.generatePromisePost(baseUrl + `/topic/detail`, { id })

const consumerSearch = (param) => commonUtil.generatePromisePost(baseUrl + '/group/search', param)
const consumerRemove = (id) => commonUtil.generatePromisePost(baseUrl + `/group/delete`, { id })

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  remove,
  getLogSearch,
  topicSearch,
  topicRemove,
  topicDetail,
  consumerSearch,
  consumerRemove
}
