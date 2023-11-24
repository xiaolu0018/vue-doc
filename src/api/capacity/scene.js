import commonUtil from '@/api/axios'

const baseUrl = '/api/restful/ir/solution'
export const appKeyHeaders = [
  true,
  true,
  {
    headers: {
      appKey: '2da0af69-562b-40f2-9309-4eae0ac961a0'
    }
  }
]
const search = (param) => commonUtil.generatePromisePost(baseUrl + '/list', param, ...appKeyHeaders)
const getTags = () =>
  commonUtil.generatePromiseGet(
    baseUrl + '/baseInfoType',
    {},
    {
      appKey: '2da0af69-562b-40f2-9309-4eae0ac961a0'
    }
  )
const detail = (id) =>
  commonUtil.generatePromisePost(`${baseUrl}/detail/${id}`, {}, ...appKeyHeaders)
const deconstruct = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/deconstruct`, param, ...appKeyHeaders)
const dispatch = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/dispatch`, param, true, true, {
    headers: {
      appKey: '2da0af69-562b-40f2-9309-4eae0ac961a0'
    },
    timeout: 5 * 60 * 1000
  })
const deploy = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/deploy`, param, true, true, {
    headers: {
      appKey: '2da0af69-562b-40f2-9309-4eae0ac961a0'
    },
    timeout: 5 * 60 * 1000
  })
const queryBusinessDeconstruct = (id, strategy) =>
  commonUtil.generatePromisePost(
    baseUrl + `/solution/queryBusinessDeconstruct`,
    { id, strategy },
    ...appKeyHeaders
  )
const queryBusinessDispatch = (id) =>
  commonUtil.generatePromisePost(
    baseUrl + `/solution/queryBusinessDispatch/${id}`,
    {},
    ...appKeyHeaders
  )
const queryBusinessSolution = (id, strategy) =>
  commonUtil.generatePromisePost(
    baseUrl + `/solution/queryBusinessSolution`,
    { id, strategy },
    ...appKeyHeaders
  )
const createSolution = (param) =>
  commonUtil.generatePromisePost(baseUrl + `/createSolution`, param, ...appKeyHeaders)
const getSolutionRecord = (id) => commonUtil.generatePromiseGet(`api/ir//querySolutionById/${id}`)

// 获取方案架构图

const getDeconstructJsondata = (id) =>
  commonUtil.generatePromiseGet(baseUrl + `/solution/queryDeconstructJsonData/${id}`)

export default {
  search,
  getTags,
  detail,
  deconstruct,
  dispatch,
  deploy,
  queryBusinessDeconstruct,
  queryBusinessDispatch,
  queryBusinessSolution,
  createSolution,
  getSolutionRecord,
  getDeconstructJsondata
}
