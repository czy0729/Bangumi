/*
 * @Author: czy0729
 * @Date: 2024-03-22 07:55:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
 *
 * 列表 renderItem
 */
import Item from '../item'

import type { RenderItem } from '@types'
import type { ListItem } from '../../types'

export function renderItem({ item, index }: RenderItem<ListItem>) {
  return <Item item={item} index={index} />
}
