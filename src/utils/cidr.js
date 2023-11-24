function isIp(ip, validateFunc) {
  const regex = /(\d{1,3}).(\d{1,3}).(\d{1,3}).(\d{1,3})/g
  if (!regex.test(ip)) {
    return false
  }
  regex.lastIndex = 0
  const [, b1, b2, b3, b4] = regex.exec(ip)
  if (!validateIP(b1, b2, b3, b4)) {
    return false
  }
  return validateFunc && !validateFunc([b1, b2, b3, b4])
}

function isCidr(cidr, validateFunc) {
  const regex = /(\d{1,3}).(\d{1,3}).(\d{1,3}).(\d{1,3})\/(\d{1,2})/g
  if (!regex.test(cidr)) {
    return false
  }
  regex.lastIndex = 0
  const [, b1, b2, b3, b4, mask] = regex.exec(cidr)
  if (!validateIP(b1, b2, b3, b4)) {
    return false
  }
  if (Number.parseInt(mask) < 16 && Number.parseInt(mask) > 31) {
    return false
  }
  return validateFunc && !validateFunc([b1, b2, b3, b4], mask)
}

function validateIP(...blocks) {
  return blocks.every((e) => Number.parseInt(e) >= 0 && Number.parseInt(e) <= 255)
}

export { isIp, isCidr }
