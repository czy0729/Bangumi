/*
 * @Author: czy0729
 * @Date: 2024-01-18 04:35:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-28 00:00:00
 */
import ItemNotify from '../item-notify'
import ItemPM from '../item-pm'

import type { PmItem } from '@stores/user/types'
import type { RenderItem } from '@types'
import type { MergeNotifyItem } from '../../types'

export function keyExtractorNotify(item: MergeNotifyItem, index: number) {
  return `${item.href}-${index}`
}

export function keyExtractorPm(item: PmItem) {
  return String(item.id)
}

export function renderNotifyItem({ item, index }: RenderItem<MergeNotifyItem>) {
  return <ItemNotify item={item} index={index} />
}

export function renderPmInItem({ item, index }: RenderItem<PmItem>) {
  return <ItemPM id='pmIn' item={item} index={index} />
}
