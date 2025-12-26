/*
 * @Author: czy0729
 * @Date: 2024-06-02 15:40:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 02:58:46
 */
import React from 'react'
import Item from '../item'
import ItemGrid from '../item-grid'

import type { MonoWorksItem } from '@stores/subject/types'
import type { RenderItem } from '@types'

export function renderListItem({ item, index }: RenderItem<MonoWorksItem>) {
  return <Item item={item} index={index} />
}

export function renderGridItem({ item, index }: RenderItem<MonoWorksItem>) {
  return <ItemGrid item={item} index={index} />
}
