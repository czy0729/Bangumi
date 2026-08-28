/*
 * @Author: czy0729
 * @Date: 2022-07-17 15:23:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 23:21:31
 */
import { t2s } from '@utils/thirdParty/cn-char'

/**
 * 页内搜索，单次
 *
 * @param filter 搜索词
 * @param texts 待搜索文本, 值为字符串或一层嵌套的字符串对象
 */
export function getShow(filter: string, texts: Readonly<Record<string, unknown>>) {
  if (!filter) return true

  try {
    const _filter = t2s(filter).toLocaleUpperCase()
    return Object.keys(texts).some(key => {
      const value = texts[key]

      if (typeof value === 'string') {
        return value.toLocaleUpperCase().includes(_filter)
      }

      if (value && typeof value === 'object') {
        return Object.values(value).some(
          v => typeof v === 'string' && v.toLocaleUpperCase().includes(_filter)
        )
      }
      return false
    })
  } catch {
    return false
  }
}

/**
 * 页内搜索，一次性判断
 *  - 全部显示 => Record<string, true>
 *  - 部分显示 => Record<string, boolean>
 *  - 全不显示 => false
 *
 * @param filter 搜索词
 * @param textsAll 待搜索文本集合, 每项为 getShow 的 texts 结构
 */
export function getShows<T extends Record<string, Readonly<Record<string, unknown>>>>(
  filter: string,
  textsAll: T
) {
  const shows: Record<string, boolean> = {}
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

/**
 * 语雀图床路径转缩略图列表
 *
 * @param src 语雀图床相对路径数组; false 表示无图
 */
export function getYuqueThumbs(src: readonly string[] | false) {
  if (!src) return false

  return src.map(path => ({
    url: `https://cdn.nlark.com/yuque/${path}`
  }))
}
