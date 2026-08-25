/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 20:05:18
 */
import React, { Suspense } from 'react'
import { LogBox, StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { DeepLink, HoldMenuProvider, Provider } from '@components'
import { AppCommon } from '@_'
import { _ } from '@stores'
import {
  useCachedResources,
  useErrorHandlerAndroid,
  useOrientationSync,
  useWSALayout
} from '@utils/hooks'
import { ANDROID } from '@constants'
import NativeStacks from '@src/navigations/native-stacks'

// iOS 侧载情况下, App 切出或者休眠后返回, 滑动退后会卡死, 暂不使用这个优化; 安卓开启以节省重叠页面的内存占用
enableScreens(ANDROID)
LogBox.ignoreAllLogs(true)

if (ANDROID) {
  StatusBar.setBarStyle('dark-content')
  StatusBar.setBackgroundColor('transparent')
}

export default function App() {
  // 加载图标等资源
  const loadingResult = useCachedResources()

  // 全局致命错误捕捉 (仅安卓有实现, 其他平台为空实现)
  useErrorHandlerAndroid()

  // 同步屏幕方向到主题仓库
  useOrientationSync()

  // 监听 WSA 子系统窗口尺寸变化, 更新布局
  useWSALayout()

  if (!loadingResult) return null

  const isLoadingComplete = loadingResult >= 3
  const elStacks = <NativeStacks isLoadingComplete={isLoadingComplete} />

  return (
    <GestureHandlerRootView style={_.container.flex}>
      <SafeAreaProvider style={_.container.flex}>
        <Provider>
          {!ANDROID ? <HoldMenuProvider>{elStacks}</HoldMenuProvider> : elStacks}
          {isLoadingComplete && (
            <Suspense>
              <AppCommon />
              <DeepLink />
            </Suspense>
          )}
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
