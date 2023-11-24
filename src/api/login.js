import request from '@/api/http'
import commonUtil from '@/api/axios'

const baseUrl = '/api/login/'
const registeredBaseUrl = '/api/inx/registered/'

const verifyCode = () => {
  return new Promise((resolve, reject) => {
    const url = '/api/graphic/verifyCode'
    request
      .get(url)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => reject(err))
  })
}

const modifyPassword = ({ oldPassword, newPassword, confirmPassword }) =>
  commonUtil.generatePromisePost(baseUrl + 'modifyPassword', {
    oldPassword,
    newPassword,
    confirmPassword
  })
const sendMail = (email) =>
  commonUtil.generatePromisePost(baseUrl + 'forget/sendMail', { email }, true)
const resetPassword = ({ resetToken, newPassword, confirmPassword }) =>
  commonUtil.generatePromisePost(baseUrl + 'forget/resetPassword', {
    resetToken,
    newPassword,
    confirmPassword
  })
const getProvinceAndCity = () =>
  commonUtil.generatePromiseGet(registeredBaseUrl + 'provinceAndCityCode')
const registeredUser = (param) =>
  commonUtil.generatePromisePost(registeredBaseUrl + 'registered/user', param)

const validateUserName = (userName) =>
  commonUtil.generatePromiseGet(baseUrl + `validate/${userName}`)
const sendPhoneMessage = (userName) =>
  commonUtil.generatePromisePost(baseUrl + `sendPhoneMessage/${userName}`)

export default {
  verifyCode,
  modifyPassword,
  sendMail,
  resetPassword,
  registeredUser,
  getProvinceAndCity,
  validateUserName,
  sendPhoneMessage
}
