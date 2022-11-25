/*
 * @Author: czy0729
 * @Date: 2022-11-24 05:43:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-24 18:45:49
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import Item from '../item'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  return (
    <View>
      {$.data.map(item => (
        <Item key={item.uuid} {...item} />
      ))}
    </View>
  )
}

export default obc(List)
