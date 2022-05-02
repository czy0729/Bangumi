/*
 * @Author: czy0729
 * @Date: 2022-03-12 05:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-02 12:36:25
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { ViewStyle } from '@types'

type Props = {
  style?: ViewStyle
}

function Placeholder({ style }: Props) {
  return (
    <View
      style={[
        {
          height: _.headerHeight
        },
        style
      ]}
    />
  )
}

export default observer(Placeholder)
