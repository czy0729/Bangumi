/*
 * @Author: czy0729
 * @Date: 2024-02-04 01:09:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-17 12:15:42
 */
import React from 'react'
import Item from '../item'
import { ENTERING_EXITING_ANIMATIONS_NUM } from './ds'

import type { RakuenItem } from '@stores/rakuen/types'
import type { RenderItem } from '@types'

export function keyExtractor(item: RakuenItem, index: number) {
  return `${item.href}|${index < ENTERING_EXITING_ANIMATIONS_NUM}`
}

export function renderItem({ item, index }: RenderItem<RakuenItem>) {
  return <Item {...item} index={index} />
}
