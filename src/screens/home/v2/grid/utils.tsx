/*
 * @Author: czy0729
 * @Date: 2022-06-19 21:18:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-19 21:19:42
 */
import React from 'react'
import { MODEL_SUBJECT_TYPE } from '@constants'
import GridItem from '../grid-item'

export function keyExtractor(item) {
  return String(item.subject_id || item.id)
}

export function renderItem({ item }) {
  return (
    <GridItem
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
          url: ''
        }
      }
      epStatus={item.ep_status}
    />
  )
}
