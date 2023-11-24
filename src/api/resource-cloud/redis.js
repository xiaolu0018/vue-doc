import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/redis'

function useCommonActions() {
  return {
    getSearchTypes: () => [{ key: '名称', val: 'name' }]
  }
}
function useInstanceActions() {
  return {
    create: (param) => commonUtil.generatePromisePost(baseUrl + '/create', param),
    remove: (id) => commonUtil.generatePromisePost(baseUrl + `/delete`, { id }),
    search: (param) => commonUtil.generatePromisePost(baseUrl + '/search', param),
    detail: (param) => commonUtil.generatePromisePost(baseUrl + '/detail', param),
    restart: (id) => commonUtil.generatePromisePost(baseUrl + `/restart`, { id }),
    updateInstance: (param) => commonUtil.generatePromisePost(baseUrl + `/updateInstance`, param),
    updateName: (param) => commonUtil.generatePromisePost(baseUrl + `/updateName`, param)
  }
}

function useWhiteListActions() {
  const whiteList = baseUrl + '/whiteList'
  return {
    create: (param) => commonUtil.generatePromisePost(whiteList + '/create', param),
    update: (param) => commonUtil.generatePromisePost(whiteList + '/update', param),
    remove: (id) => commonUtil.generatePromisePost(whiteList + `/delete`, { id }),
    search: (param) => commonUtil.generatePromisePost(whiteList + '/search', param),
    detail: (param) => commonUtil.generatePromisePost(whiteList + '/detail', param)
  }
}
function useAccountActions() {
  const account = baseUrl + '/account'
  return {
    create: (param) => commonUtil.generatePromisePost(account + '/create', param),
    remove: (id) => commonUtil.generatePromisePost(account + `/delete`, { id }),
    search: (param) => commonUtil.generatePromisePost(account + '/search', param),
    detail: (param) => commonUtil.generatePromisePost(account + '/detail', param),
    updateDesc: (param) => commonUtil.generatePromisePost(account + `/updateDesc`, param),
    updatePassword: (param) => commonUtil.generatePromisePost(account + `/updatePassword`, param)
  }
}

export default {
  useCommonActions,
  useInstanceActions,

  useWhiteListActions,
  useAccountActions
}
