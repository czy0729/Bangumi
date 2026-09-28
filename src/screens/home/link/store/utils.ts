/*
 * @Author: czy0729
 * @Date: 2026-09-28 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 10:00:00
 *
 * 关联图页面状态工具
 */

/** 隐藏类型归一化为数字去重数组 (本地缓存为 JSON.parse 未定型边界, 旧版本存的是字符串) */
export function normalizeHideTypes(value: unknown): number[] {
  if (!Array.isArray(value)) return []

  return Array.from(
    new Set(value.map(item => Number(item)).filter(item => Number.isFinite(item)))
  )
}
