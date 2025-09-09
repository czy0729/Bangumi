/*
 * @Author: czy0729
 * @Date: 2024-04-06 14:38:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-09 21:56:39
 */
import React from 'react'
import { CharactersItem, RecentsItem } from '@stores/users/types'
import { RenderItem } from '@types'
import Item from '../item'
import ItemRecents from '../item-recents'

export function renderItem({ item, index }: RenderItem<CharactersItem>) {
  return <Item {...item} index={index} />
}

export function renderItemRecents({ item, index }: RenderItem<RecentsItem>) {
  return <ItemRecents {...item} index={index} />
}
