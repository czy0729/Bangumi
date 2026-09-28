/*
 * @Author: czy0729
 * @Date: 2022-06-19 12:31:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-22 06:01:09
 */
import { MODEL_SUBJECT_TYPE } from '@constants'
import Item from '../item'

import type { RenderItem, SubjectTypeValue } from '@types'
import type { TabsLabel } from '../../types'
import type { ItemType } from './types'

/** 条目 Id 提取 (收藏条目为 subject_id, 游戏条目为 id) */
export function getItemSubjectId(item: ItemType) {
  return 'subject_id' in item ? item.subject_id : item.id
}

/** 游戏条目没有 subject 数据, 构造临时 subject 供 Item 渲染 */
export function getGameSubject(item: ItemType) {
  if ('subject' in item) return item.subject

  return {
    id: item.id,
    images: {
      common: item.cover,
      grid: item.cover,
      large: item.cover,
      medium: item.cover,
      small: item.cover
    },
    name: item.name,
    name_cn: item.nameCn,
    summary: '',
    type: MODEL_SUBJECT_TYPE.getValue<SubjectTypeValue>('游戏'),
    url: '',
    time: item.time
  }
}

/** 列表 key 提取 */
export function keyExtractor(item: ItemType) {
  return String(getItemSubjectId(item))
}

/** 游戏标签页和其他类型数据源和结构都不一样, 需要构造 */
export function renderItem({
  item,
  index,
  title
}: RenderItem<ItemType> & {
  title: TabsLabel
}) {
  return (
    <Item
      index={index}
      subjectId={getItemSubjectId(item)}
      subject={getGameSubject(item)}
      epStatus={'ep_status' in item ? item.ep_status : ''}
      title={title}
    />
  )
}
