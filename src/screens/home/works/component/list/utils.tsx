/*
 * @Author: czy0729
 * @Date: 2024-06-02 15:40:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-17 18:40:16
 */
import React from 'react'
import { MonoWorksItem } from '@stores/subject/types'
import { RenderItem } from '@types'
import Item from '../item'
import ItemGrid from '../item-grid'

export function renderListItem({ item, index }: RenderItem<MonoWorksItem>) {
  return <Item item={item} index={index} />
}

export function renderGridItem({ item, index }: RenderItem<MonoWorksItem>) {
  return <ItemGrid item={item} index={index} />
}
