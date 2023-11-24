/**
 * @fileName atom.js
 * @description 原子能力
 * @date 2023-04-06 15:52:53
 * @author lxl
 */
import commonUtil from '@/api/axios'
// 原子能力menuid对应类型
export const typeEnum = {
  350: 'flavor', // 主机算力
  351: 'disk', // 存储原子
  352: 'disk', // RDS原子
  353: 'image' // 镜像原子
  // 其他类
}

const baseUrl = '/api/ir/atom'
const urlMap = {
  flavor: '/flavor',
  disk: '/disk/flavor',
  image: '/image/market'
}
// 实例规格标签
const getTags = (menuId) => commonUtil.generatePromisePost(baseUrl + `/flavorTag/${menuId}`)
const getImageTags = () => commonUtil.generatePromisePost(baseUrl + `/image/atom/tag`)
const getImageVersions = (osType = '') =>
  commonUtil.generatePromisePost(baseUrl + `/image/version/tag`, { osType }, true, false)
// 原子参数
const getParam = (bindAtomType) =>
  commonUtil.generatePromisePost(baseUrl + `/param/${bindAtomType}`)

//atomTypeId 原子能力资源类型

/**
 * @param requestType {String} 自定义请求类型 flavor|disk
 */
export const typeFetch = (atomTypeId, requestType = '') => {
  const type = requestType || typeEnum[atomTypeId] || 'flavor'
  //NOTE: /flavro  /disk/flavro /image/market
  const preUrl = baseUrl + (urlMap[type] || '/flavor')
  return {
    search: (param) => commonUtil.generatePromisePost(`${preUrl}/search`, param),
    detail: (id, menuId) => commonUtil.generatePromisePost(`${preUrl}/detail/${id}/${menuId}`),
    update: (param) => commonUtil.generatePromisePost(`${preUrl}/update`, param),
    status: ({ id }) => commonUtil.generatePromisePost(`${preUrl}/status/${id}`), // 更新状态
    remove: (id) => commonUtil.generatePromisePost(`${preUrl}/delete/${id}`)
  }
}

export default {
  getTags,
  getParam,
  getImageTags,
  getImageVersions
}
