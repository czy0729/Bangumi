/*
 * @Author: czy0729
 * @Date: 2024-03-18 21:13:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-18 21:32:02
 *
 * 找游戏列表 renderItem 工具
 */
import Item from '../item'

import type { RenderItem } from '@types'

export function keyExtractor(item: number) {
  return String(item)
}

export function renderItem({ item, index }: RenderItem<number>) {
  return <Item item={item} index={index} />
}
