import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/eni'

function useCommonActions() {
  return {
    getSearchTypes: () => [{ key: '名称', val: 'name' }]
  }
}
function eniActions() {
  return {
    create: (param) => commonUtil.generatePromisePost(baseUrl + '/create', param),
    remove: (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id }),
    search: (param) => commonUtil.generatePromisePost(baseUrl + '/search', param),
    detail: (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param),
    restart: (id) => commonUtil.generatePromisePost(baseUrl + `/restart`, { id }),
    updateNsg: (param) => commonUtil.generatePromisePost(baseUrl + `/updateNsg`, param),
    update: (param) => commonUtil.generatePromisePost(baseUrl + `/update`, param),

    bind: (param) => commonUtil.generatePromisePost(baseUrl + `/bind`, param),
    unbind: (param) => commonUtil.generatePromisePost(baseUrl + `/unbind`, param),
    queryEniResource: (param) =>
      commonUtil.generatePromisePost(baseUrl + `/queryEniResource`, param)
  }
}

function useEniIpActions() {
  const eniip = baseUrl + '/ip'
  return {
    create: (param) => commonUtil.generatePromisePost(eniip + '/create', param),
    update: (param) => commonUtil.generatePromisePost(eniip + '/update', param),
    remove: (id) => commonUtil.generatePromisePost(eniip + `/delete`, { id }),
    search: (param) => commonUtil.generatePromisePost(eniip + '/search', param),
    detail: (param) => commonUtil.generatePromisePost(eniip + '/detail', param)
  }
}

export default {
  useCommonActions,
  eniActions,

  useEniIpActions
  //useAccountActions
}
