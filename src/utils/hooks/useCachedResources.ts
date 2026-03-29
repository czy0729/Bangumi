/*
 * @Author: czy0729
 * @Date: 2022-03-07 15:18:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-28 21:42:26
 */
import { useState } from 'react'
import { loadAsync } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { devLog } from '@components/dev'
import { setComponentsDefaultProps } from '@components/text/utils'
import Stores from '@stores'
import { postTask } from '@utils'
import { bootApp } from '../app'
import useMount from './useMount'

async function loadBaseFonts() {
  await loadAsync({
    bgm: require('@assets/fonts/BgmV3_1.ttf')
  })
  await loadAsync({
    bgm2: require('@assets/fonts/BgmV3_2.ttf'),
    bgm3: require('@assets/fonts/BgmV3_3.ttf')
  })

  return true
}

let loadAppFontsLoaded: boolean

export async function loadAppFonts() {
  if (loadAppFontsLoaded) return true

  loadAppFontsLoaded = true
  await loadAsync({
    rhrm: require('@assets/fonts/ResourceHanRoundedCN-Medium.ttf'),
    rhrb: require('@assets/fonts/ResourceHanRoundedCN-Bold.ttf')
  })

  return true
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
        postTask(() => {
          loadBaseFonts()
        })
        setState(2)

        // 加载字体
        if (typeof settings === 'object' && !settings.customFontFamily) {
          await loadAppFonts()
        }
        setState(3)

        postTask(() => {
          setComponentsDefaultProps()
        })
      } catch (e) {
        devLog(String(e))
        setState(99)
      }
    }
    loadResourcesAndDataAsync()
  })

  return state
}
