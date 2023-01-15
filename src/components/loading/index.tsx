/*
 * 5 个竖条的 Loading
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-15 10:37:00
 */
import React from 'react'
import { View, ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { DEV, IOS } from '@constants'
import { Spinner } from '../spinner'
import { styles } from './styles'
import { ILoading, ActivityIndicatorProps } from './types'

export { ILoading, ActivityIndicatorProps }

const USED_SPINNER = !IOS || DEV

const Raw = observer(
  ({ spinnerStyle, color, size = 'small' }: ActivityIndicatorProps) =>
    USED_SPINNER ? (
      <Spinner style={[styles.spinner, spinnerStyle]} />
    ) : (
      <ActivityIndicator
        color={color || _.select(_.colorSub, _.colorDesc)}
        size={size}
      />
    )
)

const Normal = observer(({ color, size = 'small' }: ActivityIndicatorProps) => (
  <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
))

const Mini = observer(({ color, size = 'small' }: ActivityIndicatorProps) => (
  <View style={styles.mini}>
    <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
  </View>
))

const Loading: ILoading = observer(
  ({ style, spinnerStyle, color, size = 'small', children }) => (
    <View style={[_.container.column, styles.loading, style]}>
      <Raw spinnerStyle={spinnerStyle} color={color} size={size} />
      {children}
    </View>
  )
)

Loading.Raw = Raw

Loading.Normal = Normal

Loading.Mini = Mini

export { Loading }
