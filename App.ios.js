/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-28 20:21:48
 */
import React, { useEffect } from 'react'
import * as ReactNativeScreens from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import Provider from '@ant-design/react-native/lib/provider'
import { DeepLink } from '@components'
import { HoldMenuProvider } from '@components/@/react-native-hold-menu'
import { AppCommon } from '@screens/_'
import Stores, { _ } from '@stores'
import { bootApp } from '@utils/app'
import { useBoolean, useOrientation } from '@utils/hooks'
import theme from '@styles/theme'
import { createNavigator } from './src/navigations/index'

ReactNativeScreens.enableScreens()

export default function App() {
  const isLoadingComplete = useCachedResources()
  const orientation = useOrientation()
  useEffect(() => {
    _.toggleOrientation(orientation)
  }, [orientation])
  if (!isLoadingComplete) return null

  return (
    <SafeAreaProvider style={_.container.flex}>
      <Provider theme={theme}>
        <HoldMenuProvider>{createNavigator()}</HoldMenuProvider>
        <DeepLink />
        <AppCommon />
      </Provider>
    </SafeAreaProvider>
  )
}

function useCachedResources() {
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
