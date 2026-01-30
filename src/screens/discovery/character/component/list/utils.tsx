/*
 * @Author: czy0729
 * @Date: 2024-04-06 14:38:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-09 21:56:39
 */
import React from 'react'
import Item from '../item'
import ItemRecents from '../item-recents'

import type { CharactersItem, RecentsItem } from '@stores/users/types'
import type { RenderItem } from '@types'

export function renderItem({ item, index }: RenderItem<CharactersItem>) {
  return <Item {...item} index={index} />
}

export function renderItemRecents({ item, index }: RenderItem<RecentsItem>) {
  return <ItemRecents {...item} index={index} />
}
