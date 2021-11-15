/*
 * 5个竖条的Loading
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-15 20:46:38
 */
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

const Raw = observer(({ color, size = 'small' }) => (
  <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
))

const Loading = observer(({ style, color, size = 'small', children }) => (
  <View style={[_.container.column, styles.loading, style]}>
    <Raw color={color} size={size} />
    {children}
  </View>
))

Loading.Raw = Raw

export { Loading }

const styles = _.create({
  loading: {
    paddingBottom: _.md
  }
})
