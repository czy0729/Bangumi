/*
 * @Author: czy0729
 * @Date: 2024-02-10 13:53:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-05 12:00:00
 *
 * 支持者列表的 key 与行渲染
 */
import ListItem from '../list-item'

import type { ListRenderItem } from 'react-native'
import type { ListItemType } from '../../types'

export function keyExtractor(item: ListItemType) {
  return String(item.data)
}

export const renderItem: ListRenderItem<ListItemType> = ({ item, index }) => (
  <ListItem item={item} index={index} />
)
