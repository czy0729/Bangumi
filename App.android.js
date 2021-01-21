/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 17:15:34
 */
import React, { useEffect } from 'react'
import { Alert, View } from 'react-native'
import RNRestart from 'react-native-restart'
import {
  setJSExceptionHandler,
  setNativeExceptionHandler
} from 'react-native-exception-handler'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { Provider } from '@ant-design/react-native'
import { DeepLink, BackAndroid } from '@components'
import { AppCommon } from '@screens/_'
import Stores, { _ } from '@stores'
import { bootApp } from '@utils/app'
import { useBoolean } from '@utils/hooks'
import { t } from '@utils/fetch'
import { getUserStoreAsync } from '@utils/async'
import theme from '@styles/theme'
import Navigations from './src/navigations/index'

bootApp()

export default function App() {
  const isLoadingComplete = useCachedResources()
  if (!isLoadingComplete) {
    return null
  }

  return (
    <View style={_.container.flex}>
      <Provider theme={theme}>
        <Navigations />
      </Provider>
      <BackAndroid />
      <DeepLink />
      <AppCommon />
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

/**
 * 崩溃处理
 * @param {*} e
 * @param {*} isFatal
 */
function errorHandler(e, isFatal) {
  if (isFatal) {
    Alert.alert(
      'Unexpected error occurred',
      `
        Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}

        We will need to restart the app.
        `,
      [
        {
          text: '重启',
          onPress: () => {
            RNRestart.Restart()
          }
        }
      ]
    )

    const userStore = getUserStoreAsync()
    t('其他.崩溃', {
      error: `${e.name} ${e.message}`,
      id: userStore.myId || ''
    })
  }
}

setJSExceptionHandler(errorHandler)

setNativeExceptionHandler(() => {})
