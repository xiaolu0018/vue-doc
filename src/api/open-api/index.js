import commonUtil from '@/api/axios'

const baseUrl = '/api/business'

const getBusinessTypeList = () => commonUtil.generatePromiseGet(baseUrl + `/type/list`)
const getBusinessTemplateList = () => commonUtil.generatePromiseGet(baseUrl + `/template/list`)

export default {
  getBusinessTypeList,
  getBusinessTemplateList
}
