/*
 * @Author: czy0729
 * @Date: 2024-05-06 15:32:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:03:41
 *
 * 列表行渲染
 */
import Item from '../item'

import type { RenderItem } from '@types'
import type { Item as BackupItem } from '../../types'

export function renderItem({ item }: RenderItem<BackupItem>) {
  return <Item item={item} />
}
