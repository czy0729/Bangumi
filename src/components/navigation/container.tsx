/*
 * @Author: czy0729
 * @Date: 2022-03-07 18:02:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-20 17:02:47
 */
import React, { useRef, useEffect } from 'react'
import { useObserver } from 'mobx-react-lite'
import { enableScreens } from 'react-native-screens'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer as NContainer } from '@react-navigation/native'
import { _ } from '@stores'
import { navigationReference } from '@utils'
import { ReactNode } from '@types'
import { IOS_IPA } from '@/config'

// iOS 侧载情况下, App 切出或者休眠后返回, 滑动退后会卡死, 暂不使用这个优化
if (IOS_IPA) {
  enableScreens(false)
}

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
        if (!IOS_IPA) {
          enableScreens(enabled)
        }
      } else if (enabled && index <= enabledLimit) {
        enabled = false
        if (!IOS_IPA) {
          enableScreens(enabled)
        }
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
