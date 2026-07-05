/*
 * @Author: czy0729
 * @Date: 2024-01-18 04:35:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-05 22:58:38
 */
import React from 'react'
import ItemNotify from '../item-notify'
import ItemPM from '../item-pm'

import type { PmItem } from '@stores/user/types'
import type { RenderItem } from '@types'
import type { MergeNotifyItem } from '../../types'

export function keyExtractor(item: MergeNotifyItem | PmItem, index: number) {
  return `${JSON.stringify(item)}|${index}`
}

export function renderNotifyItem({ item, index }: RenderItem<MergeNotifyItem>) {
  return <ItemNotify item={item} index={index} />
}

export function renderPmInItem({ item, index }: RenderItem<PmItem>) {
  return <ItemPM id='pmIn' item={item} index={index} />
}

// export function renderPmOutItem({ item, index }) {
//   return <ItemPM id='pmOut' item={item} index={index} />
// }
