/*
 * @Author: czy0729
 * @Date: 2024-07-26 13:08:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-14 12:00:00
 *
 * 找 Hentai 列表 renderItem 工具
 */
import Item from '../item'

import type { RenderItem } from '@types'

export function keyExtractor(item: number) {
  return String(item)
}

export function renderItem({ item, index }: RenderItem<number>) {
  return <Item item={item} index={index} />
}
