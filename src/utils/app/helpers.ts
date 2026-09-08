/*
 * @Author: czy0729
 * @Date: 2026-09-08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-08
 *
 * 通用杂项（模糊值、随机数、keyExtractor、头像 id 解析、放送数据、小组缩略图、时长与条目信息格式化, 拆分自 app.ts）
 */
import { ON_AIR } from '@stores/calendar/onair'
import { WEB } from '@constants/device'
import { IOS } from '@constants/env'
import { GROUP_THUMB_MAP } from '@assets/images'
import { extractIdFromAvatar } from './ages'
import { RANDOM_FACTOR } from './ds'

import type { SubjectId } from '@types'

/** 获取背景的模糊值 (各平台实际表现是不一样的, 需要分开判断) */
export function getBlurRadius(uri?: string, bg?: string, avatarLarge?: string) {
  if (typeof uri === 'string') uri = uri.replace('http://', 'https://')
  if (typeof bg === 'string') bg = bg.replace('http://', 'https://')
  if (uri === bg) return 0

  if (IOS) {
    if (avatarLarge === bg || !bg) return 10
    return 48
  }

  if (WEB) return 28

  return 8
}

/** 使用时间因子作为随机数, 规避 Hermes 引擎 Array.sort 的卡死 bug */
export function appRandom<T extends object>(
  arr: T[] = [],
  key: keyof T & string = '' as keyof T & string
): T[] {
  // 按命中结果分为两组, 拼接时命中组逆序置于头部, 与原实现顺序一致
  const head: T[] = []
  const tail: T[] = []

  arr.forEach(item => {
    if (item[key]) {
      const str = String(String(item[key]).match(/\d+/g)?.[0] || 0)
      let factor = 5
      try {
        factor = Number(str.slice(str.length - 1, str.length))
      } catch {}

      if (RANDOM_FACTOR >= factor) {
        head.push(item)
      } else {
        tail.push(item)
      }
    }
  })

  // 命中组逆序, 未命中组原序
  return head.reverse().concat(tail)
}

/** keyExtractor */
export function keyExtractor(item?: unknown) {
  return String((item as { id?: string | number } | undefined)?.id ?? '')
}

/** 从修改过的用户头像地址中算出原始用户 id (委托 ages/extractIdFromAvatar, 统一头像 id 解析逻辑) */
export function getUserIdFromAvatar(src: string) {
  try {
    return extractIdFromAvatar(src) ?? 0
  } catch (error) {
    return 0
  }
}

/** 未命中放送数据时共享的空对象 (冻结以保持引用稳定) */
const EMPTY_ON_AIR_ITEM = Object.freeze({}) as {
  weekDayCN?: number | string
  timeCN?: string
  type?: string
  tag?: string
  origin?: string
}

/** 获取本地每日放送数据 */
export function getOnAirItem(subjectId: SubjectId): {
  weekDayCN?: number | string
  timeCN?: string
  type?: string
  tag?: string
  origin?: string
} {
  return ON_AIR[subjectId] || EMPTY_ON_AIR_ITEM
}

export function getGroupThumbStatic(src: string): number | string {
  if (typeof src !== 'string') return src

  const key = src
    .split('?')[0]
    .replace('https:', '')
    .replace(/\/g\/|\/m\/|\/c\/|\/l\//, '/s/')
  return (GROUP_THUMB_MAP as Record<string, number | string>)[key] || src
}

const FORMAT_PLAYTIME_REPLACEMENT_MAP = {
  'very ': '超',
  long: '长',
  medium: '中',
  short: '短',
  '&lt;': '小于',
  hours: '时',
  h: '时',
  m: '分'
} as const

export function formatPlaytime(time: string) {
  if (!time || typeof time !== 'string') return ''

  let formattedTime = time.toLowerCase()
  for (const [key, value] of Object.entries(FORMAT_PLAYTIME_REPLACEMENT_MAP)) {
    formattedTime = formattedTime.replace(key, value)
  }

  return formattedTime
}

export function fixedSubjectInfo(info: string) {
  if (!info || typeof info !== 'string') return ''

  return info.replace(/<li[^>]*>/g, '<li>').replace(/<span[^>]*>/g, '<span>')
}
