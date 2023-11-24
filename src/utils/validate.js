/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
/**
 * @param {string} str
 * @returns {Boolean}
 */
export function nameValidator(rule, value, callback) {
  const regex = /^(?![0-9_-])[\u4E00-\u9FA5A-Za-z0-9_-]{1,30}[\u4E00-\u9FA5A-Za-z0-9]$/
  if (!regex.test(value)) {
    callback(
      '名称只能包含中文、英文、数字、连字符或下划线, 且不以连字符或下划线开头或结尾, 不超过30个字符！'
    )
  }
  callback()
}
