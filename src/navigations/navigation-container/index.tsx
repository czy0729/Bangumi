/*
 * @Author: czy0729
 * @Date: 2022-03-07 18:02:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-30 09:26:00
 */
import React, { useEffect, useRef } from 'react'
import { enableScreens } from 'react-native-screens'
import { useObserver } from 'mobx-react'
import { NavigationContainer as NavigationNativeContainer } from '@react-navigation/native'
import { devLog } from '@components'
import { navigationReference } from '@utils'
import { IOS_IPA } from '@/config'
import { Navigation } from '@types'
import { useDevInfo } from './utils'
import { Props } from './types'

/** 路由路径达到长度后开启 enableScreens */
const enabledLimit = 5

/** 是否开启 enableScreens */
let enabled = false

function NavigationContainer({ children }: Props) {
  const navigationRef = useRef<Navigation>(null)
  useDevInfo(navigationRef.current)

  useEffect(() => {
    if (IOS_IPA) return

    /**
     * 当页码少于 enabledLimit 页时, 不启用 react-native-screens, 这样切页动画会流畅非常多
     * 当大于 5 页时, 为了节省重叠页面的内存占用, 重新启动
     */
    const unsubscribe = navigationRef.current?.addListener('state', e => {
      const { index } = e.data.state
      if (!enabled && index > enabledLimit) {
        enabled = true
        enableScreens(enabled)
        devLog('enableScreens', enabled)
      } else if (enabled && index <= enabledLimit) {
        enabled = false
        enableScreens(enabled)
        devLog('enableScreens', enabled)
      }
    })

    return unsubscribe
  }, [])

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
