/*
 * @Author: czy0729
 * @Date: 2022-06-19 21:18:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-27 05:09:56
 */
import React from 'react'
import { MODEL_SUBJECT_TYPE } from '@constants'
import Item from '../item'

import type { RenderItem, SubjectTypeValue } from '@types'
import type { ItemType } from '../../list/types'

export function keyExtractor(item: ItemType) {
  return String('subject_id' in item ? item.subject_id : item.id)
}

/** 游戏标签页和其他类型数据源和结构都不一样, 需要构造 */
export function renderItem({ item }: RenderItem<ItemType>) {
  return (
    <Item
      subjectId={'subject_id' in item ? item.subject_id : item.id}
      subject={
        'subject' in item
          ? item.subject
          : {
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
      epStatus={'ep_status' in item ? item.ep_status : ''}
    />
  )
}
