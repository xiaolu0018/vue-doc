import commonUtil from '@/api/axios'

const baseUrl = '/api/ai/networkFlowRemain'
const getRunStatus = () => [
  {
    key: '禁用',
    val: 0
  },
  {
    key: '启用',
    val: 1
  },
  {
    key: '已删除',
    val: 2
  }
]
const getSearchTypes = () => [
  {
    key: '云账号名称',
    val: 'username'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = ([id]) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })

export default {
  getRunStatus,
  getSearchTypes,
  search,
  create,
  update,
  remove
}
