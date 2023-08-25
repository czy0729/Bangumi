/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-26 06:04:32
 */
import React, { useEffect } from 'react'
import { LogBox, StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Provider from '@ant-design/react-native/lib/provider'
import Stacks from '@src/navigations/native-stacks'
import { DEV, DeepLink, BackAndroid } from '@components'
import { AppCommon } from '@_'
import { _ } from '@stores'
import {
  useCachedResources,
  useOrientation,
  useErrorHandlerAndroid,
  useDimensions
} from '@utils/hooks'
import { WSA } from '@constants'
import theme from '@styles/theme'
import { ANDROID_DEV_MENU } from './config'

enableScreens(true)
LogBox.ignoreAllLogs(true)
StatusBar.setBarStyle('dark-content')
StatusBar.setBackgroundColor('transparent')

export default function App() {
  // 加载图标等资源
  const loadingResult = useCachedResources()

  // 全局致命错误捕捉
  useErrorHandlerAndroid()

  // 获取水平状态, 只有平板允许横屏, 手机锁竖屏
  const orientation = useOrientation()
  useEffect(() => {
    _.toggleOrientation(orientation)
  }, [orientation])

  // WSA 子系统窗口是可以随意改变大小的
  const { window } = useDimensions()
  useEffect(() => {
    if (WSA) {
      requestAnimationFrame(() => {
        _.updateLayout()
      })
    }
  }, [window])

  if (!loadingResult) return null

  const isLoadingComplete = loadingResult >= 3
  return (
    <GestureHandlerRootView style={_.container.flex}>
      <SafeAreaProvider style={_.container.flex}>
        {/* @ts-expect-error */}
        <Provider theme={theme}>
          <Stacks isLoadingComplete={isLoadingComplete} />
          {isLoadingComplete && (
            <>
              <AppCommon />
              <BackAndroid />
              <DeepLink />
              {ANDROID_DEV_MENU && <DEV />}
            </>
          )}
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
