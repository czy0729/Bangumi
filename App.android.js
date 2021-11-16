/*
 * @Author: czy0729
 * @Date: 2019-03-30 19:25:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-17 01:59:21
 */
import React, { useState, useEffect, useCallback } from 'react'
import { NativeEventEmitter, Alert, Clipboard } from 'react-native'
import Shortcuts from 'react-native-actions-shortcuts'
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
import Stores, { _, systemStore } from '@stores'
import { bootApp, navigationReference, appNavigate } from '@utils/app'
import { useBoolean } from '@utils/hooks'
import { t } from '@utils/fetch'
import { getUserStoreAsync } from '@utils/async'
import { matchBgmUrl } from '@utils/match'
import { info } from '@utils/ui'
import theme from '@styles/theme'
import Navigations from './src/navigations/index'

export default function App() {
  const isLoadingComplete = useBootApp()
  useShortcuts()
  if (!isLoadingComplete) return null

  return (
    <SafeAreaProvider style={_.container.flex}>
      <Provider theme={theme}>
        <Navigations />
      </Provider>
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

function useShortcuts() {
  useEffect(() => {
    setTimeout(() => {
      const shortcutsItems = [
        {
          type: 'Search',
          title: '搜索',
          iconName: 'md_search',
          data: {}
        },
        {
          type: 'Calendar',
          title: '每日放送',
          iconName: 'md_calendar',
          data: {}
        },
        {
          type: 'Link',
          title: '剪贴板',
          iconName: 'md_link',
          data: {}
        }
      ]

      if (systemStore.setting.tinygrail) {
        shortcutsItems.push({
          type: 'Tinygrail',
          title: '小圣杯',
          iconName: 'md_trophy',
          data: {}
        })
      }

      console.log(shortcutsItems)
      Shortcuts.setShortcuts(shortcutsItems.reverse())
    }, 8000)
  }, [])

  useEffect(() => {
    const ShortcutsEmitter = new NativeEventEmitter(Shortcuts)
    const listener = item => {
      const navigation = navigationReference()
      if (!navigation) {
        return setTimeout(() => {
          listener(item)
        }, 300)
      }

      const { type, data } = item || {}
      if (type === 'Link') {
        // @issue 打开APP瞬间剪贴板读不到内容, 需要延迟
        setTimeout(async () => {
          const content = await Clipboard.getString()
          const urls = matchBgmUrl(content, true) || []
          const url = urls[0]
          if (!url) {
            info('没有检测到链接')
            return
          }

          appNavigate(url, navigation)
        }, 400)
      } else {
        navigation.push(type)
      }
    }

    ;(async function () {
      listener(await Shortcuts.getInitialShortcut())

      ShortcutsEmitter.addListener('onShortcutItemPressed', listener)
    })()

    return () => ShortcutsEmitter.removeListener('onShortcutItemPressed', listener)
  }, [])
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
