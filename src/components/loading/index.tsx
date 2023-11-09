/*
 * 5 个竖条的 Loading
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 14:09:01
 */
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { DEV, IOS } from '@constants'
import { Component } from '../component'
import { Spinner } from '../spinner'
import { styles } from './styles'
import { ILoading, ActivityIndicatorProps } from './types'

export { ILoading, ActivityIndicatorProps }

const USED_SPINNER = !IOS || DEV

const Raw = observer(
  ({ spinnerStyle, color, size = 'small' }: ActivityIndicatorProps) => {
    if (USED_SPINNER) {
      return <ActivityIndicator color={_.colorIcon} size='large' />
    }

    // 因有无暂时法解决的平台 bug, 不使用此组件
    return USED_SPINNER ? (
      <Spinner style={stl(styles.spinner, spinnerStyle)} />
    ) : (
      <ActivityIndicator
        color={color || _.select(_.colorSub, _.colorDesc)}
        size={size}
      />
    )
  }
)

const Normal = observer(({ color, size = 'small' }: ActivityIndicatorProps) => (
  <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
))

const Medium = observer(({ color, size = 'small' }: ActivityIndicatorProps) => (
  <Component id='component-loading' style={styles.medium}>
    <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
  </Component>
))

const Mini = observer(({ color, size = 'small' }: ActivityIndicatorProps) => (
  <Component id='component-loading' style={styles.mini}>
    <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
  </Component>
))

const Loading: ILoading = observer(
  ({ style, spinnerStyle, color, size = 'small', children }) => (
    <Component
      id='component-loading'
      style={stl(_.container.column, styles.loading, style)}
    >
      <Raw spinnerStyle={spinnerStyle} color={color} size={size} />
      {children}
    </Component>
  )
)

Loading.Raw = Raw

Loading.Normal = Normal

Loading.Medium = Medium

Loading.Mini = Mini

export { Loading }
