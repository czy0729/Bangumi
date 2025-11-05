/*
 * @Author: czy0729
 * @Date: 2024-01-09 13:53:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-09 13:53:26
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import ListItem from '../list-item'

export function keyExtractor(item: { type: any }) {
  return item.type
}

export function renderItem({ item, index }) {
  return (
    <View>
      <ListItem {...item} index={index} />
      <Heatmap id='发现.跳转' from={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(item.type)} />
    </View>
  )
}
