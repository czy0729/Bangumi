/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 02:13:49
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import Item from '../item'

function Chart({ data = [], onPress, onLongPress }) {
  return (
    <View style={_.container.tinygrail}>
      {data.map(item => (
        <Item key={item.id} {...item} onPress={onPress} onLongPress={onLongPress} />
      ))}
    </View>
  )
}

export default ob(Chart)
