/*
 * @Author: czy0729
 * @Date: 2023-10-21 17:09:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 19:28:29
 */
import React from 'react'
import WebViewComp from 'react-native-webview'
import { SafeAreaView } from '@_'
import { r } from '@utils/dev'
import { useInsets } from '@utils/hooks'
import { IOS } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

function WebView({ year, source, ...other }) {
  r(COMPONENT)

  const { statusBarHeight } = useInsets()

  const showInset = year == '2023'

  return (
    <SafeAreaView
      // 安卓不知道为什么 SafeAreaView 无效, 手写一个距离
      style={
        showInset &&
        !IOS && {
          marginTop: statusBarHeight + 1
        }
      }
      forceInset={{
        top: showInset ? 'always' : 'never',
        bottom: 'never'
      }}
    >
      <WebViewComp
        style={[
          styles.webView,
          {
            paddingTop: statusBarHeight
          }
        ]}
        useWebKit
        thirdPartyCookiesEnabled={false}
        originWhitelist={['*']}
        source={source}
        {...other}
      />
    </SafeAreaView>
  )
}

export default WebView
