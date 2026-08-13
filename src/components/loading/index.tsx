/*
 * @Author: czy0729
 * @Date: 2019-03-13 22:49:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 04:19:30
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

import type { Props as LoadingProps, ILoading } from './types'
export type { LoadingProps, ILoading }

/** Loading (原始) */
const Raw = observer(({ color, size = 'large' }: LoadingProps) => {
  r(COMPONENT)

  return <ActivityIndicator color={color || _.colorSub} size={size} />
})

/** Loading (中) */
const Normal = observer(({ color, size = 'small' }: LoadingProps) => {
  r(COMPONENT)

  return <ActivityIndicator color={color || _.colorSub} size={size} />
})

/** Loading (中) */
const Medium = observer(({ style, color, size = 'small' }: LoadingProps) => {
  r(COMPONENT)

  return (
    <Component id='component-loading' style={stl(styles.medium, style)}>
      <ActivityIndicator color={color || _.colorSub} size={size} />
    </Component>
  )
})

/** Loading (小) */
const Mini = observer(({ style, color, size = 'small' }: LoadingProps) => {
  r(COMPONENT)

  return (
    <Component id='component-loading' style={stl(styles.mini, style)}>
      <ActivityIndicator color={color || _.colorSub} size={size} />
    </Component>
  )
})

/** Loading */
const Loading: ILoading = observer(({ style, color, size = 'large', children }) => {
  r(COMPONENT)

  return (
    <Component id='component-loading' style={stl(_.container.column, styles.loading, style)}>
      <Raw color={color || _.colorSub} size={size} />
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
