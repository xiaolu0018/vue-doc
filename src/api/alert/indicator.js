import commonUtil from '@/api/axios'

const baseUrl = '/api/alarm/metric'
const getSearchTypes = () => [
  {
    key: '指标名称',
    val: 'groupName'
  },
  {
    key: '云商指标名称',
    val: 'cpName'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const updateStatus = (param) => commonUtil.generatePromisePost(baseUrl + '/updateStatus', param)
const getBusinessType = () => commonUtil.generatePromisePost(baseUrl + `/type/searchAll`)
const getMetricList = (param) => commonUtil.generatePromisePost(baseUrl + `/list`, param)
/**
 * 初始化导入告警指标数据
 */
const initialize = () => commonUtil.generatePromisePost(baseUrl + `/initialize`)

export default {
  initialize,
  updateStatus,
  search,
  getBusinessType,
  getSearchTypes,
  getMetricList
}
