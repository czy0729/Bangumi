/*
 * @Author: czy0729
 * @Date: 2023-10-21 17:09:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-12 03:58:17
 */
import React from 'react'
import WebViewComp from 'react-native-webview'
import { SafeAreaView } from '@_'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'

function WebView({ year, source, ...other }) {
  r(COMPONENT)

  return (
    <SafeAreaView
      forceInset={{
        top: year == '2023' ? 'always' : 'never',
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
