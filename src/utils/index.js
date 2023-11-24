/**
 * Created by PanJiaChen on 16/11/18.
 */

export const warn = (type, msg) => {
  const warnMsg = `[${type}]: ${msg}`
  console.warn(warnMsg)
}
