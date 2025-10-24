/*
 * @Author: czy0729
 * @Date: 2024-01-15 22:16:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-24 16:33:55
 */
import React from 'react'
import Item from '../item'

import type { SayItem } from '@stores/timeline/types'
import type { RenderItem } from '@types'

export function keyExtractor(item: SayItem) {
  return String(item.uid)
}

export function renderItem({ item, index }: RenderItem<SayItem>) {
  return <Item item={item} index={index} />
}
