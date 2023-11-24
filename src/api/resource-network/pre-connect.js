/*
 * @Author: 庞超
 * @Date: 2023-01-18 14:48:40
 * @LastEditors: 庞超
 * @LastEditTime: 2023-01-18 16:21:21
 * @Description:
 * @FilePath: /src/src/api/resource-network/pre-connect.js
 */
import { downloadExcel } from '@/api/req'
import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/network/prelink'
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
    key: '省',
    val: 'province'
  },
  {
    key: '市',
    val: 'city'
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/search', param)
const sync = () => commonUtil.generatePromisePost(baseUrl + '/sync')
const complement = (param) => commonUtil.generatePromisePost(baseUrl + '/complement/upload', param)
const upload = (param) => commonUtil.generatePromisePost(baseUrl + `/upload`, param)
const remove = (param) => commonUtil.generatePromisePost(baseUrl + `/delete`, param)
const update = (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param)
const download = () => downloadExcel(baseUrl + `/download`)

export default {
  getRunStatus,
  getSearchTypes,
  search,
  sync,
  complement,
  upload,
  remove,
  update,
  download
}
