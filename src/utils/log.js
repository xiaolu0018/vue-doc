const isDev = process.env.NODE_ENV === 'development'
export const log = (...args) => {
  return isDev && console.log('⚡️：', ...args)
}
export const warn = (...args) => {
  return isDev && console.warn('⚠️：', ...args)
}
export const error = (...args) => {
  return isDev && console.error('🚨', ...args)
}
