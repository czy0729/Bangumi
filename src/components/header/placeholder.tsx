/*
 * @Author: czy0729
 * @Date: 2022-03-12 05:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 04:27:04
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { PlaceholderProps } from './types'

function Placeholder({ style }: PlaceholderProps) {
  return (
    <View
      style={stl(
        {
          height: _.headerHeight
        },
        style
      )}
    />
  )
}

export default observer(Placeholder)
