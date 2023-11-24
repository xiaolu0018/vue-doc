import commonUtil from '@/api/axios'
const baseUrl = '/api/ir/strategy'
const getRunStatus = () => [
  {
    key: '禁用',
    val: 0
  },
  {
    key: '启用',
    val: 1
  }
]

const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getSearchTypes = () => []

const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const remove = (param) => commonUtil.generatePromisePost(baseUrl + '/delete', param)
const getFactor = (param) => commonUtil.generatePromiseGet(baseUrl + '/factor/query', param)
const getAlgo = (param) => commonUtil.generatePromiseGet(baseUrl + '/arithmetic/query', param)

const updateAthm = (param) => commonUtil.generatePromisePost(baseUrl + '/arithmetic/update', param)
const updateFactor = (param) => commonUtil.generatePromisePost(baseUrl + `/factor/update`, param)

export default {
  search,
  create,
  remove,
  getRunStatus,
  getSearchTypes,

  getDetail,
  updateAthm,

  updateFactor,
  getFactor,
  getAlgo
}
