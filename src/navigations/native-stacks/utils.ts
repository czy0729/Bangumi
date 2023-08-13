/*
 * @Author: czy0729
 * @Date: 2023-08-14 04:14:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-14 04:27:05
 */
import { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { useMount } from '@utils/hooks'

let hideSplashScreen = false

/** 自动判断时机隐藏启动屏, 并返回设备是否启用全面屏 */
export function useAutoHideSplashScreen(): boolean {
  const { bottom } = useSafeAreaInsets()
  useEffect(() => {
    if (hideSplashScreen) return

    // 一旦获取到底部 inset 可以当成页面已经完成布局渲染
    if (bottom) {
      SplashScreen.hideAsync()
      hideSplashScreen = true
    }
  }, [bottom])

  useMount(() => {
    if (hideSplashScreen) return

    // 某些旧机型没有底部圆角, 延迟一段时间后当成渲染完毕
    setTimeout(() => {
      SplashScreen.hideAsync()
      hideSplashScreen = true
    }, 1600)
  })

  return bottom <= 20
}
