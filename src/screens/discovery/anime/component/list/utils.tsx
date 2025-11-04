/*
 * @Author: czy0729
 * @Date: 2024-03-16 15:53:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-04 16:51:47
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
