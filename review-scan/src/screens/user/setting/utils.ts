/*
 * @Author: czy0729
 * @Date: 2022-07-17 15:23:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:51:41
 */
import { t2s } from '@utils/thirdParty/cn-char'

/**
 * 页内搜索，单次
 * @param filter
 * @param texts
 */
export function getShow(filter: string, texts: Readonly<object>) {
  if (!filter) return true

  try {
    const _filter = t2s(filter).toLocaleUpperCase()
    return Object.keys(texts).some(key => {
      if (typeof texts[key] === 'string') {
        return texts[key].toLocaleUpperCase().includes(_filter)
      }

      if (typeof texts[key] === 'object') {
        return Object.keys(texts[key]).some(k =>
          texts[key][k].toLocaleUpperCase().includes(_filter)
        )
      }
      return false
    })
  } catch (error) {
    return false
  }
}

/**
 * 页内搜索，一次性判断
 *  - 全部显示 => Record<string, true>
 *  - 部分显示 => Record<string, boolean>
 *  - 全不显示 => null
 *
 * @param filter
 * @param textsAll
 */
export function getShows<T extends Record<string, object>>(filter: string, textsAll: T) {
  const shows = {}
  if (!filter) {
    Object.keys(textsAll).forEach(key => (shows[key] = true))
  } else {
    Object.keys(textsAll).forEach(key => {
      shows[key] = getShow(filter, textsAll[key])
    })
  }

  if (Object.keys(shows).every(key => !shows[key])) return false

  return shows as Record<keyof T, boolean>
}

export function getYuqueThumbs(src: string[] | readonly string[] | false) {
  if (!src) return false

  return src.map((item: any) => ({
    url: `https://cdn.nlark.com/yuque/${item}`
  }))
}
