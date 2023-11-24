/*
 * @Author: 庞超
 * @Date: 2022-07-07 14:23:08
 * @LastEditors: 庞超
 * @LastEditTime: 2022-08-22 14:59:42
 * @Description:
 * @FilePath: \src\src\api\resource-cloud\vm.js
 */
import commonUtil from '@/api/axios'

const vmBaseUrl = '/api/resource/vm'
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
const search = (param) => commonUtil.generatePromisePost(vmBaseUrl + '/search', param)
const list = () => commonUtil.generatePromiseGet(vmBaseUrl + '/vms')
const getDetail = (param) => commonUtil.generatePromisePost(vmBaseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(vmBaseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(vmBaseUrl + `/update`, param)
const remove = (id) => commonUtil.generatePromisePost(vmBaseUrl + `/delete`, { id })
const start = (id) => commonUtil.generatePromisePost(vmBaseUrl + `/start`, { id })
const stop = (id) => commonUtil.generatePromisePost(vmBaseUrl + `/stop`, { id })
const restart = (id) => commonUtil.generatePromisePost(vmBaseUrl + `/restart`, { id })
const connectVnc = (id) => commonUtil.generatePromisePost(vmBaseUrl + `/connect/vnc`, { id })
const updateInstance = (param) =>
  commonUtil.generatePromisePost(vmBaseUrl + `/updateInstance`, param)
const changeConnectPwd = (id, vncPwd) =>
  commonUtil.generatePromisePost(vmBaseUrl + 'connect/updateVncPwd', { id, vncPwd })
const getVmDataList = (param) => commonUtil.generatePromisePost(vmBaseUrl + `/vmList`, param)
const updateInfo = (id, param) =>
  commonUtil.generatePromisePut(vmBaseUrl + `/updateInfo`, { id, ...param })

const getDiskSearch = (param) => commonUtil.generatePromisePost(baseUrl + `/disk/search`, param)
const getNsgSearch = (param) => commonUtil.generatePromisePost(baseUrl + `/nsg/search`, param)
const getEipSearch = (param) => commonUtil.generatePromisePost(baseUrl + `/eip/search`, param)
const getLogSearch = (id) =>
  commonUtil.generatePromisePost(`/api/business/queryBusinessLog`, { id })
const unmountDisk = (param) => commonUtil.generatePromisePost(baseUrl + `/disk/detach`, param)
const unmountNsg = (param) => commonUtil.generatePromisePost(baseUrl + `/nsg/detach`, param)
const unmountEip = (param) => commonUtil.generatePromisePost(baseUrl + `/eip/unbind`, param)

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
  updateInfo
}
