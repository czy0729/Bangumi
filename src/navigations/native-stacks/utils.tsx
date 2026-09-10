/*
 * @Author: czy0729
 * @Date: 2023-08-14 04:14:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-22 21:35:24
 */
import { useCallback, useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { _, systemStore } from '@stores'
import { urlStringify } from '@utils'
import { useMount } from '@utils/hooks'
import { IOS } from '@constants'
import { ANIMATIONS, DEFAULT_SCREEN_OPTIONS } from './ds'

import type { ColorValue } from '@types'

/** 自动判断时机隐藏启动屏, 并返回设备是否启用全面屏 */
export function useAutoHideSplashScreen() {
  const [hideSplashScreen, setHideSplashScreen] = useState(false)
  const { bottom } = useSafeAreaInsets()
  const handleCallback = useCallback(async () => {
    await SplashScreen.hideAsync()
    setHideSplashScreen(true)
  }, [])

  useEffect(() => {
    if (hideSplashScreen) return

    // 一旦获取到底部 inset 可以当成页面已经完成布局渲染
    if (bottom) handleCallback()
  }, [bottom, handleCallback, hideSplashScreen])

  useMount(() => {
    if (hideSplashScreen) return

    // 某些旧机型没有底部圆角, 延迟一段时间后当成渲染完毕
    setTimeout(() => {
      handleCallback()
    }, 2000)
  })

  return {
    isFullScreen: (bottom || 0) <= 20,
    hideSplashScreen
  }
}

/** 构建路由页面通用参数 */
export function getScreenOptions(isFullScreen: boolean) {
  let navigationBarColor: ColorValue = _.colorPlain
  if (
    IOS ||
    isFullScreen ||
    ((systemStore.blurTopTabs || systemStore.blurBottomTabs) && _.isDark)
  ) {
    navigationBarColor = 'transparent'
  }

  const screenOptions = {
    ...DEFAULT_SCREEN_OPTIONS,

    /**
     * native-stack 下页面容器底色走 contentStyle (cardStyle 不生效)
     * 必须是不透明的 _.colorPlain: iOS 26 玻璃转场会露出这层底色, 透明或浅色会出现白色边缘
     * 注意 modal 形态 (transparentModal / containedTransparentModal) 下 native-stack 不套这层底色,
     * 那种场景由根容器 (App.tsx 的 container.plain) 兜底
     */
    contentStyle: {
      backgroundColor: _.colorPlain
    },
    animation: ANIMATIONS[systemStore.setting.transition],
    navigationBarColor
  }

  /**
   * IOS 13 以上需要修改 plist 才能使用 react-navigation 的修改 statusbar 特性
   * 所以使用 react-native 的方式
   */
  if (!IOS) {
    // @ts-ignore
    screenOptions.statusBarStyle = _.select('dark', 'light')
  }

  return screenOptions
}

/** 构建独立页面参数 */
export function getOptions(name: string) {
  if (IOS) return

  let statusBarStyle: 'dark' | 'light' = _.select('dark', 'light')
  if (!_.isDark) {
    if (name === 'Subject' || name === 'User' || name === 'Zone') {
      statusBarStyle = 'light'
    }
  }

  return {
    statusBarStyle
  }
}

/** unique ID for this screen */
export function getId({ params }: { params?: Record<string, string | number | boolean> }) {
  return params ? urlStringify(params) : undefined
}

/** 空占位组件 */
export function Placeholder() {
  return null
}
