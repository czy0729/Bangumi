/*
 * @Author: czy0729
 * @Date: 2026-06-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-27 00:00:00
 */
import { x18 } from '@utils'
import { HOST, URL_DEFAULT_AVATAR } from '@constants'

import type { TimelineItem } from '@stores/timeline/types'

/**
 * 过滤默认头像用户
 * @returns true 保留, false 过滤
 */
export const filterDefaultAvatar = (item: TimelineItem): boolean => {
  return !item.avatar?.src?.includes(URL_DEFAULT_AVATAR)
}

/**
 * 过滤 18x 内容
 * @returns true 保留, false 过滤
 */
export const filter18xContent = (item: TimelineItem): boolean => {
  if (!item?.p3?.url?.[0]) return true

  const url = String(item.p3.url[0])
  if (!url.match(/\/subject\/\d+/)) return true

  const subjectId = url.replace(`${HOST}/subject/`, '')
  const title = String(item.p3.text?.[0] || '')
  return !x18(subjectId, title)
}

/**
 * 日期去重：相邻相同日期只保留第一个
 */
export const deduplicateDates = (list: TimelineItem[]): TimelineItem[] => {
  return list.map((item, index) => ({
    ...item,
    date: index === 0 || list[index - 1]?.date !== item.date ? item.date : ''
  }))
}
