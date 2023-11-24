import crypto from 'crypto-js'

const key = crypto.enc.Utf8.parse('1234123412ABCDEF') // 十六位十六进制数作为密钥
const iv = crypto.enc.Utf8.parse('ABCDEF1234123412') // 十六位十六进制数作为密钥偏移量

// 解密方法
const decrypt = (word) => {
  const encryptedHexStr = crypto.enc.Hex.parse(word)
  const srcs = crypto.enc.Base64.stringify(encryptedHexStr)
  const decrypt = crypto.AES.decrypt(srcs, key, {
    iv: iv,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(crypto.enc.Utf8)
  return decryptedStr.toString()
}

// 加密方法
const encrypt = (word) => {
  const srcs = crypto.enc.Utf8.parse(word)
  const encrypted = crypto.AES.encrypt(srcs, key, {
    iv: iv,
    mode: crypto.mode.CBC,
    padding: crypto.pad.Pkcs7
  })
  return encrypted.ciphertext.toString().toUpperCase()
}
/**
 * 生成安全随机数
 */
const safeRandom = () => {
  const int = window.crypto.getRandomValues(new Uint32Array(1))[0]
  return int / 2 ** 32
}

export { decrypt, encrypt, safeRandom }
