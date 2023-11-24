import commonUtil from '@/api/axios'
import { appKeyHeaders } from '../capacity/scene'
const baseUrl = '/api/business'
const sourceBaseUrl = '/api/resource'
const solutionBaseUrl = '/api/ir/solution'
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
    key: '业务实例名称',
    val: 'name'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const getBusinessType = () => commonUtil.generatePromisePost(baseUrl + `/type/searchAll`)

const getVmSearch = (param) => commonUtil.generatePromisePost(sourceBaseUrl + `/vm/search`, param)
const getDiskSearch = (param) =>
  commonUtil.generatePromisePost(sourceBaseUrl + `/disk/search`, param)
const getNsgSearch = (param) => commonUtil.generatePromisePost(sourceBaseUrl + `/nsg/search`, param)
const getEipSearch = (param) => commonUtil.generatePromisePost(sourceBaseUrl + `/eip/search`, param)
const getVpcSearch = (param) => commonUtil.generatePromisePost(sourceBaseUrl + `/vpc/search`, param)
const getVpnSearch = (param) => commonUtil.generatePromisePost(sourceBaseUrl + `/vpn/search`, param)
const getOssSearch = (param) =>
  commonUtil.generatePromisePost(sourceBaseUrl + `/oss/bucket/search`, param)
const getNodeSearch = (param) =>
  commonUtil.generatePromisePost(sourceBaseUrl + `/network/node/search`, param)
const getLogSearch = (id) => commonUtil.generatePromisePost(sourceBaseUrl + `/log/search`, { id })
const getTaskSearch = (param) => commonUtil.generatePromisePost(`/api/task/searchSub`, param)
const getResourceView = (businessId) =>
  commonUtil.generatePromisePost(baseUrl + `/businessResourcePicture?businessId=${businessId}`)

// 获取业务解构图统计数据数据
const getCountBusinessDispatchNum = (param) =>
  commonUtil.generatePromisePost(
    solutionBaseUrl + `/countBusinessDispatchNum`,
    param,
    ...appKeyHeaders
  )
// 获取业务调度图相关数据
const getBusinessDispatch = (id) =>
  commonUtil.generatePromisePost(
    solutionBaseUrl + `/queryBusinessDispatch/${id}`,
    {},
    ...appKeyHeaders
  )
// 获取编排方案图相关数据
const getBusinessSolution = (param) =>
  commonUtil.generatePromisePost(
    solutionBaseUrl + `/queryBusinessSolution`,
    param,
    ...appKeyHeaders
  )

const getStrategyList = (businessId, operation) =>
  commonUtil.generatePromisePost(
    solutionBaseUrl + `/queryStrategyList/${businessId}/${operation}`,
    {},
    ...appKeyHeaders
  )
const getStrategyListById = (id, operation) =>
  commonUtil.generatePromisePost(
    solutionBaseUrl + `/queryStrategyListById/${id}/${operation}`,
    {},
    ...appKeyHeaders
  )
// 获取方案架构图
const getDeconstructJsonDataByBusinessId = (businessId) =>
  commonUtil.generatePromisePost(
    solutionBaseUrl + `/queryDeconstructJsonDataByBusinessId/${businessId}`,
    {},
    ...appKeyHeaders
  )
// 获取聚合服务拓扑图
const getBusinessDeconstruct = (baseInfoId) =>
  commonUtil.generatePromisePost(
    solutionBaseUrl + `/queryDeconstructJsonData/${baseInfoId}`,
    ...appKeyHeaders
  )

export default {
  getVpnSearch,
  getOssSearch,
  getVpcSearch,
  getVmSearch,
  getTaskSearch,
  getLogSearch,
  getEipSearch,
  getNsgSearch,
  getDiskSearch,
  getNodeSearch,
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  remove,
  getBusinessType,
  getResourceView,
  getCountBusinessDispatchNum,
  getBusinessDispatch,
  getBusinessSolution,
  getStrategyList,
  getStrategyListById,
  getDeconstructJsonDataByBusinessId,
  getBusinessDeconstruct
}
