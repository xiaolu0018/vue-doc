import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/transfer/task/'

const getRunStatus = () => [
  {
    key: '禁用',
    val: 0
  },
  {
    key: '启用',
    val: 1
  },
  {
    key: '已删除',
    val: 2
  }
]
const getSearchTypes = () => [
  {
    key: '名称',
    val: 'name'
  }
]

const search = (param) => commonUtil.generatePromisePost(baseUrl + 'search', param)
const detail = (param) => commonUtil.generatePromisePost(baseUrl + `detail`, param)
const cloudTransferTaskRunStatus = () =>
  commonUtil.generatePromiseGet(`/api/common/enums/cloudTransferTaskRunStatus`)

export default {
  getSearchTypes,
  getRunStatus,
  search,
  detail,
  cloudTransferTaskRunStatus
}
