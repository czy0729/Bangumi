/*
 * @Author: czy0729
 * @Date: 2019-11-23 04:45:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-11 01:44:35
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_TINYGRAIL_CACULATE_TYPE } from '@constants'
import { TinygrailCaculateTypeCn } from '@types'
import Item from '../item'

function Chart({ data = [], caculateType, isTemple, onPress, onLongPress }) {
  const label =
    MODEL_TINYGRAIL_CACULATE_TYPE.getLabel<TinygrailCaculateTypeCn>(caculateType)
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
