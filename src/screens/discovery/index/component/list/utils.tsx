/*
 * @Author: czy0729
 * @Date: 2024-01-09 13:53:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 13:15:04
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { MODEL_SUBJECT_TYPE } from '@constants'
import ListItem from '../list-item'

import type { SubjectTypeCn, SubjectType, RenderItem } from '@types'

export function keyExtractor(item: { type: SubjectType }) {
  return item.type
}

export function renderItem({ item, index }: RenderItem<{ type: SubjectType }>) {
  return (
    <View>
      <ListItem {...item} index={index} />
      <Heatmap id='发现.跳转' from={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)} />
    </View>
  )
}
