/* eslint-disable no-useless-escape */
/*
 * @Author: czy0729
 * @Date: 2019-04-13 10:38:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-13 15:49:27
 */
import React from 'react'
import { WebView as RNWebView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { userStore } from '@stores'
import { getCookie } from '@utils/app'
import _ from '@styles'

const injectedJavaScript = `(function(){
  if(window.postMessage) {
    window.postMessage(JSON.stringify({
      type: 'cookie',
      data: document.cookie
    }));
  }
}());`

export default class WebView extends React.Component {
  componentDidMount() {}

  onMessage = event => {
    try {
      const { type, data } = JSON.parse(event.nativeEvent.data)
      let _data
      switch (type) {
        case 'cookie':
          _data = getCookie(data, 'chii_auth')
          if (_data) {
            userStore.updateUserCookie(data)
          }
          break
        default:
          break
      }
    } catch (ex) {
      // do nothing
    }
  }

  render() {
    return (
      <SafeAreaView style={_.container.flex}>
        <RNWebView
          useWebKit
          source={{ uri: 'https://bangumi.tv/timeline' }}
          injectedJavaScript={injectedJavaScript}
          javaScriptEnabled
          onMessage={this.onMessage}
        />
      </SafeAreaView>
    )
  }
}
