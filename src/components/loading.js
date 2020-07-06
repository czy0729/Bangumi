/*
 * 5个竖条的Loading
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-03 10:20:40
 */
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

function Raw({ color, size }) {
  return (
    <ActivityIndicator
      color={color || _.select(_.colorSub, _.colorDesc)}
      size={size}
    />
  )
}

Raw.defaultProps = {
  color: undefined,
  size: 'small'
}

function Loading({ style, color, size, children }) {
  return (
    <View style={style ? [_.container.column, style] : _.container.column}>
      <Raw color={color} size={size} />
      {children}
    </View>
  )
}

Loading.defaultProps = {
  color: undefined,
  size: 'small'
}

Loading.Raw = observer(Raw)

export default observer(Loading)
