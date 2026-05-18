/*
 * @Author: czy0729
 * @Date: 2024-04-06 14:38:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-09 21:56:39
 */
import React from 'react'
import { isFutureDate } from '@utils/date'
import Item from '../item'
import ItemRecents from '../item-recents'

import type { CharactersItem, Recents, RecentsItem } from '@stores/users/types'
import type { RenderItem } from '@types'

export function renderItem({ item, index }: RenderItem<CharactersItem>) {
  return <Item {...item} index={index} />
}

/** 返回未来日期 item 结束后的位置（即分割线应插入的 index），没有未来 item 则返回 -1 */
export function getDividerIndex(list: Recents): number {
  let lastFutureIndex = -1
  for (let i = 0; i < list.list.length; i++) {
    if (isFutureDate(list.list[i].info)) lastFutureIndex = i
  }
  return lastFutureIndex + 1
}

export function renderItemRecents(dividerIndex: number) {
  return function RenderItem({ item, index }: RenderItem<RecentsItem>) {
    return <ItemRecents {...item} index={index} showDivider={index === dividerIndex} />
  }
}
