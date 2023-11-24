import commonUtil from '@/api/axios'

const baseUrl = '/api/cloud/tag'

export default {
  search: (param) => commonUtil.generatePromisePost(baseUrl + '/query', param),
  create: (param) => commonUtil.generatePromisePost(baseUrl + '/create', param)
}
