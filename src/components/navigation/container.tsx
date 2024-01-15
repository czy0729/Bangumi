/*
 * @Author: czy0729
 * @Date: 2022-03-07 18:02:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-15 02:04:21
 */
import React, { useRef } from 'react'
import { enableScreens } from 'react-native-screens'
import { useObserver } from 'mobx-react'
import { navigationReference } from '@utils'
import { r } from '@utils/dev'
import { IOS_IPA } from '@/config'
import { NavigationContainer as NavigationNativeContainer } from '@react-navigation/native'
import { Navigation } from '@types'
import { Component } from '../component'
import { COMPONENT_CONTAINER } from './ds'
import { Props } from './types'

// iOS 侧载情况下, App 切出或者休眠后返回, 滑动退后会卡死, 暂不使用这个优化
if (IOS_IPA) {
  enableScreens(false)
}

// const enabledLimit = 5
// let enabled = false

/** navigation context */
export const NavigationContainer = ({ children }: Props) => {
  r(COMPONENT_CONTAINER)

  const navigationRef = useRef<Navigation>(null)

  // useEffect(() => {
  //   const unsubscribe = navigationRef.current?.addListener('state', e => {
  //     /**
  //      * 当页码少于 enabledLimit 页时, 不启用 react-native-screens, 这样切页动画会流畅非常多
  //      * 当大于 5 页时, 为了节省重叠页面的内存占用, 重新启动
  //      */
  //     const { index } = e.data.state
  //     if (!enabled && index > enabledLimit) {
  //       enabled = true
  //       if (!IOS_IPA) {
  //         enableScreens(enabled)
  //       }
  //     } else if (enabled && index <= enabledLimit) {
  //       enabled = false
  //       if (!IOS_IPA) {
  //         enableScreens(enabled)
  //       }
  //     }
  //   })
  //   return unsubscribe
  // }, [])

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
