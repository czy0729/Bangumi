/*
 * @Author: czy0729
 * @Date: 2024-04-05 04:50:35
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-04-05 04:50:35
 *
 * 列表 key 生成
 */
import type { TagsItem } from '../../types'

export function keyExtractor(item: TagsItem) {
  return `${item.name}|${item.nums}`
}
