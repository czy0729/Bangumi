/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:27:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 05:23:58
 */

/** 帖子内容缓存桶容量上限 (每桶), 全局约 1000 × 10 条 */
export const TOPIC_BUCKET_LIMIT = 10

/** 已读信息桶容量上限 (每桶) */
export const READED_BUCKET_LIMIT = 200

/** 帖子表情桶容量上限 (每桶, 兜底博客等无 topic 联动的条目) */
export const LIKES_BUCKET_LIMIT = 200

export function getBlogItemTime(str: string) {
  try {
    const temps = str
      .split('·')
      .map(item => item.trim())
      .filter(Boolean)
    if (temps.length) return temps[temps.length - 1]
  } catch {}
  return ''
}

export function getBlogTime(str: string) {
  return str
    .split('·')
    .map(item => item.trim())
    .filter(Boolean)
    .filter(item => item !== '删除' && item !== '编辑')
    .join(' · ')
}
