/*
 * @Author: czy0729
 * @Date: 2024-05-04 05:43:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 14:09:40
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import Title from '../title'
import Item from './item'
import { COMPONENT } from './ds'

import type { Props } from './types'

function BlockTrend({ style, title, data }: Props) {
  r(COMPONENT)

  return (
    <View style={style}>
      <Title text={title} />
      {data.map((item, index) => (
        <Item key={item.id} item={item} index={index} />
      ))}
    </View>
  )
}

export default observer(BlockTrend)
