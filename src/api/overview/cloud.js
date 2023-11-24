import commonUtil from '@/api/axios'

const baseUrl = '/api/main/network/'
export const getTopStat = (areaId) =>
  commonUtil.generatePromiseGet(baseUrl + `queryResource?areaId=${areaId}`) // 顶部
export const getProvinceStat = (areaId) =>
  commonUtil.generatePromiseGet(baseUrl + `queryProvinceAreaResource?areaId=${areaId}`) // 底部
export const getQuotaStat = (areaId) =>
  commonUtil.generatePromiseGet(baseUrl + `queryCloudQuotaData?areaId=${areaId}`) // 配额
export const getCloudAndPoolStat = (areaId) =>
  commonUtil.generatePromiseGet(baseUrl + `queryCloudBus?areaId=${areaId}`) // 云池
export const getBottomAreaStat = () => commonUtil.generatePromiseGet(baseUrl + `queryAreaPoolCloud`) // 区域云池数量
export const getTop5 = () => commonUtil.generatePromiseGet(baseUrl + `queryCityAreaResource`)
export const getScatter = (params) =>
  commonUtil.generatePromisePost(`/api/pool/cloud/getAllCloud`, params)
export const getLines = (poolCloudId) =>
  commonUtil.generatePromiseGet(baseUrl + `queryPoolNetwork/${poolCloudId}`)
export const getNetwork = (areaId) =>
  commonUtil.generatePromiseGet(baseUrl + `queryNetworkData?areaId=${areaId}`)
export const getProvincePoolData = (areaId) =>
  commonUtil.generatePromiseGet(baseUrl + `queryProvincePoolResource?areaId=${areaId}`) // 底部
export const queryPoolCloudQuota = (params) =>
  commonUtil.generatePromisePost(`${baseUrl}queryPoolCloudQuota`, params) // 配额分页列表
export const queryNetworkAvailableBandwidth = (params) =>
  commonUtil.generatePromisePost(`${baseUrl}queryNetworkAvailableBandwidth`, params) // 可用带宽列表

export default {
  getTopStat,
  getProvinceStat,
  getQuotaStat,
  getCloudAndPoolStat,
  getBottomAreaStat,
  getTop5,
  getScatter,
  getLines,
  getNetwork,
  getProvincePoolData,
  queryPoolCloudQuota,
  queryNetworkAvailableBandwidth
}
