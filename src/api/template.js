import commonUtil from '@/api/axios'

const baseUrl = '/api/api/business/template'
export const getTplList = (params = {}) => commonUtil.generatePromiseGet(baseUrl + `/list`, params)

export default {
  getTplList
}
