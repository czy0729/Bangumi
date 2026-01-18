/*
 * @Author: czy0729
 * @Date: 2022-08-07 03:53:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 19:53:29
 */
import React from 'react'
import ItemGrid from '../item-grid'

import type { Friend } from '@stores/users/types'
import type { RenderItem } from '@types'

export function renderItem({ item, index }: RenderItem<Friend>) {
  return <ItemGrid item={item} index={index} />
}

export function keyExtractor(item: Friend) {
  return String(item.userId)
}
