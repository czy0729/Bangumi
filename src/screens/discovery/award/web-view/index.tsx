/*
 * @Author: czy0729
 * @Date: 2023-10-21 17:09:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-10-21 17:18:48
 */
import React from 'react'
import WebViewComp from '@components/@/web-view'
import { styles } from './styles'

const originWhitelist = ['*'] as const

function WebView({ source, ...other }) {
  return (
    <WebViewComp
      style={styles.webView}
      useWebKit
      thirdPartyCookiesEnabled={false}
      originWhitelist={originWhitelist}
      source={source}
      {...other}
    />
  )
}

export default WebView
