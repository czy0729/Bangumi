/*
 * @Author: czy0729
 * @Date: 2025-03-25 18:22:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-25 18:31:18
 */

/** 由于 NSFW 条目的角色数据是从别的地方拿来拼装的, 需要手动排序 */
export function getSortValue(item: { desc: string; image: any }) {
  if (item.desc === '主角') return 3
  if (item.desc === '配角') return 2
  if (item.image && typeof item.image === 'string') return 1
  return 0
}
