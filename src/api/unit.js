import commonUtil from '@/api/axios'
import { titleCase, isNull } from '@/utils/unit'

const METHOD_LIST = ['GET', 'POST', 'DELETE', 'PUT']
// 对应commonUtil的generatePromiseGet,generatePromisePost,generatePromiseDelete,generatePromisePut,

/**
 * @param {Object|String} 两种结构,Object|String，url和pathKey组成的对象, pathKey中的参数会拼接到url路径中, opt 为Array格式对应其他配置;
 * @example 复杂类型，detailPOST: {url: '/api/history',pathKey: ['id']} 转 路径/api/history/[id]的post请求
 * @example 复杂类型，参数opt,对应commonUtil函数url和param以外的其他配置，
 * @example detailPOST: {url: '/api/history',pathKey: ['id'],opt:[null,null,{timeout: 4000}]},header配置timeout
 * @example string类型，对应无参数拼接url的普通ajax请求
 * @return {Object} 对应commonUtil ajax函数,
 * @description 根据apiOptions,url结尾method判断请求方式，返回对应ajax函数
 * @author lxl
 * @date 2022-09-01 13:36:36
 */
export function formatAjaxFn(api) {
  const getAjaxWrap = (urlKey) => {
    const method = METHOD_LIST.find((item) => urlKey['endsWith'](item))
    const ajaxFn = commonUtil[`generatePromise${titleCase(method)}`]
    const ajaxOption = api[urlKey]
    if ((typeof ajaxOption).toLowerCase() === 'string') {
      return (params) => ajaxFn(api[urlKey], params)
    } else {
      // pathKey参数拼接url
      return (params) => {
        const pathQuery = (ajaxOption?.pathKey || [])
          .map((item) => (!isNull(params[item]) ? params[item] : ''))
          .join('/')
        const url = ajaxOption['url'] + (pathQuery ? `/${pathQuery}` : '')
        return ajaxFn(url, params, ...(ajaxOption.opt || []))
      }
    }
  }
  const requestFn = {}
  Object.keys(api).forEach((key) => {
    requestFn[key] = getAjaxWrap(key)
  })
  return requestFn
}
