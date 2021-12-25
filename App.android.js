/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-25 22:19:05
 */
import '@utils/thirdParty/stable-sort'
import React, { useEffect } from 'react'
import { Alert } from 'react-native'
import * as ReactNativeScreens from 'react-native-screens'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import RNRestart from 'react-native-restart'
import {
  setJSExceptionHandler,
  setNativeExceptionHandler
} from 'react-native-exception-handler'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import Provider from '@ant-design/react-native/lib/provider'
import { DeepLink, BackAndroid } from '@components'
import { AppCommon } from '@screens/_'
import Stores, { _ } from '@stores'
import { bootApp } from '@utils/app'
import {
  useBoolean,
  // useShortcuts,
  useKeepAwake,
  useOrientation
} from '@utils/hooks'
import { t } from '@utils/fetch'
import { getUserStoreAsync } from '@utils/async'
import theme from '@styles/theme'
import { createNavigator } from './src/navigations/index'

export default function App() {
  const isLoadingComplete = useBootApp()
  // useShortcuts()
  useKeepAwake()
  const orientation = useOrientation()
  useEffect(() => {
    _.toggleOrientation(orientation)
  }, [orientation])
  if (!isLoadingComplete) return null

  return (
    <SafeAreaProvider style={_.container.flex}>
      <Provider theme={theme}>{createNavigator()}</Provider>
      <BackAndroid />
      <DeepLink />
      <AppCommon />
    </SafeAreaProvider>
  )
}

function useBootApp() {
  const { state, setTrue } = useBoolean(false)
  useEffect(() => {
    ;(async function () {
      try {
        // 保持启动屏
        SplashScreen.preventAutoHideAsync()

        // App初始化
        bootApp()

        // 加载bgm表情特殊字体
        await Font.loadAsync({
          bgm: require('@assets/fonts/AppleColorEmoji.ttf')
        })

        // Stores初始化
        await Stores.init()

        // enableScreens
        ReactNativeScreens.enableScreens(true)
      } catch (ex) {
      } finally {
        setTrue()

        // 隐藏启动屏
        SplashScreen.hideAsync()
      }
    })()

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
