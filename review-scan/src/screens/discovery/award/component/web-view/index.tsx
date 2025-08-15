/*
 * @Author: czy0729
 * @Date: 2023-10-21 17:09:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-13 20:34:56
 */
import React from 'react'
import WebViewComp from 'react-native-webview'
import { SafeAreaView } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { IOS } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

function WebView({ year, source, ...other }) {
  r(COMPONENT)

  const showInset = year == '2023'
  return (
    <SafeAreaView
      // 安卓不知道为什么 SafeAreaView 无效, 手写一个距离
      style={
        showInset &&
        !IOS && {
          marginTop: _.statusBarHeight + 1
        }
      }
      forceInset={{
        top: showInset ? 'always' : 'never',
        bottom: 'never'
      }}
    >
      <WebViewComp
        style={styles.webView}
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
