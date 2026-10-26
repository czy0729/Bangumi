/*
 * @Author: czy0729
 * @Date: 2024-05-08 04:24:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-25 00:00:00
 */
import ItemLazy from './item'

import type { RenderItem, TopicId } from '@types'

export function keyExtractor(item: TopicId) {
  return String(item)
}

export function renderItem({ item }: RenderItem<TopicId>) {
  return <ItemLazy item={item} />
}
