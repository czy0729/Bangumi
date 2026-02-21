/*
 * @Author: czy0729
 * @Date: 2023-10-21 17:09:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-14 19:13:30
 */
import React from 'react'
import WebViewComp from 'react-native-webview'
import { SafeAreaView } from '@_'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useInsets, useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

function WebView({ year, source, ...other }) {
  r(COMPONENT)

  const { statusBarHeight, bottom } = useInsets()

  return useObserver(() => {
    // 安卓不知道为什么 SafeAreaView 无效, 手写一个距离
    const showStatusBar = !IOS && (year == '2023' || year == '2025')
    const showBottom = year == '2025'

    return (
      <SafeAreaView
        style={stl(
          showStatusBar && {
            marginTop: statusBarHeight + 1
          },
          showBottom && {
            marginBottom: bottom
          }
        )}
        forceInset={{
          top: showStatusBar ? 'always' : 'never',
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
          allowFileAccess
          thirdPartyCookiesEnabled={false}
          originWhitelist={['*']}
          source={source}
          androidLayerType='hardware'
          {...other}
        />
      </SafeAreaView>
    )
  })
}

export default WebView
