/*
 * @Author: czy0729
 * @Date: 2023-10-21 17:09:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 10:10:00
 *
 * 承载年鉴 html 的 webview
 */
import WebViewComp from 'react-native-webview'
import { observer } from 'mobx-react'
import { SafeAreaView } from '@_'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useInsets } from '@utils/hooks'
import { IOS } from '@constants'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function WebView({ year, source, ...other }: Props) {
  r(COMPONENT)

  const { statusBarHeight, bottom } = useInsets()

  const showStatusBar = !IOS && (year === '2023' || year === '2025')
  const showBottom = year === '2025'

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
        style={stl(styles.webView, {
          paddingTop: statusBarHeight
        })}
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
}

export default observer(WebView)
