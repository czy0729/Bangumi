/*
 * @Author: czy0729
 * @Date: 2019-11-23 04:45:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:23:26
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_TINYGRAIL_CALCULATE_TYPE } from '@constants'
import Item from '../item'

import type { TinygrailCalculateTypeCn } from '@types'

function Chart({ data = [], calculateType, isTemple, onPress, onLongPress }) {
  const label = MODEL_TINYGRAIL_CALCULATE_TYPE.getLabel<TinygrailCalculateTypeCn>(calculateType)
  let extra: string
  if (label === '股息') extra = '+'
  return (
    <View style={_.container.tinygrail}>
      {data.map(item => (
        <Item
          key={item.id}
          {...item}
          label={label}
          extra={extra}
          isTemple={isTemple}
          onPress={onPress}
          onLongPress={onLongPress}
        />
      ))}
    </View>
  )
}

export default ob(Chart)
