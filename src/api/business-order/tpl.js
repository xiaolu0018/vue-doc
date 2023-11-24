/*
 * @Author: 庞超
 * @Date: 2022-06-17 18:34:20
 * @LastEditors: 庞超
 * @LastEditTime: 2022-09-05 11:16:02
 * @Description: 业务下单接口
 * @FilePath: \src\src\api\business-order\tpl.js
 */
import commonUtil from '@/api/axios'
import { post as post2 } from '@/api/req'
const getSearchTypes = () => [{ key: '模板名称', val: 'name' }]
const prefix = ['10.0', '172.16', '192.168']
// vpc 网段
export const getVPCSegment = () =>
  prefix.map((d) => {
    const segment = d + '.0.0/16'
    return { key: segment, val: segment }
  })
export const getSubnetSegment = () =>
  prefix.map((d) => {
    const segment = d + '.0.0/24'
    return { key: segment, val: segment }
  })
// IP 版本
const getIpVersion = () => [
  { key: 'ipv4', val: 4 },
  { key: 'ipv6', val: 6 }
]
// 带宽
const getBandwidthTypes = () => [
  { key: '2Mbps', val: 2 },
  { key: '4Mbps', val: 4 },
  { key: '6Mbps', val: 6 },
  { key: '8Mbps', val: 8 },
  { key: '10Mbps', val: 10 },
  { key: '12Mbps', val: 12 },
  { key: '14Mbps', val: 14 },
  { key: '16Mbps', val: 16 },
  { key: '18Mbps', val: 18 },
  { key: '20Mbps', val: 20 }
]
// 上联类型
const getLinkTypes = () => [
  { key: '单上联', val: 'auto' },
  { key: '双上联', val: 'double' }
]
// 安全组协议
const getProtocols = () => [
  { id: 1, key: 'TCP', val: 'TCP' },
  { id: 2, key: 'UDP', val: 'UDP' },
  { id: 3, key: 'ICMP', val: 'ICMP' }
]
// 安全组出入栈方向
const getNsgDirection = () => [
  // { id: 1, key: '出栈', val: 'egress' },
  { id: 2, key: '入栈', val: 'ingress' }
]

// http
const get = (path, params) => commonUtil.generatePromiseGet(path, params)
const post = (path, data) => commonUtil.generatePromisePost(path, data)

// template
const tplBaseUrl = '/api/business/template'
// 查询模板列表
const getTemplateSearch = (data) => post(`${tplBaseUrl}/search`, data)
// 保存/更新模板
const saveTemplate = (data) => post(`${tplBaseUrl}/save`, data)
// 删除模板
const deleteTemplate = (id) => post(`${tplBaseUrl}/delete`, { id })
// 获取方案: businessTypeId -> btId
const getTemplateSolution = (btId, data) => post2(`${tplBaseUrl}/solution/${btId}`, data)
// 方案下单
const saveTemplateDeploy = (data) => post(`${tplBaseUrl}/deploy2`, data)
// 参数校验: 该接口只能检查结构是否有问题，不能检查数据
const verifyTemplate = (data) => post(`${tplBaseUrl}/verify`, data)
// 上传模板图片
const uploadTplImage = (id, file) => post(`${tplBaseUrl}/upload/${id}`, file)

// setting
const settingBaseUrl = '/api/setting'
// 镜像列表
const getImageTypes = () => get(`${settingBaseUrl}/image/list`)
// 数据盘规格
const getDataDiskFlavor = () => get(`${settingBaseUrl}/disk/data/list`)
// 系统盘规格
const getSystemDiskFlavor = () => get(`${settingBaseUrl}/disk/system/list`)
// 系统规格
const getCloudFlavor = (params) => get(`${settingBaseUrl}/flavor/list`, params)

// resource
const resourceBaseUrl = '/api/cloud/resource/common'
// 云商
const getCloudTypes = (cloudBusType) =>
  get(`${resourceBaseUrl}/cloudBusType/getCloudType`, { cloudBusType })

// common
const commonBaseUrl = '/api/common'
// 省市列表：直接在请求路径中加入参数可以避免 重复请求的拦截
const getCityList = (id) => get(`${commonBaseUrl}/city/queryCity?id=${id || '100000'}`)
// 云池类型
const getCloudBusType = () => get(`${commonBaseUrl}/enums/cloudBusType`)
// 云池方位
const getRegionType = () => get(`${commonBaseUrl}/enums/regionEnum`)

// business
const baseUrl = '/api/business'
// 业务名称
const getBusinessList = (businessTypeId) => get(`${baseUrl}/list`, { businessTypeId })
// 业务类型
const getBusinessTypes = () => get(`${baseUrl}/type/list`)

export default {
  // resource
  getTemplateSearch,
  saveTemplate,
  deleteTemplate,
  getTemplateSolution,
  saveTemplateDeploy,
  verifyTemplate,
  uploadTplImage,
  // dict
  getImageTypes,
  getDataDiskFlavor,
  getSystemDiskFlavor,
  getCloudFlavor,
  getCloudTypes,
  getCityList,
  getCloudBusType,
  getRegionType,
  getBusinessList,
  getBusinessTypes,
  // constant
  getSearchTypes,
  getVPCSegment,
  getSubnetSegment,
  getBandwidthTypes,
  getLinkTypes,
  getProtocols,
  getIpVersion,
  getNsgDirection
}
