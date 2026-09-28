/*
 * @Author: czy0729
 * @Date: 2022-06-19 21:18:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 23:47:53
 */
import { getGameSubject, getItemSubjectId } from '../../list/utils'
import Item from '../item'

import type { RenderItem } from '@types'
import type { ItemType } from '../../list/types'

/** 列表 key 提取 */
export function keyExtractor(item: ItemType) {
  return String(getItemSubjectId(item))
}

/** 游戏标签页和其他类型数据源和结构都不一样, 需要构造 */
export function renderItem({ item }: RenderItem<ItemType>) {
  return (
    <Item
      subjectId={getItemSubjectId(item)}
      subject={getGameSubject(item)}
      epStatus={'ep_status' in item ? item.ep_status : ''}
    />
  )
}
