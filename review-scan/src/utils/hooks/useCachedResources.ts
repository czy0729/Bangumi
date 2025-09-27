/*
 * @Author: czy0729
 * @Date: 2022-03-07 15:18:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-09 20:19:38
 */
import { useState } from 'react'
import { loadAsync } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { devLog } from '@components/dev'
import { setComponentsDefaultProps } from '@components/text/utils'
import Stores from '@stores'
import { bootApp } from '../app'
import useMount from './useMount'

async function loadBaseFontsAsync() {
  return loadAsync({
    bgm: require('@assets/fonts/Bgm.ttf')
  })
}

let loadAppFontsAsyncLoaded: boolean

export function loadAppFontsAsync() {
  if (loadAppFontsAsyncLoaded) return true

  loadAppFontsAsyncLoaded = true
  return loadAsync({
    rhrm: require('@assets/fonts/ResourceHanRoundedCN-Medium.ttf'),
    rhrb: require('@assets/fonts/ResourceHanRoundedCN-Bold.ttf')
  })
}

type LoadingResult = 0 | 1 | 2 | 3 | 99

export default function useCachedResources() {
  // 保持启动屏
  SplashScreen.preventAutoHideAsync()

  const [state, setState] = useState<LoadingResult>(0)
  useMount(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // App 初始化
        bootApp()

        // Stores 初始化
        const settings = await Stores.init()
        setState(1)

        // 加载 bgm 表情特殊字体
        await loadBaseFontsAsync()
        setState(2)

        // 加载字体
        if (typeof settings === 'object' && !settings.customFontFamily) {
          await loadAppFontsAsync()
        }
        setState(3)

        setTimeout(() => {
          setComponentsDefaultProps()
        }, 0)
      } catch (e) {
        devLog(String(e))
        setState(99)
      }
    }
    loadResourcesAndDataAsync()
  })

  return state
}
