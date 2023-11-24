import defaultSettings from '@/settings'

// const { MD5 } = require("crypto-js")
const md5 = require('blueimp-md5')
// 解析智慧云网传来的链接，得到token_id和sign
// 加密appkey、token_id和ref
// 比对是否跟sign相同
export const validateToken = ({ token_id, ref, sign }, appkey) => {
  return token_id && ref && md5(appkey + token_id + ref).toString() === sign
}

const title = defaultSettings.title || 'ITS Admin'
export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
