/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-30 21:48:31
 */
import '@utils/thirdParty/stable-sort'
import 'react-native-gesture-handler'
import React, { useEffect } from 'react'
import { LogBox } from 'react-native'
import { enableScreens } from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Provider from '@ant-design/react-native/lib/provider'
import Stacks from '@src/navigations'
import { DEV, NavigationContainer, DeepLink, BackAndroid } from '@components'
import { AppCommon } from '@_'
import { _ } from '@stores'

import {
  useCachedResources,
  useKeepAwake,
  useOrientation,
  useMount,
  useErrorHandlerAndroid,
  useGlobalMount,
  useDimensions
} from '@utils/hooks'
import { androidKeyboardAdjust } from '@utils/ui'
import { WSA } from '@constants'
import theme from '@styles/theme'

LogBox.ignoreAllLogs(true)

export default function App() {
  // 加载图标等资源
  const isLoadingComplete = useCachedResources()

  // 开发环境保持常亮状态
  useKeepAwake()

  // 全局致命错误捕捉
  useErrorHandlerAndroid()

  // 获取水平状态, 只有平板允许横屏, 手机锁竖屏
  const orientation = useOrientation()
  useEffect(() => {
    _.toggleOrientation(orientation)
  }, [orientation])

  // 键盘模式设置为不调整画面大小, 需要动态改变的在页面内自行设置
  useMount(() => {
    enableScreens(false)
    androidKeyboardAdjust('setAdjustPan')
  })

  // App启动稳定后统一做的操作
  useGlobalMount()

  // WSA 子系统窗口是可以随意改变大小的
  const { window } = useDimensions()
  useEffect(() => {
    requestAnimationFrame(() => {
      if (WSA) _.updateLayout()
    })
  }, [window])

  if (!isLoadingComplete) return null

  return (
    <SafeAreaProvider style={_.container.flex}>
      <Provider theme={theme}>
        <NavigationContainer>
          <Stacks />
        </NavigationContainer>
        <AppCommon />
        <BackAndroid />
        <DeepLink />
        <DEV />
      </Provider>
    </SafeAreaProvider>
  )
}
