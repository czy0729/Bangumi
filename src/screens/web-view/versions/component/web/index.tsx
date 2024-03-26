/*
 * @Author: czy0729
 * @Date: 2023-06-23 03:58:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-22 11:26:40
 */
import React from 'react'
import WebView from 'react-native-webview'
import { Loading, Text } from '@components'
import { SafeAreaView } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { HTML_SINGLE_DOC } from '@constants'
import { injectedJavaScript } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Web({ uri }) {
  r(COMPONENT)

  const { state, setTrue } = useBoolean(false)
  return useObserver(() => {
    const styles = memoStyles()
    const html = HTML_SINGLE_DOC(uri)
    return (
      <SafeAreaView style={styles.webview}>
        {!state && (
          <Loading style={styles.loading}>
            <Text style={[styles.text, _.mt.md]} type='sub' size={13} align='center'>
              正在加载网页...
            </Text>
            <Text style={styles.text} type='sub' size={11} align='center'>
              {html}
            </Text>
          </Loading>
        )}
        <WebView
          style={{
            backgroundColor: _.colorPlain,
            opacity: state ? 1 : 0
          }}
          originWhitelist={['*']}
          source={{
            uri: html
          }}
          // androidHardwareAccelerationDisabled
          // androidLayerType='software'
          injectedJavaScript={injectedJavaScript()}
          bounces={false}
          onLoadEnd={() => {
            setTimeout(() => {
              setTrue()
            }, 1000)
          }}
        />
      </SafeAreaView>
    )
  })
}

export default Web
