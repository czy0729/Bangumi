/*
 * @Author: czy0729
 * @Date: 2024-06-22 16:55:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 */
import Item from '../item'

import type { ReviewsItem } from '@stores/rakuen/types'
import type { RenderItem } from '@types'

export function keyExtractor(item: ReviewsItem, index: number) {
  // id 与 index 共用键空间会冲突, 加前缀区分
  return item.id ? `id-${item.id}` : `idx-${index}`
}

export function renderItem({ item, index }: RenderItem<ReviewsItem>) {
  return <Item {...item} index={index} />
}
