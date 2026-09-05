/*
 * @Author: czy0729
 * @Date: 2019-08-08 11:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-05 17:29:59
 */
import { pad } from '../utils/base'

import type { UserId } from '@types'

/** 缓存结果 */
const cacheMap = new Map<string, unknown>()

/** 匹配 */
function match<T>(
  str: string = '',
  fn: (str: string) => T,
  namespace: string = '',
  errorValue: T = '' as unknown as T
): T {
  try {
    if (!str || typeof fn !== 'function') return '' as T

    const key = `${namespace}|${str}`
    if (cacheMap.has(key)) return cacheMap.get(key) as T

    const result = fn(str) || errorValue
    cacheMap.set(key, result)

    return result
  } catch (error) {
    return errorValue
  }
}

/**
 * 匹配头像地址
 *  - style="background-image:url('//lain.bgm.tv/pic/user/l/000/00/00/000000.jpg?r=0')"
 *  - 兼容冒号后带空格的书写 (部分页面的内联样式为 "background-image: url(...)")
 *  - 非空输入未匹配到返回默认头像地址; 空输入由 match() 短路直接返回空,
 *    由上层按"无头像"自行兜底 (与既有持久化数据保持一致)
 * */
export function matchAvatar(str: string = ''): string {
  return (
    match(
      str,
      str =>
        str.match(/background-image:\s*url\('(.+?)'\)/)?.[1] || '//lain.bgm.tv/pic/user/s/icon.jpg',
      'matchAvatar'
    ) || ''
  )
}

/**
 * 匹配用户 Id
 * @eg /user/123
 */
export function matchUserId(str: string = ''): string {
  return match(str, str => str.substring(str.lastIndexOf('/') + 1), 'matchUserId') || ''
}

/**
 * 匹配条目 Id
 * @eg /subject/123
 */
export function matchSubjectId(str: string = ''): string {
  return match(str, str => str.substring(str.lastIndexOf('/') + 1), 'matchSubjectId')
}

/**
 * 匹配图片
 * @eg background-image:url('//lain.bgm.tv/pic/cover/m/4b/92/144482_nII3d.jpg')
 */
export function matchCover(str: string = ''): string {
  return match(
    str,
    str => {
      if (str === "background-image:url('/img/no_icon_subject.png')") return ''
      return str.substring(22, str.length - 2)
    },
    'matchCover'
  )
}

/**
 * 匹配评分
 * @eg starlight stars8
 */
export function matchStar(str: string = ''): string {
  return match(str, str => str.substring(15), 'matchStar')
}

/** 匹配字符串中第一个 bgm 地址 */
export function matchBgmUrl(str: string, returnAll: true): string[]
export function matchBgmUrl(str: string, returnAll?: false): string
export function matchBgmUrl(str: string = '', returnAll: boolean = false): string | string[] {
  return match(
    str,
    str => {
      const matchs = (str.match(
        /https?:\/\/(bangumi\.tv|bgm\.tv|chii\.in)((\w|=|\?|\.|\/|&|-)+)/g
      ) || []) as string[]
      return returnAll ? matchs : matchs[0] || ''
    },
    `${matchBgmUrl}${returnAll ? 'returnAll' : ''}`,
    ''
  )
}

/** 从头像地址匹配用户 Id */
export function matchUserIdFromAvatar(str: string = ''): UserId {
  if (!str) return 0
  return match(str, str => str.match(/\/(\d+).jpg/)?.[1] || 0, 'matchUserIdFromAvatar', 0)
}

/** 匹配年份 */
export function matchYear(str: string = ''): string {
  return match(str, str => str.match(/(\d{4})(年|-)/)?.[1] || '', 'matchYear')
}

/** 匹配年份 */
export function matchYearAndMonth(str: string = ''): string {
  return match(
    str,
    str => {
      const data = [matchYear(str)]
      const month = str.match(/(?:年|-)(\d+)/)?.[1]
      if (month) data.push(month.length < 2 ? pad(month) : month)
      return data.filter(item => !!item).join('-')
    },
    'matchYearAndMonth'
  )
}
