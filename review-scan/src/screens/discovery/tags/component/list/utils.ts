/*
 * @Author: czy0729
 * @Date: 2024-04-05 04:50:35
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-05 04:50:35
 */
export function keyExtractor(item: { name: any; nums: any }) {
  return `${item.name}|${item.nums}`
}
