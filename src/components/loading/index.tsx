/*
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 06:30:57
 */
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { Component } from '../component'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { ActivityIndicatorProps, ILoading } from './types'
export type { ILoading, ActivityIndicatorProps }

/** Loading (原始) */
const Raw = observer(({ color, size = 'large' }: ActivityIndicatorProps) => {
  r(COMPONENT)

  return <ActivityIndicator color={color || _.colorSub} size={size} />
})

/** Loading (中) */
const Normal = observer(({ color, size = 'small' }: ActivityIndicatorProps) => {
  r(COMPONENT)

  return <ActivityIndicator color={color || _.colorSub} size={size} />
})

/** Loading (中) */
const Medium = observer(({ style, color, size = 'small' }: ActivityIndicatorProps) => {
  r(COMPONENT)

  return (
    <Component id='component-loading' style={stl(styles.medium, style)}>
      <ActivityIndicator color={color || _.colorSub} size={size} />
    </Component>
  )
})

/** Loading (小) */
const Mini = observer(({ style, color, size = 'small' }: ActivityIndicatorProps) => {
  r(COMPONENT)

  return (
    <Component id='component-loading' style={stl(styles.mini, style)}>
      <ActivityIndicator color={color || _.colorSub} size={size} />
    </Component>
  )
})

/** Loading */
const Loading: ILoading = observer(({ style, spinnerStyle, color, size = 'small', children }) => {
  r(COMPONENT)

  return (
    <Component id='component-loading' style={stl(_.container.column, styles.loading, style)}>
      <Raw spinnerStyle={spinnerStyle} color={color || _.colorSub} size={size} />
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
