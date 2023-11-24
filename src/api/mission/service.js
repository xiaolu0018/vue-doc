import { downloadExcel } from '@/api/req'
import commonUtil from '@/api/axios'

const baseUrl = '/api/restful/mission/service'
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
    key: '服务名称',
    val: 'name'
  }
]

const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)

const detail = (param) => commonUtil.generatePromisePost(baseUrl + `/detail`, param)
const create = (param) => commonUtil.generatePromisePost(baseUrl + `/create`, param)
const remove = (param) => commonUtil.generatePromisePost(baseUrl + `/delete`, param)
const updateStatus = (param) => commonUtil.generatePromisePost(baseUrl + `/updateStatus`, param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)

export default {
  getRunStatus,
  getSearchTypes,
  search,
  create,
  detail,
  remove,
  update,
  updateStatus
}
