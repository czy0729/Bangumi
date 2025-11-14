/*
 * @Author: czy0729
 * @Date: 2022-03-07 18:02:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-13 12:20:29
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { NavigationContainer as NavigationNativeContainer } from '@react-navigation/native'
import { navigationReference } from '@utils'
import { useEnableScreens } from './utils'

import type { Props } from './types'

function NavigationContainer({ children }: Props) {
  const navigationRef = useEnableScreens()

  return useObserver(() => (
    <NavigationNativeContainer
      // @ts-expect-error
      ref={navigationRef}
      onReady={() => {
        if (navigationRef.current) navigationReference(navigationRef.current)
      }}
    >
      {children}
    </NavigationNativeContainer>
  ))
}

export default NavigationContainer
