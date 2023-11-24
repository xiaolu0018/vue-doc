/*
 * @Author: 庞超
 * @Date: 2022-07-11 17:13:20
 * @LastEditors: 肖波 xiaoboc@dcits.com
 * @LastEditTime: 2023-11-14 16:01:55
 * @Description:
 * @FilePath: \src\src\api\common.js
 */
import commonUtil from './axios'
import qs from 'qs'

const baseUrl = '/api/common'
const baseCloudUrl = '/api/cloud/resource/common'

export const commonRequest = {
  getSearchUi: (moduleIdEnum) =>
    commonUtil.generatePromiseGet(baseUrl + `/search/ui?moduleIdEnum=${moduleIdEnum}`),
  getDicData: (url) => commonUtil.generatePromiseGet(url),
  getEnumsDisEnable: () => commonUtil.generatePromiseGet(baseUrl + `/enums/disEnable`),
  getEnumsVmRunStatus: () => commonUtil.generatePromiseGet(baseUrl + `/enums/vmRunStatus`),
  getEnumsResourceRunStatus: () =>
    commonUtil.generatePromiseGet(baseUrl + `/enums/resourceRunStatus`),
  getEnumsResourceKind: () => commonUtil.generatePromiseGet(baseUrl + `/enums/resourceKind`),
  getEnumsShareStatus: () => commonUtil.generatePromiseGet(baseUrl + `/enums/shareStatus`),
  getEnumsCloudBusType: () => commonUtil.generatePromiseGet(baseUrl + `/enums/cloudBusType`),
  getCloudType: () => commonUtil.generatePromiseGet(baseUrl + `/enums/cloudType`),
  getTaskType: () => commonUtil.generatePromiseGet(baseUrl + `/enums/taskType`),
  getTaskRunStatus: () => commonUtil.generatePromiseGet(baseUrl + `/enums/taskRunStatusEnum `),
  getResourceType: () => commonUtil.generatePromiseGet(baseUrl + `/enums/resourceType`),
  getRequestType: () => commonUtil.generatePromiseGet(baseUrl + `/enums/requestType`),
  getCloudPool: (resourceType) =>
    commonUtil.generatePromiseGet(`/api/pool/cloud/list?resourceType=${resourceType || ''}`),
  getLog: (param) => commonUtil.generatePromisePost(`/api/task/log`, param),
  getDbType: () => commonUtil.generatePromiseGet(baseUrl + `/enums/dbType`),
  // 无路由子菜单
  getMenuSubTree: (parentId) => commonUtil.generatePromiseGet(`api/system/menu/irTree/${parentId}`),
  // 路由子菜单
  getSubTree: (parentId) => commonUtil.generatePromiseGet(`api/system/menu/subTree/${parentId}`),
  upload: (param) => commonUtil.generatePromisePost(`api/file/upload`, param),
  getEnumDic: () => commonUtil.generatePromiseGet(baseUrl + `/enums/dict`), // enum字典
  getDataByDicUrl: (url, method = '') => {
    if (method.toLocaleLowerCase() === 'post') {
      const queryString = url.substring(url.indexOf('?') + 1)
      const param = qs.parse(queryString)
      return commonUtil.generatePromisePost(url, param)
    }
    return commonUtil.generatePromiseGet(url)
  }
}
export const commonCloudRequest = {
  // 根据云商同步对应资源 --已废弃
  // fetchResource: () => commonUtil.generatePromiseGet(baseCloudUrl + `/fetch/resource`),
  // 获取所有云商
  getCloudType: () => commonUtil.generatePromiseGet(baseUrl + `/cloudType/list`),
  getCloudTypeByType: (param) => commonUtil.generatePromiseGet(baseUrl + `/queryCloudTypes`, param),
  getCloudQuota: (cloudType, code) =>
    commonUtil.generatePromiseGet(baseUrl + `/queryQuota/${cloudType}/${code}`), // 云池配额
  getCpName: (param) =>
    commonUtil.generatePromisePost(`/api/cloud/resource/common/getFlavorFamily`, param),
  //获取镜像类型
  getImageType: () => commonUtil.generatePromiseGet(baseCloudUrl + `/getImageType`),
  // 获取磁盘类型
  getDiskFlavor: ({ cloudType, cpRegionId, cpZoneId, isSystemDisk }) =>
    commonUtil.generatePromiseGet(
      baseCloudUrl +
        `/getDiskFlavor/${cloudType}/${encodeURIComponent(cpRegionId)}/${cpZoneId}/${isSystemDisk}`
    ),
  getRdsDiskFlavor: ({ cloudType, cpRegionId, cpZoneId }) =>
    commonUtil.generatePromiseGet(
      baseCloudUrl + `/getRdsDiskFlavor/${cloudType}/${encodeURIComponent(cpRegionId)}/${cpZoneId}`
    ),
  getPostgreSQLDiskFlavor: ({ cloudType, cpRegionId, cpZoneId }) =>
    commonUtil.generatePromiseGet(
      baseCloudUrl +
        `/getPostgreSQLDiskFlavor/${cloudType}/${encodeURIComponent(cpRegionId)}/${cpZoneId}`
    ),
  getKafkaDiskFlavor: ({ cloudType, cpRegionId, cpZoneId }) =>
    commonUtil.generatePromiseGet(
      baseCloudUrl +
        `/getKafkaDiskFlavor/${cloudType}/${encodeURIComponent(cpRegionId)}/${cpZoneId}`
    ),
  getPostgreSQLFlavor: ({ cloudType, cpRegionId, cpZoneId }) =>
    commonUtil.generatePromiseGet(
      baseCloudUrl +
        `/getPostgreSQLFlavor/${cloudType}/${encodeURIComponent(cpRegionId)}/${cpZoneId}`
    ),
  // 根据云商获取对应专区
  getFlavor: ({ cloudType, cpRegionId, cpZoneId }) =>
    commonUtil.generatePromiseGet(
      baseCloudUrl + `/getFlavor/${cloudType}/${encodeURIComponent(cpRegionId)}/${cpZoneId}`
    ),
  // 根据云商获取对应专区
  getGpuFlavor: ({ cloudType, cpRegionId, cpZoneId }) =>
    commonUtil.generatePromiseGet(
      baseCloudUrl + `/getGpuFlavor/${cloudType}/${encodeURIComponent(cpRegionId)}/${cpZoneId}`
    ),
  getRDSFlavor: ({ cloudType, cpRegionId, cpZoneId, instanceType }) =>
    commonUtil.generatePromiseGet(
      baseCloudUrl +
        `/getRdsFlavor/${cloudType}/${encodeURIComponent(cpRegionId)}/${cpZoneId}/${instanceType}`
    ),
  getRedisFlavor: ({ cloudType, cpRegionId, cpZoneId }) =>
    commonUtil.generatePromiseGet(
      baseCloudUrl + `/getRedisFlavor/${cloudType}/${encodeURIComponent(cpRegionId)}/${cpZoneId}`
    ),
  getBmFlavor: ({ cloudType, cpRegionId, cpZoneId }) =>
    commonUtil.generatePromiseGet(
      baseCloudUrl + `/getBmFlavor/${cloudType}/${encodeURIComponent(cpRegionId)}/${cpZoneId}`
    ),
  getRabbitMqFlavor: ({ cloudType, cpRegionId, cpZoneId }) =>
    commonUtil.generatePromiseGet(
      baseCloudUrl + `/getRabbitMqFlavor/${cloudType}/${encodeURIComponent(cpRegionId)}/${cpZoneId}`
    ),
  getRabbitMqDiskFlavor: ({ cloudType, cpRegionId, cpZoneId }) =>
    commonUtil.generatePromiseGet(
      baseCloudUrl +
        `/getRabbitMqDiskFlavor/${cloudType}/${encodeURIComponent(cpRegionId)}/${cpZoneId}`
    ),
  // 根据云商获取对应区域
  getRegion: (cloudType = '') =>
    commonUtil.generatePromiseGet(baseCloudUrl + `/getRegion/${cloudType}`),
  // 根据云商获取对应专区(可用区)
  getZone: ({ cloudType, cpRegionId }) =>
    commonUtil.generatePromiseGet(
      baseCloudUrl + `/getZone/${cloudType}/${encodeURIComponent(cpRegionId)}`
    ),
  getImage: ({ cloudType, cpRegionId, imageType, osPlatform, imageVersion }) =>
    commonUtil.generatePromiseGet(
      baseCloudUrl +
        `/getImage/${cloudType}/${encodeURIComponent(
          cpRegionId
        )}?imageType=${imageType}&osPlatform=${osPlatform}&imageVersion=${imageVersion}`
    )
}

export const commonBusiness = {
  getQueryParameter(val, row) {
    if (typeof val === 'string') {
      const entry = {}
      entry[val] = row[val]
      return entry
    } else if (val instanceof Array) {
      const entry = {}
      val.forEach((f) => (entry[f] = row[f]))
      return entry
    } else if (
      typeof val === 'object' &&
      Object.prototype.toString.call(val).toLowerCase() === '[object object]' &&
      !val.length
    ) {
      const entry = {}
      Object.entries(val).forEach(([k, v]) => (entry[k] = row[v]))
      return entry
    } else {
      return { id: val }
    }
  }
}
