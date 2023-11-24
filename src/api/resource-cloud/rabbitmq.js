import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/rabbitmq'
const getSearchTypes = () => [
  {
    key: '名称',
    val: 'name'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const detail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
export default {
  getSearchTypes,
  search,
  getDetail,
  update,
  remove,
  detail
}
