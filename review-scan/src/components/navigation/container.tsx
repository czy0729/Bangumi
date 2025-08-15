/*
 * @Author: czy0729
 * @Date: 2022-03-07 18:02:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-06 17:42:50
 */
import React, { useRef } from 'react'
import { useObserver } from 'mobx-react'
import { NavigationContainer as NavigationNativeContainer } from '@react-navigation/native'
import { navigationReference } from '@utils'
import { r } from '@utils/dev'
import { Navigation } from '@types'
import { Component } from '../component'
import { COMPONENT_CONTAINER } from './ds'
import { Props } from './types'

/** navigation context */
export const NavigationContainer = ({ children }: Props) => {
  r(COMPONENT_CONTAINER)

  const navigationRef = useRef<Navigation>(null)

  return useObserver(() => (
    <Component id='component-navigation'>
      <NavigationNativeContainer
        // @ts-expect-error
        ref={navigationRef}
        onReady={() => {
          if (navigationRef.current) {
            navigationReference(navigationRef.current)
          }
        }}
      >
        {children}
      </NavigationNativeContainer>
    </Component>
  ))
}
