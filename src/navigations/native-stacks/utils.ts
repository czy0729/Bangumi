/*
 * @Author: czy0729
 * @Date: 2023-08-14 04:14:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-13 16:56:03
 */
import { useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import { _ } from '@stores'
import { urlStringify } from '@utils'
import { useMount } from '@utils/hooks'
import { IOS } from '@constants'

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
    }, 2000)
  })

  return bottom <= 20
}

/** 构建页面参数 */
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
export function getId({ params }) {
  return params ? urlStringify(params) : undefined
}

function convertToPath(inputStr: string): string {
  const convertedStr = inputStr.replace(/([A-Z])/g, '/$1').toLowerCase()
  return convertedStr.startsWith('/') ? convertedStr.slice(1) : convertedStr
}
