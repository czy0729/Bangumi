/*
 * @Author: czy0729
 * @Date: 2025-03-25 18:22:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-25 18:31:18
 */

/** 由于 NSFW 条目的角色数据是从别的地方拿来拼装的, 需要手动排序 */
export function getSortValue(item: { roleName: string; desc: string; image: any }): number {
  const text = item.roleName || item.desc
  const priorityMap: Record<string, number> = {
    主角: 4,
    配角: 3,
    客串: 2
  }
  if (text && !(text in priorityMap)) return 5
  if (text in priorityMap) return priorityMap[text]
  if (item.image && typeof item.image === 'string') return 1
  return 0
}
