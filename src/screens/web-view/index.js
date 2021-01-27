/*
 * WebView
 * 某些需要登陆的页面会自动跳走, 通过改变页面cookie和重定向, 实现同步cookie
 * @Author: czy0729
 * @Date: 2019-05-19 22:56:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:03:27
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Loading, WebView as CompWebView } from '@components'
import { IconBack } from '@screens/_'
import { _, userStore } from '@stores'
import { open } from '@utils'
import { withHeader, ob } from '@utils/decorators'
import { info } from '@utils/ui'
import { hm } from '@utils/fetch'
import { SDK, HOST_NAME } from '@constants'

const title = '浏览器'
const redirectMaxCount = 8 // 最大跳转次数

export default
@withHeader({
  screen: title
})
@ob
class WebView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('title') || HOST_NAME,
    headerLeft: <IconBack navigation={navigation} color={_.colorTitle} />
  })

  state = {
    loading: true
  }

  loaded = false // 是否已到达目的页面
  redirectCount = 0 // 跳转次数

  componentDidMount() {
    const { navigation } = this.props
    const uri = navigation.getParam('uri')
    const params = {
      popover: {
        data: ['浏览器查看'],
        onSelect: key => {
          switch (key) {
            case '浏览器查看':
              open(uri)
              break
            default:
              break
          }
        }
      }
    }
    navigation.setParams(params)

    hm(uri, 'WebView')
  }

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
              this.loaded = true
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
        if (!__isBridgeOk && window${
          SDK >= 36 ? '.ReactNativeWebView' : ''
        }.postMessage) {
          setTimeout(waitForBridge, 200);
        } else {
          __isBridgeOk = true
          window${
            SDK >= 36 ? '.ReactNativeWebView' : ''
          }.postMessage(JSON.stringify({
            type: 'onload',
            data: {
              href: document.location.href,
            }
          }));

          setTimeout(() => {
            const loaded = ${this.loaded};
            if (!loaded && window.location.href !== '${uri}') {
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
