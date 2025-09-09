/*
 * @Author: czy0729
 * @Date: 2024-04-06 14:38:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-09 18:11:49
 */
import React from 'react'
import { RecentsItem } from '@stores/users/types'
import { RenderItem } from '@types'
import Item from '../item'
import ItemRecents from '../item-recents'

export function renderItem({ item, index }) {
  return <Item index={index} id={item.id} avatar={item.avatar} name={item.name} />
}

export function renderItemRecents({ item, index }: RenderItem<RecentsItem>) {
  return <ItemRecents {...item} index={index} />
}
