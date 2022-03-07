/*
 * @Author: czy0729
 * @Date: 2022-03-07 15:18:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-07 15:21:33
 */
import { useEffect } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import Stores from '@stores'
import { bootApp } from '@utils/app'
import useBoolean from './useBoolean'

export default function useCachedResources() {
  const { state, setTrue } = useBoolean(false)
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()
        bootApp()
        await Font.loadAsync({
          bgm: require('@assets/fonts/AppleColorEmoji.ttf')
        })
        await Stores.init()
      } catch (e) {
        console.warn(e)
      } finally {
        setTrue()
        SplashScreen.hideAsync()
      }
    }

    loadResourcesAndDataAsync()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return state
}
