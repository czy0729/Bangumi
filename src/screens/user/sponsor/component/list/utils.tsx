/*
 * @Author: czy0729
 * @Date: 2024-02-10 13:53:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-11 22:45:14
 */
import ListItem from '../list-item'

import type { ListItemType } from '../../types'

export function keyExtractor(item: ListItemType) {
  return String(item.data)
}

export function renderItem({ item, index }: { item: ListItemType; index: number }) {
  return <ListItem item={item} index={index} />
}
