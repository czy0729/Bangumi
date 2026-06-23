/*
 * @Author: czy0729
 * @Date: 2024-01-09 16:19:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-23 17:00:30
 */
import React from 'react'
import Item from '../item'

import type { SubjectCommentsItem } from '@stores/subject/types'
import type { RenderItem } from '@types'

export function renderItem({ item, index }: RenderItem<SubjectCommentsItem>) {
  return (
    <Item
      index={index}
      action={item.action}
      avatar={item.avatar}
      comment={item.comment}
      mainId={item.mainId}
      mainName={item.mainName}
      relatedId={item.relatedId}
      star={item.star}
      time={item.time}
      userId={item.userId}
      userName={item.userName}
    />
  )
}
