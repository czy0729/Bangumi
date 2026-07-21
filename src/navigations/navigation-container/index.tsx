/*
 * @Author: czy0729
 * @Date: 2022-03-07 18:02:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-13 12:20:29
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer as NavigationNativeContainer
} from '@react-navigation/native'
import { _ } from '@stores'
import { navigationReference } from '@utils'
import { useEnableScreens } from './utils'

import type { Props } from './types'

function NavigationContainer({ children }: Props) {
  const navigationRef = useEnableScreens()

  return useObserver(() => {
    const baseTheme = _.isDark ? DarkTheme : DefaultTheme
    const navigationTheme = {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        primary: _.colorMain,
        background: _.colorPlain,
        card: _.colorPlain,
        text: _.colorTitle,
        border: _.colorBorder,
        notification: _.colorDanger
      }
    }

    return (
      <NavigationNativeContainer
        // @ts-expect-error
        ref={navigationRef}
        theme={navigationTheme}
        onReady={() => {
          if (navigationRef.current) navigationReference(navigationRef.current)
        }}
      >
        {children}
      </NavigationNativeContainer>
    )
  })
}

export default NavigationContainer
