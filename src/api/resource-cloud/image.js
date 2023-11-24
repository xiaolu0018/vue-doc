import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/image'
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
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const getDetail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const update = (id, param) =>
  commonUtil.generatePromisePost(baseUrl + `/updateInfo`, { id, ...param })
const remove = (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id })
const getLogSearch = (id) => commonUtil.generatePromisePost(baseUrl + `/log/search`, { id })
const bind = (param) => commonUtil.generatePromisePost(baseUrl + `/bind`, param)
const unbind = (param) => commonUtil.generatePromisePost(baseUrl + `/unbind`, param)

// 上传自定义镜像
const uploadImg = (param) =>
  commonUtil.generatePromisePost('/api/restful/resource/image/import', param, true, false, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 5 * 60 * 1000 // 5分钟
  })

export default {
  getRunStatus,
  getSearchTypes,
  search,
  getDetail,
  create,
  update,
  remove,
  getLogSearch,
  bind,
  unbind,
  uploadImg
}
