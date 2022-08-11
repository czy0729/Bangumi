/*
 * @Author: czy0729
 * @Date: 2022-03-07 15:18:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-11 10:47:03
 */
import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import Stores from '@stores'
import useBoolean from './useBoolean'
import { bootApp } from '../app'

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
        await Stores.init()

        // 加载bgm表情特殊字体
        await Font.loadAsync({
          bgm: require('@assets/fonts/AppleColorEmoji.ttf'),
          rhrm: require('@assets/fonts/ResourceHanRoundedCN-Medium.ttf'),
          rhrb: require('@assets/fonts/ResourceHanRoundedCN-Bold.ttf')
        })
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
