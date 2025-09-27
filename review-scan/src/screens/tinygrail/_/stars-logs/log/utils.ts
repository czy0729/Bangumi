/*
 * @Author: czy0729
 * @Date: 2025-04-24 19:54:45
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-04-24 19:54:45
 */
export function getTypeText(type: number) {
  if (type === 0) return '星之力'
  if (type === 1) return '受到攻击'
  if (type === 2) return '鲤鱼之眼'
  if (type === 3) return '精炼成功'
  if (type === 4) return '精炼失败'
  return ''
}
