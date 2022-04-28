/*
 * 5个竖条的Loading
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 08:25:47
 */
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

const Raw = observer(({ color, size = 'small' }) => (
  <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
))

const Mini = observer(({ color, size = 'small' }) => (
  <View style={styles.mini}>
    <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
  </View>
))

const Loading = observer(({ style, color, size = 'small', children }) => (
  <View style={[_.container.column, styles.loading, style]}>
    <Raw color={color} size={size} />
    {children}
  </View>
))

Loading.Raw = Raw
Loading.Mini = Mini

export { Loading }

const styles = _.create({
  loading: {
    paddingBottom: _.md
  },
  mini: {
    transform: [
      {
        scale: 0.64
      }
    ]
  }
})
