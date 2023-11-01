/*
 * 页面容器
 * @Author: czy0729
 * @Date: 2022-05-01 14:26:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 13:03:49
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { useFocusEffect } from '@react-navigation/native'
import { _ } from '@stores'
import { stl } from '@utils'
import { IOS } from '@constants'
import { StatusBar } from '../status-bar'
import { ErrorBoundary } from '../error-boundary'
import { Loading } from '../loading'
import { Props as PageProps } from './types'

export { PageProps }

export const Page = ({
  style,
  loaded,
  loadingColor,
  backgroundColor,
  children,
  statusBarEvent = true,
  ...other
}: PageProps) => {
  useFocusEffect(() => {
    if (IOS && statusBarEvent) {
      StatusBar.setBarStyle(_.isDark ? 'light-content' : 'dark-content')
    }
  })

  return useObserver(() => {
    const _style = stl(_.container.plain, style)
    if (loaded || loaded === undefined)
      return (
        <ErrorBoundary style={_style}>
          <View style={_style} {...other}>
            {children}
          </View>
        </ErrorBoundary>
      )

    return (
      <Loading style={_style} color={loadingColor} backgroundColor={backgroundColor} />
    )
  })
}
