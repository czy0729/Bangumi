/*
 * @Author: czy0729
 * @Date: 2024-07-20 11:20:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-06 01:30:37
 */
import React from 'react'
import Item from '../item'

import type { RenderItem } from '@types'

export function keyExtractor(item: number) {
  return String(item)
}

export function renderItem({ item, index }: RenderItem<number>) {
  return <Item item={item} index={index} />
}
