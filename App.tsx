/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-30 09:26:16
 */
import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import Provider from '@ant-design/react-native/lib/provider'
import { DeepLink, DEV } from '@components'
import { HoldMenuProvider } from '@components/@/react-native-hold-menu'
import { AppCommon } from '@_'
import { _ } from '@stores'
import { useCachedResources, useOrientation } from '@utils/hooks'
import Stacks from '@src/navigations/native-stacks'
import theme from '@styles/theme'

LogBox.ignoreAllLogs(true)

// iOS 侧载情况下, App 切出或者休眠后返回, 滑动退后会卡死, 暂不使用这个优化
// if (IOS_IPA) enableScreens(false)
enableScreens(false)

export default function App() {
  // 加载图标等资源
  const loadingResult = useCachedResources()

  // 获取水平状态, 只有平板允许横屏, 手机锁竖屏
  const orientation = useOrientation()
  useEffect(() => {
    _.toggleOrientation(orientation)
  }, [orientation])

  if (!loadingResult) return null

  const isLoadingComplete = loadingResult >= 3
  return (
    <GestureHandlerRootView style={_.container.flex}>
      <SafeAreaProvider style={_.container.flex}>
        {/* @ts-ignore */}
        <Provider theme={theme}>
          <HoldMenuProvider>
            <Stacks isLoadingComplete={isLoadingComplete} />
          </HoldMenuProvider>
          {isLoadingComplete && (
            <>
              <AppCommon />
              <DeepLink />
              <DEV />
            </>
          )}
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
