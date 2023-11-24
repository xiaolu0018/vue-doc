import commonUtil from '@/api/axios'

const baseUrl = '/api/resource/postgresql'

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
function useDatabaseActions() {
  const database = baseUrl + '/db'
  return {
    create: (param) => commonUtil.generatePromisePost(database + '/create', param),
    remove: (id) => commonUtil.generatePromisePost(database + `/delete`, { id }),
    search: (param) => commonUtil.generatePromisePost(database + '/search', param),
    detail: (param) => commonUtil.generatePromisePost(database + '/detail', param),
    updateDescription: (param) =>
      commonUtil.generatePromisePost(database + `/updateDescription`, param)
  }
}
function useWhiteListActions() {
  const whiteList = baseUrl + '/whiteList'
  return {
    create: (param) => commonUtil.generatePromisePost(whiteList + '/create', param),
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
    updateDescription: (param) =>
      commonUtil.generatePromisePost(account + `/updateDescription`, param),
    updatePassword: (param) => commonUtil.generatePromisePost(account + `/updatePassword`, param)
  }
}
function useAccountGrantAuth() {
  const grantAuth = baseUrl + '/accountDb'
  return {
    create: (param) => commonUtil.generatePromisePost(grantAuth + '/create', param),
    remove: (id) => commonUtil.generatePromisePost(grantAuth + `/cancel`, { id }),
    search: (param) => commonUtil.generatePromisePost(grantAuth + '/search', param)
  }
}
function useConnectActions() {
  const connect = baseUrl + '/connect'
  return {
    create: (param) => commonUtil.generatePromisePost(connect + '/create', param),
    remove: (id) => commonUtil.generatePromisePost(connect + `/delete`, { id }),
    search: (param) => commonUtil.generatePromisePost(connect + `/getConnectAddress`, param),
    update: (param) => commonUtil.generatePromisePost(connect + `/update`, param)
  }
}
export default {
  useCommonActions,
  useInstanceActions,
  useDatabaseActions,
  useWhiteListActions,
  useAccountActions,
  useConnectActions,
  useAccountGrantAuth
}
