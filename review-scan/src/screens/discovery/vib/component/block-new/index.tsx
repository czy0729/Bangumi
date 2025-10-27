/*
 * @Author: czy0729
 * @Date: 2024-05-04 05:43:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 14:08:36
 */
import React from 'react'
import { View } from 'react-native'
import { asc } from '@utils'
import { ob } from '@utils/decorators'
import Title from '../title'
import Item from './item'
import { COMPONENT } from './ds'
import { Props } from './types'

function BlockNew({ style, navigation, title, data }: Props) {
  return (
    <View style={style}>
      <Title text={title} />
      {data
        .sort((a, b) => asc(Number(a.value1), Number(b.value1)))
        .map((item, index) => (
          <Item key={item.id} navigation={navigation} item={item} index={index} />
        ))}
    </View>
  )
}

export default ob(BlockNew, COMPONENT)
