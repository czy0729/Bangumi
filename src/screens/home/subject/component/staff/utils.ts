/*
 * @Author: czy0729
 * @Date: 2025-03-25 18:30:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-25 19:09:49
 */

/** 由于 NSFW 条目的职员数据是从别的地方拿来拼装的, 出现了重复的情况, 手动排除 */
export function removeDuplicateItemsById<T extends any[] | readonly any[]>(items: T): T {
  const seenIds = new Set<number>()
  return items.filter(item => {
    if (seenIds.has(item.id)) return false
    seenIds.add(item.id)
    return true
  }) as T
}
