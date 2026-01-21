/*
 * @Author: czy0729
 * @Date: 2022-06-19 21:18:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-27 05:09:56
 */
import React from 'react'
import { MODEL_SUBJECT_TYPE } from '@constants'
import Item from '../item'

export function keyExtractor(item: { subject_id: any; id: any }) {
  return String(item.subject_id || item.id)
}

export function renderItem({ item }) {
  return (
    <Item
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
          type: MODEL_SUBJECT_TYPE.getValue('游戏'),
          url: '',
          time: item.time
        }
      }
      epStatus={item.ep_status}
    />
  )
}
