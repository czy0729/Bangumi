/*
 * @Author: czy0729
 * @Date: 2023-03-12 16:48:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-14 20:52:56
 */
import dayjs from 'dayjs'
import dayjsCustomParseFormat from 'dayjs/plugin/customParseFormat'
import dayjsCustomTimezone from 'dayjs/plugin/timezone'
import dayjsCustomUTC from 'dayjs/plugin/utc'
import dayjsCustomWeekday from 'dayjs/plugin/weekday'
import { TIMEZONE_IS_GMT8 } from '@constants/constants'

dayjs.extend(dayjsCustomParseFormat)
dayjs.extend(dayjsCustomUTC)
dayjs.extend(dayjsCustomTimezone)
dayjs.extend(dayjsCustomWeekday)

/**
 * 返回 timestamp
 * @doc https://dayjs.fenxianglu.cn/category/parse.html#%E5%AD%97%E7%AC%A6%E4%B8%B2-%E6%A0%BC%E5%BC%8F
 * */
export function getTimestamp(date: string = '', format?: string) {
  const _date = date.trim()
  const day = format ? dayjs(_date, format) : dayjs(_date)
  return day.isValid() ? day.unix() : dayjs().unix()
}

const DATE_FNS = {
  Y: (d: Date) => d.getFullYear(),
  y: (d: Date) => (d.getFullYear() + '').slice(2),
  m: (d: Date) => pad(DATE_FNS.n(d)),
  d: (d: Date) => pad(DATE_FNS.j(d)),
  H: (d: Date) => pad(d.getHours()),
  i: (d: Date) => pad(d.getMinutes()),
  s: (d: Date) => pad(d.getSeconds()),
  n: (d: Date) => d.getMonth() + 1,
  j: (d: Date) => d.getDate()
} as const

/** 补零 */
function pad(n: string | number): string {
  return +n < 10 ? `0${n}` : `${n}`
}

/** 简易时间戳格式化函数 */
export function date(format?: string, timestamp?: any): string {
  // 假如第二个参数不存在, 第一个参数作为 timestamp
  if (!timestamp) {
    timestamp = format
    format = 'Y-m-d H:i:s'
  }

  const now = timestamp ? new Date(timestamp * 1000) : new Date()
  return format.replace(/[\\]?([a-zA-Z])/g, (t, s) =>
    t != s ? s : DATE_FNS[s] ? DATE_FNS[s](now) : s
  )
}

/** 中国转为日本放送时间 */
export function toJP(weekDayCN: string | number = 0, timeCN: string = '0000') {
  const nextWeekday = dayjs()
    .weekday(Number(weekDayCN || 7))
    .format('YYYY-MM-DD')
  const day = dayjs(
    `${nextWeekday}T${timeCN.slice(0, 2)}:${timeCN.slice(2, 4)}:00+08:00`
  ).utcOffset(9)
  return {
    weekDayCN: weekDayCN || 7,
    timeCN,
    weekDayJP: day.day() || 7,
    timeJP: day.format('HHmm')
  }
}

/** 日本转为中国放送时间 */
export function toCN(weekDayJP: string | number = 0, timeJP: string = '0000') {
  const nextWeekday = dayjs()
    .weekday(Number(weekDayJP || 7))
    .format('YYYY-MM-DD')
  const day = dayjs(
    `${nextWeekday}T${timeJP.slice(0, 2)}:${timeJP.slice(2, 4)}:00+09:00`
  ).utcOffset(8)
  return {
    weekDayCN: day.day() || 7,
    timeCN: day.format('HHmm'),
    weekDayJP: weekDayJP || 7,
    timeJP
  }
}

/** 判断 info 字段中的日期是否在未来（晚于今天） */
export function isFutureDate(info: string): boolean {
  const now = dayjs()
  const m1 = info.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)
  if (m1) return dayjs(`${m1[1]}-${m1[2]}-${m1[3]}`).isAfter(now, 'day')

  const m2 = info.match(/(\d{4})-(\d{1,2})-(\d{1,2})/)
  if (m2) return dayjs(`${m2[1]}-${m2[2]}-${m2[3]}`).isAfter(now, 'day')

  return false
}

/** 当前时区 */
export const TZ = dayjs.tz.guess()

/** 中国转为本地时区放送时间 */
export function toLocal(weekDayCN: string | number = 0, timeCN: string = '0000') {
  if (TIMEZONE_IS_GMT8) {
    return {
      weekDayCN,
      timeCN,
      weekDayLocal: weekDayCN,
      timeLocal: timeCN
    }
  }

  const nextWeekday = dayjs()
    .weekday(Number(weekDayCN || 7))
    .format('YYYY-MM-DD')
  const day = dayjs(`${nextWeekday}T${timeCN.slice(0, 2)}:${timeCN.slice(2, 4)}:00+08:00`)
  return {
    weekDayCN,
    timeCN,
    weekDayLocal: day.day() || 7,
    timeLocal: day.format('HHmm')
  }
}
