/*
 * @Author: czy0729
 * @Date: 2019-09-01 13:55:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 04:49:29
 */
const DEFAULT_DISTANCE = 60 * 60 * 4 * 1000

/** 时间格式化 */
export function dateFormat(format: string, date: Date) {
  let _format = format
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }

  if (/(y+)/.test(format)) {
    _format = _format.replace(
      RegExp.$1,
      String(date.getFullYear()).substr(4 - RegExp.$1.length)
    )
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(_format)) {
      _format = _format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(String(o[k]).length)
      )
    }
  }
  return _format
}

/** 获取指定格式的时间字符串 */
export function getDateFormat(date: string | number | Date) {
  return dateFormat('MM-dd hh:mm', new Date(date))
}

/** 获取时间间隔的首个时间 */
export function getStartDate(formatDate: string) {
  return `${formatDate.substring(0, 11)}00:00${formatDate.substring(16)}`
}

/** 补原始数据, 以便分组合并 */
export function insertOrigin(data: any) {
  const _data = JSON.parse(JSON.stringify(data))
  _data[0].amount = 0
  return [
    {
      ..._data[0],
      time: new Date(getStartDate(data[0].time)).getTime(),
      begin: 0,
      end: 0,
      low: 0,
      high: 0,
      amount: 0,
      price: 0
    },
    ..._data
  ]
}

/** 按时间间隔对数据进行分组 */
export function group(data, distance = DEFAULT_DISTANCE) {
  const result = []
  const start = new Date(data[0].time).getTime()
  let lastIndex = 0

  data.forEach((item: { time: string | number | Date }) => {
    const timestamp = new Date(item.time).getTime()
    const index = Math.floor((timestamp - start) / distance)
    let empty = index - lastIndex - 1
    if (empty < 0) empty = 0
    if (!result[index]) {
      result[index] = {
        time: start + index * distance,
        empty,
        data: []
      }
      lastIndex = index
    }
    result[index].data.push(item)
  })
  return result
}

/** 分组合并 */
export function mergeGroup(data: any[]) {
  const result = []
  data.forEach(item => {
    const merge = {
      time: item.time,
      empty: item.empty,
      begin: item.data[item.data.length - 1].end,
      end: item.data[0].begin,
      low: undefined,
      high: undefined,
      amount: 0
    }

    item.data.forEach(i => {
      if (merge.low === undefined) {
        merge.low = i.low
      } else if (i.low < merge.low) {
        merge.low = i.low
      }

      if (merge.high === undefined) {
        merge.high = i.high
      } else if (i.high > merge.high) {
        merge.high = i.high
      }

      merge.amount += i.amount
    })

    result.push(merge)
  })

  return result
}

/** 生成 K 线数据 */
export function kLineData(data: any[], distance = DEFAULT_DISTANCE) {
  const result = []
  data.forEach(item => {
    if (item.empty) {
      for (let i = 0; i < item.empty; i += 1) {
        const ref = [...result[result.length - 1]]
        ref[0] += distance
        result.push([ref[0], item.end, item.end, item.end, item.end, 0])
      }
    }

    result.push([item.time, item.end, item.begin, item.low, item.high, item.amount])
  })

  result.forEach(item => (item[0] = getDateFormat(item[0])))
  return result
}

/**
 * 获取 KData, 数据长度过大会影响性能, 需要截取 */
export function getKData(data = [], distance = DEFAULT_DISTANCE) {
  if (!data.length) return []

  const kdata = kLineData(mergeGroup(group(insertOrigin(data), distance)), distance)
  if (kdata.length < 100) return kdata

  return kdata.slice(kdata.length - 100)
}
