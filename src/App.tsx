/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 15:54:33
 */
import { Suspense } from 'react'
import { LogBox, StatusBar } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
// 入口直连子模块, 避免 @components / @utils / @constants barrel 被启动链全量求值
import { DeepLink } from '@components/deep-link'
import { HoldMenuProvider } from '@components/hold-menu'
import { Provider } from '@components/provider'
import { AppCommon } from '@_/base/app-common/index.lazy'
import { _ } from '@stores'
import useCachedResources from '@utils/hooks/useCachedResources'
import useErrorHandlerAndroid from '@utils/hooks/useErrorHandlerAndroid'
import useOrientationSync from '@utils/hooks/useOrientationSync'
import useWSALayout from '@utils/hooks/useWSALayout'
import { ANDROID } from '@constants/env'
import NativeStacks from '@src/navigations/native-stacks'

/**
 * 这里不再调用 enableScreens(false)
 * react-native-screens 4.x 默认启用 (ENABLE_SCREENS 初始值为 isNativePlatformSupported),
 * 而 enableScreens(false) 会让 Screen 的 enabled 降级为 false (Screen.tsx 默认值取 screensEnabled()),
 * 页面退化为普通 View 全部常驻内存, 是 iOS 上跳几个页面内存就打满被 Jetsam 掉的主因
 */
// enableScreens(ANDROID)

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
