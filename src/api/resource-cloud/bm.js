/*
 * @Author: 庞超
 * @Date: 2022-07-07 14:23:08
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-22 14:59:42
 * @Description:
 * @FilePath: \src\src\api\resource-cloud\bm.js
 */
import commonUtil from '@/api/axios'

const bmBaseUrl = '/api/resource/bm'
const baseUrl = '/api/resource'
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
    key: '名称',
    val: 'name'
  }
]
const searchSubnet = (param) =>
  commonUtil.generatePromiseGet(`/api/restful/resource/subnet/search?vpcId=${param}`)
const search = (param) => commonUtil.generatePromisePost(bmBaseUrl + '/search', param)
const list = () => commonUtil.generatePromiseGet(bmBaseUrl + '/vms')
const getDetail = (param) => commonUtil.generatePromisePost(bmBaseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(bmBaseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(bmBaseUrl + `/update`, param)
const remove = (id) => commonUtil.generatePromisePost(bmBaseUrl + `/delete`, { id })
const start = (id) => commonUtil.generatePromisePost(bmBaseUrl + `/start`, { id })
const stop = (id) => commonUtil.generatePromisePost(bmBaseUrl + `/stop`, { id })
const restart = (id) => commonUtil.generatePromisePost(bmBaseUrl + `/restart`, { id })
const connectVnc = (id) => commonUtil.generatePromisePost(bmBaseUrl + `/connect/vnc`, { id })
const updateInstance = (param) =>
  commonUtil.generatePromisePost(bmBaseUrl + `/updateInstance`, param)
const changeConnectPwd = (id, vncPwd) =>
  commonUtil.generatePromisePost(bmBaseUrl + 'connect/updateVncPwd', { id, vncPwd })
const getVmDataList = (param) => commonUtil.generatePromisePost(bmBaseUrl + `/vmList`, param)
const updateInfo = (id, param) =>
  commonUtil.generatePromisePut(bmBaseUrl + `/updateInfo`, { id, ...param })

const getDiskSearch = (param) => commonUtil.generatePromisePost(baseUrl + `/disk/search`, param)
const getNsgSearch = (param) => commonUtil.generatePromisePost(baseUrl + `/nsg/search`, param)
const getEipSearch = (param) => commonUtil.generatePromisePost(baseUrl + `/eip/search`, param)
const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })
const unmountDisk = (param) => commonUtil.generatePromisePost(baseUrl + `/disk/detach`, param)
const unmountNsg = (param) => commonUtil.generatePromisePost(baseUrl + `/nsg/detach`, param)
const unmountEip = (param) => commonUtil.generatePromisePost(baseUrl + `/eip/unbind`, param)

export default {
  searchSubnet,
  getRunStatus,
  getSearchTypes,
  search,
  list,
  getDetail,
  create,
  update,
  remove,
  start,
  stop,
  restart,
  connectVnc,
  updateInstance,
  changeConnectPwd,
  getVmDataList,
  unmountDisk,
  unmountNsg,
  unmountEip,
  getDiskSearch,
  getNsgSearch,
  getEipSearch,
  getLogSearch,
  updateInfo
}
