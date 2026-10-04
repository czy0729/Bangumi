/*
 * @Author: czy0729
 * @Date: 2026-10-05 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 *
 * 找画集列表 renderItem 工具
 */
import Item from '../item'

import type { RenderItem } from '@types'

export function keyExtractor(item: number) {
  return String(item)
}

export function renderItem({ item, index }: RenderItem<number>) {
  return <Item item={item} index={index} />
}
