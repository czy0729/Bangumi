/*
 * @Author: czy0729
 * @Date: 2026-08-24 00:25:27
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-24 00:25:27
 */
import dayjs from 'dayjs'

/** 日历接口使用的 UTC 时间格式 */
export const CALENDAR_DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss.000[Z]'

/**
 * 解析游戏发售日期字符串为 YYYY-MM-DD
 *
 * 支持 1998年11月21日 / 2004-04-28 / 2004-04-28(PC) 等格式,
 * 平台后缀与日期文字后的多余内容会被剥离, 无法解析出合法日期返回 null
 */
export function parseReleaseDate(date: string): string | null {
  const text = String(date || '').trim()
  if (!text) return null

  // 提取中文日期, 如 1998年11月21日
  const matched = text.match(/(\d{4})年(\d{1,2})月(\d{1,2})日?/)
  let dateStr = matched ? `${matched[1]}-${matched[2]}-${matched[3]}` : text

  // 去除可能的平台后缀, 如 (PC)
  dateStr = dateStr.replace(/\(.+\)$/, '').trim()

  // 校验并补零为规范的 YYYY-MM-DD
  const validated = dateStr.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
  if (!validated) return null

  const [, year, month, day] = validated
  const result = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`

  // dayjs 对越界日期会进位 (如 2026-02-30 -> 2026-03-02), 需回读分量确认真实合法
  const d = dayjs(result)
  const valid =
    d.isValid() &&
    d.year() === Number(year) &&
    d.month() === Number(month) - 1 &&
    d.date() === Number(day)
  return valid ? result : null
}

/**
 * 转换本地 (GMT+8) 时间为日历接口需要的 UTC 格式字符串
 *
 * 输入按北京时间理解, 减去 8 小时后标记为 UTC
 */
export function formatCalendarDate(date: dayjs.Dayjs): string {
  return date.subtract(8, 'hours').format(CALENDAR_DATE_FORMAT)
}
