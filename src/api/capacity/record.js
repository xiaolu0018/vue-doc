import commonUtil from '@/api/axios'

const baseUrl = '/api/ir/'

const getSolutionList = (param) =>
  commonUtil.generatePromisePost(baseUrl + 'querySolutionList', param)
const getSolutionRecord = (param) =>
  commonUtil.generatePromisePost(baseUrl + 'querySolutionRecord', param)
const startSolution = (id) => commonUtil.generatePromiseGet(baseUrl + 'startSolution/' + id)
const stopSolution = (id) => commonUtil.generatePromiseGet(baseUrl + 'stopSolution/' + id)
const closeSolution = (id) => commonUtil.generatePromiseGet(baseUrl + 'closeSolution/' + id)
const updateSolution = (param) => commonUtil.generatePromisePost(baseUrl + 'updateSolution', param)
const deleteSolution = (id) => commonUtil.generatePromiseGet(baseUrl + `deleteSolution/${id}`)
const getSearchTypes = () => [
  {
    key: '名称',
    val: 'name'
  },
  {
    key: 'id',
    val: 'id'
  }
]
const getStates = () => [
  {
    val: '等待执行',
    key: 'NONE'
  },
  {
    val: '解构中',
    key: 'RUNNING'
  },
  {
    val: '解构完成',
    key: 'SUCCESS'
  },
  {
    val: '解构失败',
    key: 'FAILED'
  },
  {
    val: '暂停',
    key: 'STOP'
  },
  {
    val: '中断',
    key: 'CLOSE'
  }
]
export default {
  getSolutionList,
  getSolutionRecord,
  startSolution,
  stopSolution,
  closeSolution,
  getSearchTypes,
  getStates,
  updateSolution,
  deleteSolution
}
