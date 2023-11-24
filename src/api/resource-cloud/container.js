/*
 * @Author: 庞超
 * @Date: 2022-07-07 14:23:08
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-22 14:59:42
 * @Description:
 * @FilePath: \src\src\api\resource-cloud\vm.js
 */
import commonUtil from '@/api/axios'

const containerBaseUrl = '/api/resource/container/cluster'
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
const search = (param) => commonUtil.generatePromisePost(containerBaseUrl + '/search', param)
const list = () => commonUtil.generatePromiseGet(containerBaseUrl + '/vms')
const getDetail = (param) => commonUtil.generatePromisePost(containerBaseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(containerBaseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(containerBaseUrl + `/update`, param)
const remove = (id) => commonUtil.generatePromisePost(containerBaseUrl + `/delete`, { id })
const start = (id) => commonUtil.generatePromisePost(containerBaseUrl + `/start`, { id })
const stop = (id) => commonUtil.generatePromisePost(containerBaseUrl + `/stop`, { id })
const restart = (id) => commonUtil.generatePromisePost(containerBaseUrl + `/restart`, { id })
const connectVnc = (id) => commonUtil.generatePromisePost(containerBaseUrl + `/connect/vnc`, { id })
const updateInstance = (param) =>
  commonUtil.generatePromisePost(containerBaseUrl + `/updateInstance`, param)
const changeConnectPwd = (id, vncPwd) =>
  commonUtil.generatePromisePost(containerBaseUrl + 'connect/updateVncPwd', { id, vncPwd })
const getVmDataList = (param) => commonUtil.generatePromisePost(containerBaseUrl + `/vmList`, param)
const updateInfo = (id, param) =>
  commonUtil.generatePromisePut(containerBaseUrl + `/updateInfo`, { id, ...param })

const getDiskSearch = (param) => commonUtil.generatePromisePost(baseUrl + `/disk/search`, param)
const getNsgSearch = (param) => commonUtil.generatePromisePost(baseUrl + `/nsg/search`, param)
const getEipSearch = (param) => commonUtil.generatePromisePost(baseUrl + `/eip/search`, param)
const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })
const unmountDisk = (param) => commonUtil.generatePromisePost(baseUrl + `/disk/detach`, param)
const unmountNsg = (param) => commonUtil.generatePromisePost(baseUrl + `/nsg/detach`, param)
const unmountEip = (param) => commonUtil.generatePromisePost(baseUrl + `/eip/unbind`, param)
const nodePoolList = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/container/nodePool/search`, param)
const delNode = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/container/nodePool/delete`, param)
const updateNode = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/container/nodePool/update`, param)

export default {
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
  updateInfo,
  nodePoolList,
  delNode,
  updateNode
}
