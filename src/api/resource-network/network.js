/*
 * @Author: 庞超
 * @Date: 2022-07-07 14:23:08
 * @LastEditors: 庞超
 * @LastEditTime: 2022-07-12 15:21:27
 * @Description: 云联网查询接口
 * @FilePath: \src\src\api\resource-network\network.js
 */
import commonUtil from '@/api/axios'
const getSearchTypes = () => [
  {
    key: '接入区域',
    val: 'regionName'
  }
]

const baseUrl = '/api/resource'
const getCloudBandwidth = (param) =>
  commonUtil.generatePromisePost(baseUrl + '/cloud/bandwidth/queryList', param)

// 网络资源
const networkBaseUrl = '/api/resource/network/info'
const getBgp = (param) => commonUtil.generatePromisePost(networkBaseUrl + '/bgp/search', param)
const getAccessNode = (param) =>
  commonUtil.generatePromisePost(networkBaseUrl + '/network/search', param)
const getPe = (param) => commonUtil.generatePromisePost(networkBaseUrl + '/pe/search', param)

export default {
  getSearchTypes,
  getCloudBandwidth,
  getAccessNode,
  getBgp,
  getPe
}
