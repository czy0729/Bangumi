/*
 * @Author: czy0729
 * @Date: 2024-02-12 18:16:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 19:40:52
 */
export function keyExtractor(item: any, index: number) {
  return item.name ? `${item.name}${item.rank}` : String(item?.id || index)
}
