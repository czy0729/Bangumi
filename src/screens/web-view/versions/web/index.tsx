/*
 * @Author: czy0729
 * @Date: 2023-06-23 03:58:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-23 06:16:20
 */
import React from 'react'
import { Loading } from '@components'
import WebView from '@components/@/web-view'
import { SafeAreaView } from '@_'
import { _ } from '@stores'
import { useBoolean } from '@utils/hooks'
import { injectedJavaScript } from './utils'

function Web({ uri }) {
  const { state, setTrue } = useBoolean(false)
  return (
    <SafeAreaView
      style={[
        _.container.flex,
        {
          backgroundColor: _.colorPlain
        }
      ]}
    >
      {!state && <Loading style={_.mt.lg} />}
      <WebView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          backgroundColor: _.colorPlain,
          opacity: state ? 1 : 0
        }}
        originWhitelist={['*']}
        source={{
          uri: `https://www.yuque.com/chenzhenyu-k0epm/znygb4/${uri}?singleDoc`
        }}
        androidHardwareAccelerationDisabled
        androidLayerType='software'
        javaScriptEnabled
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
}

export default Web
