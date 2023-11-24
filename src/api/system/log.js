/*
 * @Author: 庞超
 * @Date: 2022-07-12 16:33:25
 * @LastEditors: 庞超
 * @LastEditTime: 2022-07-13 15:08:02
 * @Description:
 * @FilePath: \src\src\api\system\log.js
 */
import commonUtil from '@/api/axios'

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
    key: '请求地址',
    val: 'requestUrl'
  },
  {
    key: '响应码',
    val: 'responseCode'
  }
]

// 系统日志
export function useSystemLogRequest() {
  const baseUrl = '/api/system/log/search'
  const search = (param) => commonUtil.generatePromisePost(baseUrl, param)
  return { getSearchTypes, search }
}

// 资源日志
export function useResourceLogRequest() {
  const baseUrl = '/api/task/log'
  const search = (param) => commonUtil.generatePromisePost(baseUrl, param)
  return { getRunStatus, search }
}
// 调度日志
export function useScheduleLogRequest() {
  const baseUrl = '/api/system/log'
  const search = (param) => commonUtil.generatePromisePost(baseUrl + '/searchApi', param)
  const detail = (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param)
  return { getSearchTypes, search, detail }
}
