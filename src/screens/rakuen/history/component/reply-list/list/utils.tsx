/*
 * @Author: czy0729
 * @Date: 2024-06-05 20:47:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-11 00:00:00
 */
import React from 'react'
import Item from '../item'

import type { RenderItem } from '@types'
import type { GroupItem } from '@stores/rakuen/types'

export function keyExtractor(item: GroupItem) {
  return item.href
}

export function renderItem({ item }: RenderItem<GroupItem>) {
  return <Item {...item} />
}
