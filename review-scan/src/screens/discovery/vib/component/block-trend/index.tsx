/*
 * @Author: czy0729
 * @Date: 2024-05-04 05:43:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 14:09:40
 */
import React from 'react'
import { View } from 'react-native'
import { ob } from '@utils/decorators'
import Title from '../title'
import Item from './item'
import { COMPONENT } from './ds'
import { Props } from './types'

function BlockTrend({ style, navigation, title, data }: Props) {
  return (
    <View style={style}>
      <Title text={title} />
      {data.map((item, index) => (
        <Item key={item.id} navigation={navigation} item={item} index={index} />
      ))}
    </View>
  )
}

export default ob(BlockTrend, COMPONENT)
