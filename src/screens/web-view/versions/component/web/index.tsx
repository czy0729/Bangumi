/*
 * @Author: czy0729
 * @Date: 2023-06-23 03:58:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-08 17:52:10
 */
import React from 'react'
import WebView from 'react-native-webview'
import { Loading } from '@components'
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
    return (
      <SafeAreaView style={styles.webview}>
        {!state && <Loading style={styles.loading} />}
        <WebView
          style={{
            backgroundColor: _.colorPlain,
            opacity: state ? 1 : 0
          }}
          originWhitelist={['*']}
          source={{
            uri: HTML_SINGLE_DOC(uri)
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
