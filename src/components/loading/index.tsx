/*
 * 5个竖条的Loading
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 13:28:54
 */
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { styles } from './styles'
import { ILoading, ActivityIndicatorProps } from './types'

const Raw = observer(({ color, size = 'small' }: ActivityIndicatorProps) => (
  <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
))

const Mini = observer(({ color, size = 'small' }: ActivityIndicatorProps) => (
  <View style={styles.mini}>
    <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
  </View>
))

const Loading: ILoading = observer(({ style, color, size = 'small', children }) => (
  <View style={[_.container.column, styles.loading, style]}>
    <Raw color={color} size={size} />
    {children}
  </View>
))

Loading.Raw = Raw

Loading.Mini = Mini

export { Loading }
