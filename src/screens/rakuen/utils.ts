/*
 * @Author: czy0729
 * @Date: 2026-10-24 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 超展开频道共用工具
 */

/**
 * 解析列表中的回复数文本
 * - 兼容 '12' / '12 replies' / '(+12)' 等格式
 * - 无法解析时返回 undefined, 由调用方决定跳过
 *
 * @param replies 原始文本
 */
export function parseReplies(replies: string) {
  const count = Number.parseInt(String(replies || '').replace(/\(\+|\)| replies/g, ''), 10)
  return Number.isNaN(count) ? undefined : count
}
