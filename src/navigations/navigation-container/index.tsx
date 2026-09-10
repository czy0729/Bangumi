/*
 * @Author: czy0729
 * @Date: 2022-03-07 18:02:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 11:52:15
 */
import { observer } from 'mobx-react'
import { NavigationContainer as NavigationNativeContainer } from '@react-navigation/native'
import { navigationReference } from '@utils'
import { getTheme, useNavigationRef } from './utils'

import type { Props } from './types'

function NavigationContainer({ children }: Props) {
  const navigationRef = useNavigationRef()

  return (
    <NavigationNativeContainer
      // @ts-expect-error
      ref={navigationRef}
      theme={getTheme()}
      onReady={() => {
        if (navigationRef.current) navigationReference(navigationRef.current)
      }}
    >
      {children}
    </NavigationNativeContainer>
  )
}

export default observer(NavigationContainer)
