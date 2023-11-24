import commonUtil from '@/api/axios'
import qs from 'qs'
const baseUrl = '/api/setting/disk/mapping'
const list = (param) =>
  commonUtil.generatePromisePost(
    baseUrl +
      `/list?cloudType=${param.cloudType}&isSystemDisk=true&cpRegionId=${encodeURIComponent(
        param.cpRegionId
      )}`
  )
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
const remove = (ids) => commonUtil.generatePromisePost(baseUrl + `/delete`, { ids })
const getCloudAndRegion = (param) => commonUtil.generatePromisePost(baseUrl + `/searchAll`, param)
const getList = (param) =>
  commonUtil.generatePromisePost(baseUrl + '/list?' + qs.stringify(param || {}))

const deleteExpiredMappings = ({ cloudType, ids }) =>
  commonUtil.generatePromisePost(baseUrl + `/deleteUnableDiskFlavorMapping`, {
    cloudType,
    ids
  })
export default {
  list,
  search,
  create,
  remove,
  getCloudAndRegion,
  getList,
  deleteExpiredMappings
}
