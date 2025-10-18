/*
 * @Author: czy0729
 * @Date: 2025-10-06 19:24:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-06 19:37:13
 */
import type { VideoItem } from '../../types'

export function prioritizeByKeywords(
  items: VideoItem[],
  keywords?: (string | null | undefined)[]
): VideoItem[] {
  if (!items?.length || !keywords || keywords.length === 0) return items

  // 过滤掉空值，并归一化
  const normalizedKeywords = keywords.filter(Boolean).map(k => k!.replace(/\s+/g, '').toLowerCase())

  // 如果没有有效关键词，直接返回原数组
  if (normalizedKeywords.length === 0) return items

  return [...items].sort((a, b) => {
    const titleA = a.title.replace(/\s+/g, '').toLowerCase()
    const titleB = b.title.replace(/\s+/g, '').toLowerCase()

    const aMatch = normalizedKeywords.some(k => titleA.includes(k))
    const bMatch = normalizedKeywords.some(k => titleB.includes(k))

    if (aMatch && !bMatch) return -1
    if (!aMatch && bMatch) return 1
    return 0
  })
}
