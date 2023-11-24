import commonUtil from '@/api/axios'

const baseUrl = '/api/setting/flavorFamily'
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
const getFamilyType = () => [
  {
    key: 'CLOUD_CPU_VM',
    val: '云服务器'
  },
  {
    key: 'CLOUD_GPU_VM',
    val: 'GPU服务器'
  },
  {
    key: 'IRONIC',
    val: '裸机'
  }
]
const getSearchTypes = () => [
  {
    key: '名称',
    val: 'cpName'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const list = () => commonUtil.generatePromiseGet(baseUrl + '/list')
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const updateStatus = ({ id, status }) =>
  commonUtil.generatePromisePost(baseUrl + `/updateStatus`, { id, status })
const deleteLapseFlavorFamily = ({ cloudTypes, ids }) =>
  commonUtil.generatePromisePost(baseUrl + `/deleteLapseFlavorFamily`, { cloudTypes, ids })

export default {
  getRunStatus,
  getFamilyType,
  getSearchTypes,
  search,
  list,
  getDetail,
  create,
  update,
  remove,
  updateStatus,
  deleteLapseFlavorFamily
}
