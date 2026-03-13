/*
 * @Author: czy0729
 * @Date: 2022-06-19 12:31:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-18 18:18:10
 */
import React from 'react'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeValue } from '@types'
import Item from '../item'

export function keyExtractor(item: { subject_id: any; id: any }) {
  return String(item.subject_id || item.id)
}

/** 游戏标签页和其他类型数据源和结构都不一样, 需要构造 */
export function renderItem({ item, index, title }) {
  return (
    <Item
      index={index}
      subjectId={item.subject_id || item.id}
      subject={
        item.subject || {
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
      epStatus={item.ep_status}
      title={title}
    />
  )
}
