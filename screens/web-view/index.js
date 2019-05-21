/*
 * WebView
 * 某些需要登录的页面会自动跳走, 通过改变页面cookie和重定向, 实现同步cookie
 * @Author: czy0729
 * @Date: 2019-05-19 22:56:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-21 16:44:09
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Loading, WebView as CompWebView } from '@components'
import { IconBack } from '@screens/_'
import { observer } from '@utils/decorators'
import { info } from '@utils/ui'
import { HOST_NAME } from '@constants'
import { userStore } from '@stores'
import _ from '@styles'

const redirectMaxCount = 8

export default
@observer
class WebView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title') || HOST_NAME,
    headerLeft: <IconBack navigation={navigation} color={_.colorTitle} />
  })

  state = {
    loading: true
  }

  redirectCount = 0

  onError = () => {
    const { navigation } = this.props
    info('网络似乎出了点问题')
    navigation.goBack()
  }

  onMessage = async event => {
    const { navigation } = this.props
    const uri = navigation.getParam('uri')
    try {
      const { type, data } = JSON.parse(event.nativeEvent.data)
      switch (type) {
        case 'onload':
          if (data) {
            if (data.href !== uri) {
              this.redirectCount += 1
              if (this.redirectCount > redirectMaxCount) {
                this.onError()
              }
            } else {
              this.setState({
                loading: false
              })
            }
          }
          break
        default:
          break
      }
    } catch (ex) {
      this.onError()
    }
  }

  render() {
    const { cookie } = userStore.userCookie
    const { navigation } = this.props
    const uri = navigation.getParam('uri')
    const { loading } = this.state
    const injectedJavaScript = `(function(){
      document.cookie = '${cookie}';

      var __isBridgeOk = false
      function waitForBridge() {
        if (!__isBridgeOk && window.postMessage.length !== 1) {
          setTimeout(waitForBridge, 200);
        } else {
          __isBridgeOk = true
          window.postMessage(JSON.stringify({
            type: 'onload',
            data: {
              href: document.location.href,
            }
          }));

          setTimeout(() => {
            if (window.location.href !== '${uri}') {
              if (${this.redirectCount} < ${redirectMaxCount}) {
                window.location = '${uri}';
              }
            }
          }, 0);
        }
      }
      setTimeout(() => { 
        waitForBridge();
      }, 0);
    }());`
    return (
      <View style={_.container.flex}>
        {loading && (
          <Loading
            style={{
              ...StyleSheet.absoluteFill,
              zIndex: 1,
              backgroundColor: _.colorBg
            }}
            color={_.colorMain}
          />
        )}
        <CompWebView
          uri={uri}
          thirdPartyCookiesEnabled
          injectedJavaScript={injectedJavaScript}
          onError={this.onError}
          onMessage={this.onMessage}
        />
      </View>
    )
  }
}
