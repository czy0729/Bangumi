/*
 * @Author: czy0729
 * @Date: 2026-03-24 21:07:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-24 21:12:11
 */
export function getLastPart(str: string) {
  if (!str) return ''

  // 没有斜杆分割的描述通常只有一个日期, 不符合描述的逻辑不显示
  if (!str.includes('/')) return ''

  const parts = str.split(' / ')
  return parts.pop().trim()
}
