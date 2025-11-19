/*
 * @Author: czy0729
 * @Date: 2024-01-10 04:35:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-16 06:13:05
 */
import Item from '../item'

import type { MonoCommentsItem } from '@stores/subject/types'
import type { RenderItem } from '@types'

export function renderItem({ item, index }: RenderItem<MonoCommentsItem>) {
  return <Item item={item} index={index} />
}
