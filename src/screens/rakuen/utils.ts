/*
 * @Author: czy0729
 * @Date: 2026-10-24 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-25 10:00:00
 *
 * 超展开频道共用工具
 */

/**
 * 清洗列表中的回复数文本
 * - 兼容 '12' / '12 replies' / '(+12)' / '1,234' 等格式
 *
 * @param replies 原始文本
 */
function stripReplies(replies: string) {
  return String(replies || '')
    .replace(/\(\+|\)| replies|,/g, '')
    .trim()
}

/**
 * 解析列表中的回复数
 * - 无法解析时返回 undefined, 由调用方决定跳过
 *
 * @param replies 原始文本
 */
export function parseReplies(replies: string) {
  const count = Number.parseInt(stripReplies(replies), 10)
  return Number.isNaN(count) ? undefined : count
}

/**
 * 列表中的回复数展示文本
 *
 * @param count parseReplies 的结果, 无法解析时兜底为 +0
 */
export function formatReplies(count?: number) {
  return count === undefined ? '+0' : `+${count}`
}
