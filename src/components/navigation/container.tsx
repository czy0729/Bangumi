/*
 * @Author: czy0729
 * @Date: 2022-03-07 18:02:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-02 14:30:07
 */
import React, { useRef, useEffect } from 'react'
import { useObserver } from 'mobx-react-lite'
import { enableScreens } from 'react-native-screens'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer as NContainer } from '@react-navigation/native'
import { _ } from '@stores'
import { navigationReference } from '@utils'
import { ReactNode } from '@types'

type Props = {
  children: ReactNode
}

const enabledLimit = 5
let enabled = false

export const NavigationContainer = ({ children }: Props) => {
  const navigationRef = useRef(null)
  useEffect(() => {
    const unsubscribe = navigationRef.current?.addListener('state', e => {
      /**
       * 当页码少于 enabledLimit 页时, 不启用 react-native-screens, 这样切页动画会流畅非常多
       * 当大于5页时, 为了节省重叠页面的内存占用, 重新启动
       */
      const { index } = e.data.state
      if (!enabled && index > enabledLimit) {
        enabled = true
        enableScreens(enabled)
      } else if (enabled && index <= enabledLimit) {
        enabled = false
        enableScreens(enabled)
      }
    })
    return unsubscribe
  }, [])

  return useObserver(() => (
    <GestureHandlerRootView style={_.container.plain}>
      <NContainer
        ref={navigationRef}
        onReady={() => {
          navigationReference(navigationRef.current)
        }}
      >
        {children}
      </NContainer>
    </GestureHandlerRootView>
  ))
}
