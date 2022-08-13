/*
 * @Author: czy0729
 * @Date: 2022-03-07 15:18:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 08:39:41
 */
import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { setComponentsDefaultProps } from '@components/text/utils'
import Stores from '@stores'
import useBoolean from './useBoolean'
import { bootApp } from '../app'

function loadBaseFontsAsync() {
  return Font.loadAsync({
    bgm: require('@assets/fonts/AppleColorEmoji.ttf')
  })
}

let loadAppFontsAsyncLoaded: boolean

export function loadAppFontsAsync() {
  if (loadAppFontsAsyncLoaded) return true

  loadAppFontsAsyncLoaded = true
  return Font.loadAsync({
    rhrm: require('@assets/fonts/ResourceHanRoundedCN-Medium.ttf'),
    rhrb: require('@assets/fonts/ResourceHanRoundedCN-Bold.ttf')
  })
}

export default function useCachedResources() {
  const { state, setTrue } = useBoolean(false)
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // 保持启动屏
        SplashScreen.preventAutoHideAsync()

        // App初始化
        bootApp()

        // Stores初始化
        const settings = await Stores.init()

        // 加载 bgm 表情特殊字体
        await loadBaseFontsAsync()
        if (settings && !settings.customFontFamily) await loadAppFontsAsync()

        setComponentsDefaultProps()
      } catch (e) {
      } finally {
        setTrue()

        // 隐藏启动屏
        SplashScreen.hideAsync()
      }
    }
    loadResourcesAndDataAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}
