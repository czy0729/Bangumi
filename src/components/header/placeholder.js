/*
 * @Author: czy0729
 * @Date: 2022-03-12 05:01:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-12 20:17:41
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

function Placeholder({ style }) {
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
