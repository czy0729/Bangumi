/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-16 14:20:32
 */
import React, { useEffect } from 'react'
import { View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import Provider from '@ant-design/react-native/lib/provider'
import { DeepLink } from '@components'
import { AppCommon } from '@screens/_'
import Stores, { _ } from '@stores'
import { bootApp } from '@utils/app'
import { useBoolean } from '@utils/hooks'
import theme from '@styles/theme'
import Navigations from './src/navigations/index'

export default function App() {
  const isLoadingComplete = useCachedResources()
  if (!isLoadingComplete) {
    return null
  }

  return (
    <View style={_.container.flex}>
      <Provider theme={theme}>
        <Navigations />
        <AppCommon />
      </Provider>
      <DeepLink />
    </View>
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
  }, [])

  return state
}
