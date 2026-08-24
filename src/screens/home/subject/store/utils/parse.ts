/*
 * @Author: czy0729
 * @Date: 2026-08-25 01:33:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:15:39
 */
import { pad, removeHTMLTag } from '@utils'

import type { Ep } from '@stores/subject/types'

/** 连载类日期匹配键 */
export const PRIMARY_KEYS = '连载开始|开始'

/** 单次发售类日期匹配键 */
export const SECONDARY_KEYS = '发售日|发售日期|放送开始|上映年度|上映时间|上映日|发行日期'

/** 从 rawInfo HTML 中提取指定字段的值 */
export function pickInfoValue(info: string, keys: string) {
  return info.match(new RegExp(`<li><span>(${keys}): <\\/span>(.+?)<\\/li>`))?.[2] || ''
}

/** 提取艺术家 */
export function getArtist(info: string) {
  return removeHTMLTag(pickInfoValue(info, '艺术家'))
}

/** 提取字符串中的年份（4位数字） */
export function extractYear(str: string) {
  return str.match(/(\d{4})/)?.[0] || ''
}

/** 提取字符串中的年月（如 2024-01 或 2024年1月） */
export function extractYearMonth(str: string) {
  return str.match(/(\d{4}[-年]\d{1,2})/)?.[0] || ''
}

/** 将年月标准化为 YYYY-MM 格式 */
export function normalizeYearMonth(value: string) {
  return value
    .replace('年', '-')
    .split('-')
    .map(item => pad(Number(item)))
    .join('-')
}

/**
 * 解析音乐碟播放时长
 *  - 播放时长: 327 分 / 146m / CD 130m
 *  - 播放时长: 186:49 / 02:40:00
 *  - 播放时长: 72:27+65:45+69:00
 */
export function parseMusicDuration(rawInfo: string) {
  if (!rawInfo.includes('播放时长')) return ''

  // 327 分 / 146m / CD 130m
  const m1 = rawInfo.match(/(\d+)\s*(分|m)/)
  if (m1) return `${Number(m1[1])} min`

  // 解析 MM:SS 或 HH:MM:SS 为分钟数
  const toMinutes = (s: string) => {
    const parts = s.split(':').map(Number)
    if (parts.length === 3) return parts[0] * 60 + parts[1]
    if (parts.length === 2) return parts[0]
    return 0
  }

  // 72:27+65:45+69:00 格式
  const m2 = rawInfo.match(/播放时长[\s\S]*?(\d+:\d+(?:\+\d+:\d+)+)/)
  if (m2) {
    const total = m2[1].split('+').reduce((sum, part) => sum + toMinutes(part.trim()), 0)
    return total ? `${total} min` : ''
  }

  // 186:49 / 02:40:00
  const m3 = rawInfo.match(/播放时长[\s\S]*?(\d+:\d+(?::\d+)?)/)
  if (m3) return toMinutes(m3[1]) ? `${toMinutes(m3[1])} min` : ''

  return ''
}

/** 从 eps 中解析最大时长（H:MM:SS），返回分钟数 */
export function parseMaxDurationFromEps(eps: readonly Ep[]) {
  const maxSeconds = Math.max(
    0,
    ...eps.map(item => {
      if (typeof item?.duration !== 'string') return 0

      const parts = item.duration.split(':').map(Number)
      if (parts.length !== 3 || parts.some(n => !Number.isFinite(n))) return 0

      const [h, m, s] = parts
      return h * 3600 + m * 60 + s
    })
  )

  return Math.ceil(maxSeconds / 60)
}

/** 从 rawInfo 匹配片长（片长: 120 分钟），返回分钟数 */
export function parseMovieDuration(rawInfo: string) {
  const match = rawInfo.match(/片长[\s\S]*?(\d+)\s*(分钟|分)/)
  return match ? Number(match[1]) : 0
}

/** 获取上映时间 (用于标识未上映) */
export function getRelease(info: string) {
  return pickInfoValue(info, '发售日|放送开始|上映年度|上映时间|上映日')
}

/** 获取发布时间 (年) */
export function getYear(info: string) {
  const primary = extractYear(pickInfoValue(info, PRIMARY_KEYS))
  if (primary) return primary
  return extractYear(pickInfoValue(info, SECONDARY_KEYS))
}

/** 获取发布时间 (年-月) */
export function getYearAndMonth(info: string, year: string) {
  try {
    const primary = extractYearMonth(pickInfoValue(info, PRIMARY_KEYS))
    const temp = primary || extractYearMonth(pickInfoValue(info, SECONDARY_KEYS))
    if (!temp) return year
    return normalizeYearMonth(temp)
  } catch {
    return year
  }
}

/** 获取结束时间 (年) */
export function getEnd(info: string) {
  return extractYear(pickInfoValue(info, '连载结束|结束'))
}

/** 获取结束时间 (年-月) */
export function getYearAndMonthEnd(info: string, end: string) {
  try {
    const temp = extractYearMonth(pickInfoValue(info, '连载结束|结束'))
    if (!temp) return end
    return normalizeYearMonth(temp)
  } catch {
    return end
  }
}

/** 从 info 中解析游戏发售日期 */
export function parseGameReleaseDates(type: string, info: string) {
  if (type !== '游戏' || !info) return []

  const dates: { date: string; region: string; fullText: string }[] = []
  try {
    const datePattern = /(\d{4}[-年]\d{1,2}[-月]\d{1,2}[日]?)(?:\s*\(([^)]+)\))?/g
    for (const m of info.matchAll(datePattern)) {
      dates.push({
        date: m[1],
        region: m[2] || '',
        fullText: m[2] ? `${m[1]}(${m[2]})` : m[1]
      })
    }
  } catch {}
  return dates
}

/** 从 info 中提取别名 */
export function parseAlias(info: string) {
  try {
    return Array.from(info.matchAll(/<span[^>]*>别名:\s*<\/span>\s*([^<]+)/g), m => m[1].trim())
  } catch {
    return []
  }
}

/** 获取剧场版/电影时长 */
export function getDuration(titleLabel: string, eps: readonly Ep[] | undefined, rawInfo: string) {
  if (titleLabel !== '剧场版' && titleLabel !== 'MOVIE' && titleLabel !== '电影') return ''

  if (eps?.length) {
    const minutes = parseMaxDurationFromEps(eps)
    if (minutes > 26) return `${minutes} min`
  }

  if (rawInfo) {
    const minutes = parseMovieDuration(rawInfo)
    if (minutes > 26) return `${minutes} min`
  }

  return ''
}
