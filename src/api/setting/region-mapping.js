import commonUtil from '@/api/axios'

const baseUrl = '/api/setting/region/mapping'
const getSearchTypes = () => [
  {
    key: '云区域',
    val: 'cloudRegionName'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const getCloudAndRegion = (param) => commonUtil.generatePromisePost(baseUrl + `/searchAll`, param)
const getCpRegionList = (param) =>
  commonUtil.generatePromisePost(baseUrl + '/getCpRegionList', param)
export default {
  search,
  create,
  remove,
  getCloudAndRegion,
  getCpRegionList,
  getSearchTypes
}
