import { commonRequest } from '@/api/common'
import { isNull } from '@/utils/unit'
export const getDicData = (item, updateFlag = false) => {
  setTimeout(async () => {
    // 处理相同get请求
    const getTimestamp = new Date().getTime()
    const hasQuesMark = item.dicUrl.indexOf('?') > -1
    const hasTimestamp = item.dicUrl.indexOf('_t') > -1
    if (!hasTimestamp) {
      item.dicUrl = hasQuesMark
        ? item.dicUrl + '&_t=' + getTimestamp
        : item.dicUrl + '?_t=' + getTimestamp
    }
    const dicData = await commonRequest.getDicData(item.dicUrl)
    if (dicData) {
      const data = getDataByProps(dicData, item)
      if (data.length) {
        this.$set(item, 'data', data)
        // 如果不存在 则初始化数据
        if (isNull(this.form[item.prop]) || updateFlag) {
          this.$set(this.form, item.prop, data[0].val)
          typeof item.change === 'function' && item.change(data[0].val, item)
        }
      } else {
        this.$set(item, 'data', [])
        this.$set(this.form, item.prop, '')
      }
    }
  }, 50)
}

export const getDataByProps = (data = [], item) => {
  return data.reduce((res, d) => {
    const result = {}
    item.props = item.props ? item.props : { key: 'val', val: 'key' }
    Object.entries(item.props).forEach(([key, val]) => {
      if (key === 'children') {
        result[key] = this.getDataByProps(d[val], item)
      } else {
        result[key] = d[val]
      }
    })
    res.push(result)
    return res
  }, [])
}
