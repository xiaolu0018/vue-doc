import { downloadExcel } from '@/api/req'
import commonUtil from '@/api/axios'

const baseUrl = '/api/mission/service/record'
const getRunStatus = () => [
  {
    val: '无',
    key: 'NONE'
  },
  {
    val: '资源未部署',
    key: 'UNDEPLOYED'
  },
  {
    val: '资源已部署',
    key: 'DEPLOYED'
  },
  {
    val: '已完成',
    key: 'SUCCESS'
  },
  {
    val: '失败',
    key: 'FAILED'
  }
  // {
  //   val: '执行中',
  //   key: 'PENDING'
  // },
  // {
  //   val: '部分完成',
  //   key: 'PART_SUCCESS'
  // },
  // {
  //   val: '已上线',
  //   key: 'ONLINE'
  // },
  // {
  //   val: '已下线',
  //   key: 'OFFLINE'
  // },
  // {
  //   val: '已删除',
  //   key: 'DELETED'
  // }
]

const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)

const detail = (param) => commonUtil.generatePromisePost(baseUrl + `/detail`, param)

export default {
  getRunStatus,
  search,
  detail
}
