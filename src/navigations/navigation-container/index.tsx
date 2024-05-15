/*
 * @Author: czy0729
 * @Date: 2022-03-07 18:02:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-13 16:51:07
 */
import React, { useRef } from 'react'
import { useObserver } from 'mobx-react'
import { NavigationContainer as NavigationNativeContainer } from '@react-navigation/native'
import { navigationReference } from '@utils'
import { Navigation } from '@types'
import { useDevInfo } from './utils'
import { Props } from './types'

// const enabledLimit = 5
// let enabled = false

function NavigationContainer({ children }: Props) {
  const navigationRef = useRef<Navigation>(null)
  useDevInfo(navigationRef.current)

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
  ))
}

export default NavigationContainer
