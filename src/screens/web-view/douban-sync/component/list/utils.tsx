/*
 * @Author: czy0729
 * @Date: 2024-09-16 16:37:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 19:30:00
 *
 * 列表条目渲染
 */
import Item from '../item'

import type { RenderItem } from '@types'
import type { DoubanItem } from '../../types'

export function renderItem({ item }: RenderItem<DoubanItem>) {
  return <Item item={item} />
}
