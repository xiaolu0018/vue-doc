import commonUtil from '@/api/axios'

const baseUrl = '/api/main/resource/'
export const getCloudNumByType = () =>
  commonUtil.generatePromiseGet(baseUrl + `queryCloudNumByType`)
export const getCloudResource = (businessId = '') =>
  commonUtil.generatePromiseGet(baseUrl + `queryCloudResource?businessId=${businessId}`)
export const getQuota = () => commonUtil.generatePromiseGet(baseUrl + `queryQuota`)
export const getResource = () => commonUtil.generatePromiseGet(baseUrl + `queryResource`)

export default {
  getCloudNumByType,
  getCloudResource,
  getQuota,
  getResource
}
