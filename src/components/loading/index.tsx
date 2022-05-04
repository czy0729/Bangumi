/*
 * 5个竖条的Loading
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-04 14:46:51
 */
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { ColorValue, ReactNode, ViewStyle } from '@types'
import { styles } from './styles'

type ActivityIndicatorProps = {
  color?: ColorValue
  size?: 'small' | 'large'
}

type Props = ActivityIndicatorProps & {
  style?: ViewStyle
  children?: ReactNode
}

const Raw = observer(({ color, size = 'small' }: ActivityIndicatorProps) => (
  <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
))

const Mini = observer(({ color, size = 'small' }: ActivityIndicatorProps) => (
  <View style={styles.mini}>
    <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
  </View>
))

const Loading = observer(({ style, color, size = 'small', children }: Props) => (
  <View style={[_.container.column, styles.loading, style]}>
    <Raw color={color} size={size} />
    {children}
  </View>
))

// @ts-ignore
Loading.Raw = Raw

// @ts-ignore
Loading.Mini = Mini

export { Loading }
