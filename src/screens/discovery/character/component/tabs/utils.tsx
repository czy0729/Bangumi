/*
 * @Author: czy0729
 * @Date: 2025-12-28 05:55:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 标签页 renderItem
 */
import List from '../list'

import type { ItemProps } from './types'

export function renderItem(item: ItemProps) {
  return <List key={item.key} id={item.key} />
}
