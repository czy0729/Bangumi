/*
 * @Author: czy0729
 * @Date: 2024-05-04 05:43:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 06:06:34
 */
import React from 'react'
import { View } from 'react-native'
import { ob } from '@utils/decorators'
import { getTrendSubjects } from '../../utils'
import Title from '../title'
import Item from './item'
import { COMPONENT } from './ds'
import { Props } from './types'

function BlockTrend({ style, navigation, raw }: Props) {
  const data = getTrendSubjects(raw.value)
  return (
    <View style={style}>
      <Title text={raw.key} />
      {data.map((item, index) => (
        <Item key={item.id} navigation={navigation} item={item} index={index} />
      ))}
    </View>
  )
}

export default ob(BlockTrend, COMPONENT)
