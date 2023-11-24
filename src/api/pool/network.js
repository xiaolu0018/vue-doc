import commonUtil from '@/api/axios'

const baseUrl = '/api/pool/network'
const getRunStatus = () => [
  {
    key: '云池1',
    val: 'Disable'
  },
  {
    key: '云池2',
    val: 'Enable'
  }
]
const getSearchTypes = () => [
  {
    key: '名称',
    val: 'name'
  },
  {
    key: 'A端名称',
    val: 'poolCloudAName'
  },
  {
    key: 'B端名称',
    val: 'poolCloudBName'
  },
  {
    key: '平均时延<=',
    val: 'latencyAverage'
  },
  {
    key: '丢包<=',
    val: 'packetLossRate'
  },
  {
    key: '抖动<=',
    val: 'jitter'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const checkUploadState = () => commonUtil.generatePromiseGet(baseUrl + `/find`)

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  remove,
  checkUploadState
}
