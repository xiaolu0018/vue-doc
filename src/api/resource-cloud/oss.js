import commonUtil from '@/api/axios'

const ossBaseUrl = '/api/resource/oss/bucket'
const baseUrl = '/api/resource'
const ossObjectUrl = '/api/resource/oss/object'
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
    key: '桶名称',
    val: 'name'
  }
]

const search = (param) => commonUtil.generatePromisePost(ossBaseUrl + '/search', param)
const list = () => commonUtil.generatePromiseGet(ossBaseUrl + '/oss')
const getDetail = (param) => commonUtil.generatePromisePost(ossBaseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(ossBaseUrl + '/create', param)
const objDetail = (param) => commonUtil.generatePromisePost(baseUrl + `/oss/object/detail`, param)
const remove = (id) => commonUtil.generatePromisePost(ossBaseUrl + `/delete`, { id })

const getOssDataList = (param) => commonUtil.generatePromisePost(ossBaseUrl + `/ossList`, param)
const updateInfo = (id, param) =>
  commonUtil.generatePromisePut(ossBaseUrl + `/updateInfo`, { id, ...param })

const getCrosSearch = (param) => commonUtil.generatePromisePost(baseUrl + `/oss/cors/search`, param)
const getObjSearch = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/oss/object/search`, param)

const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })
const unmountCors = (param) => commonUtil.generatePromisePost(baseUrl + `/oss/cors/delete`, param)
const unmountObj = (param) => commonUtil.generatePromisePost(baseUrl + `/oss/object/delete`, param)

// 文件上传
const initUpload = (param) =>
  commonUtil.generatePromisePost(ossObjectUrl + '/multipart/initiate', param)
const uploadPartOssFile = (param, options) =>
  commonUtil.generatePromisePost(ossObjectUrl + '/multipart/upload', param, true, false, options)
const completeOssFile = (param) =>
  commonUtil.generatePromisePost(ossObjectUrl + '/multipart/complete', param)
const downloadOssFile = (param) => commonUtil.generatePromisePost(`${ossObjectUrl}/download`, param)

export default {
  getRunStatus,
  getSearchTypes,
  search,
  list,
  getDetail,
  create,
  objDetail,
  remove,

  getOssDataList,
  unmountCors,
  unmountObj,

  getCrosSearch,
  getObjSearch,

  getLogSearch,
  updateInfo,

  initUpload,
  uploadPartOssFile,
  completeOssFile,
  downloadOssFile
}
