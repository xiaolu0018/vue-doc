import dayjs from 'dayjs'
function addMonth(currentDate, num) {
  try {
    if (!(currentDate instanceof Date)) {
      currentDate = new Date(currentDate)
    }
    currentDate.setMonth(currentDate.getMonth() + num)
    return currentDate
  } catch (error) {
    const now = new Date()
    now.setMonth(now.getMonth() + num)
    return now
  }
}
function dateFormat(timestamp, formats) {
  // formats格式包括
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分
  formats = formats || 'Y-m-d'

  function zero(value) {
    if (value < 10) {
      return '0' + value
    }
    return value
  }

  const myDate = timestamp ? new Date(timestamp) : new Date()

  const year = myDate.getFullYear()
  const month = zero(myDate.getMonth() + 1)
  const day = zero(myDate.getDate())

  const hour = zero(myDate.getHours())
  const minite = zero(myDate.getMinutes())
  const second = zero(myDate.getSeconds())

  return formats.replace(
    /Y|m|d|H|i|s/gi,
    (matches) =>
      ({
        Y: year,
        m: month,
        d: day,
        H: hour,
        i: minite,
        s: second
      }[matches])
  )
}
function dateDiff(timestamp) {
  // 补全为13位
  const arrTimestamp = (timestamp + '').split('')
  for (let start = 0; start < 13; start++) {
    if (!arrTimestamp[start]) {
      arrTimestamp[start] = '0'
    }
  }
  timestamp = arrTimestamp.join('') * 1

  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const month = day * 30
  const now = new Date().getTime()
  const diffValue = now - timestamp

  // 如果本地时间反而小于变量时间
  if (diffValue < 0) {
    return '不久前'
  }

  // 计算差异时间的量级
  const monthC = diffValue / month
  const weekC = diffValue / (7 * day)
  const dayC = diffValue / day
  const hourC = diffValue / hour
  const minC = diffValue / minute

  // 数值补0方法
  function zero(value) {
    return value < 10 ? '0' + value : value
  }

  // 使用
  if (monthC > 12) {
    // 超过1年，直接显示年月日
    return (() => {
      const date = new Date(timestamp)
      return (
        date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日'
      )
    })()
  } else if (monthC >= 1) {
    return parseInt(monthC) + '月前'
  } else if (weekC >= 1) {
    return parseInt(weekC) + '周前'
  } else if (dayC >= 1) {
    return parseInt(dayC) + '天前'
  } else if (hourC >= 1) {
    return parseInt(hourC) + '小时前'
  } else if (minC >= 1) {
    return parseInt(minC) + '分钟前'
  }
  return '刚刚'
}
function getTimestamp(date) {
  if (!date) {
    return Math.round(new Date() / 1000)
  } else if (date instanceof Date) {
    return Math.round(date / 1000)
  } else {
    return Math.round(new Date(date) / 1000)
  }
}
function getDateByTimestamp(timestamp) {
  return new Date(parseInt(timestamp) * 1000)
}

/**
 * @param {string} year
 * @param {string} month 一月传入 1 二月传入2
 * @returns {Object}
 */
function getMonthDate(year, month) {
  var date = new Date(year, month, 1, 0, 0, 0)
  var yesterDay = new Date(date - 1000)
  return yesterDay.getDate()
}
/**
 * @param {string} range ['2022-02-7','2025-02-28']
 * @returns {Object}
 */
function getMonthFloatByDayRange(range) {
  if (Array.isArray(range) && range.length !== 2) {
    return 0
  }
  let [start, end] = range
  start = dayjs(start)
  end = dayjs(end)
  const startYear = start.get('year')
  const startMonth = start.get('month')
  const startDate = start.get('date')
  const endYear = end.get('year')
  const endMonth = end.get('month')
  const endDate = end.get('date')
  const startDateNum = getMonthDate(startYear, startMonth + 1)
  const endDateNum = getMonthDate(endYear, endMonth + 1)
  console.log({
    start,
    end,
    startYear,
    startMonth,
    startDate,
    endYear,
    endMonth,
    endDate,
    startDateNum,
    endDateNum
  })
  if (startYear === endYear && startMonth === endMonth) {
    return Number(((endDate - startDate + 1) / startDateNum).toFixed(4))
  } else {
    const startMonthNum = (startDateNum - startDate + 1) / startDateNum
    const midMonthNum = endYear * 12 + endMonth - (startYear * 12 + startMonth) - 1
    const endMonthNum = endDate / endDateNum
    console.log(startMonthNum, midMonthNum, endMonthNum)
    return Number((startMonthNum + midMonthNum + endMonthNum).toFixed(4))
  }
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
function parseTime(time, cFormat) {
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (arguments.length === 0 || !time) return null
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      time = /^[0-9]+$/.test(time) ? parseInt(time) : time.replace(new RegExp(/-/gm), '/')
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    return key === 'a'
      ? ['日', '一', '二', '三', '四', '五', '六'][value]
      : value.toString().padStart(2, '0')
  })
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    )
  }
}

export {
  addMonth,
  dateFormat,
  dateDiff,
  getTimestamp,
  getDateByTimestamp,
  getMonthFloatByDayRange,
  parseTime,
  formatTime
}
