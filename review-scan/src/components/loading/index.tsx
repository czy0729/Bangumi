/*
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-26 15:39:31
 */
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { DEV, IOS } from '@constants'
import { Component } from '../component'
import { Spinner } from '../spinner'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { ActivityIndicatorProps, ILoading } from './types'

export { ILoading, ActivityIndicatorProps }

const USED_SPINNER = !IOS || DEV

/** Loading (原始) */
const Raw = observer(({ spinnerStyle, color, size = 'small' }: ActivityIndicatorProps) => {
  r(COMPONENT)

  if (USED_SPINNER) {
    return <ActivityIndicator color={_.colorIcon} size='large' />
  }

  // 因有无暂时法解决的平台 bug, 不使用此组件
  return USED_SPINNER ? (
    <Spinner style={stl(styles.spinner, spinnerStyle)} />
  ) : (
    <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
  )
})

/** Loading (中) */
const Normal = observer(({ color, size = 'small' }: ActivityIndicatorProps) => {
  r(COMPONENT)

  return <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
})

/** Loading (中) */
const Medium = observer(({ style, color, size = 'small' }: ActivityIndicatorProps) => {
  r(COMPONENT)

  return (
    <Component id='component-loading' style={stl(styles.medium, style)}>
      <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
    </Component>
  )
})

/** Loading (小) */
const Mini = observer(({ style, color, size = 'small' }: ActivityIndicatorProps) => {
  r(COMPONENT)

  return (
    <Component id='component-loading' style={stl(styles.mini, style)}>
      <ActivityIndicator color={color || _.select(_.colorSub, _.colorDesc)} size={size} />
    </Component>
  )
})

/** Loading */
const Loading: ILoading = observer(({ style, spinnerStyle, color, size = 'small', children }) => {
  r(COMPONENT)

  return (
    <Component id='component-loading' style={stl(_.container.column, styles.loading, style)}>
      <Raw spinnerStyle={spinnerStyle} color={color} size={size} />
      {children}
    </Component>
  )
})

Loading.Raw = Raw

Loading.Normal = Normal

Loading.Medium = Medium

Loading.Mini = Mini

export { Loading }

export default Loading
