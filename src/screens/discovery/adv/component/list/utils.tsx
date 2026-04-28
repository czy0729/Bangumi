/*
 * @Author: czy0729
 * @Date: 2024-07-14 14:58:46
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-07-14 14:58:46
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
