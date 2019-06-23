/* eslint-disable max-len */
/*
 * 更沉浸的Bgm年鉴
 * @Author: czy0729
 * @Date: 2019-05-29 19:37:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-23 11:41:04
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Loading, WebView as CompWebView } from '@components'
import { StatusBar } from '@screens/_'
import { withHeader, observer } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import { info } from '@utils/ui'
import { analysis } from '@utils/fetch'
import { userStore } from '@stores'
import _ from '@styles'

const title = '18年鉴'
const redirectMaxCount = 8 // 最大跳转次数

export default
@withHeader()
@observer
class Award extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    loading: true
  }

  loaded = false // 是否已到达目的页面
  redirectCount = 0 // 跳转次数

  componentDidMount() {
    analysis('award/2018', title)
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
        case 'onclick':
          if (data && data.href) {
            appNavigate(data.href, navigation)
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
    const widthSubject = parseInt((_.window.width - 24) / 3)
    const widthMono = parseInt((_.window.width - 48) / 4)
    const heightMono = widthMono * 1.2
    const injectedJavaScript = `(function(){
      // 注入cookie
      document.cookie = '${cookie}';

      // 为了美观, 修改条目宽度, 每行达到3个
      var styleSubject = document.createElement("style");
      try {
        styleSubject.appendChild(document.createTextNode(".channelStatsWrapper .columnGrid ul.grid li span.cover,.channelStatsWrapper .columnGrid ul.grid li span.cover span.overlay{width:${widthSubject}px !important;height:${widthSubject}px !important;}"));
      } catch(ex){
      }
      document.body.append(styleSubject);

      // 为了美观, 修改人物宽度, 每行达到4个
      var styleSubject = document.createElement("style");
      try {
        styleSubject.appendChild(document.createTextNode(".columnGrid ul.grid li.avatar{width:${widthMono}px !important;height:${heightMono}px !important;}"));
      } catch(ex){
      }
      document.body.append(styleSubject);

      // 隐藏部分样式, 使页面更沉浸
      var styleDeep = document.createElement("style");
      try {
        styleDeep.appendChild(document.createTextNode("#headerNeue2, #personalTabStats, .shareBtn, #dock{display:none !important}"));
      } catch(ex){
      }
      document.body.append(styleDeep);

      // webview的postMessage不是马上生效的
      var __isBridgeOk = false
      function waitForBridge() {
        if (!__isBridgeOk && window.postMessage.length !== 1) {
          setTimeout(waitForBridge, 200);
        } else {
          __isBridgeOk = true

          // onload
          window.postMessage(JSON.stringify({
            type: 'onload',
            data: {
              href: document.location.href,
            }
          }));

          setTimeout(() => {
            // 插入cookie不会马上生效, 某些页面没有cookie不能访问, 会自动跳转
            // 一直循环跳转直到目标页面的url和预定的一致时, 再设置显示标志
            const loaded = ${this.loaded};
            if (!loaded && window.location.href !== '${uri}') {
              if (${this.redirectCount} < ${redirectMaxCount}) {
                window.location = '${uri}';
              }
            }

            // 由于现在安卓的webview没有能阻止跳转的办法, 把href抹掉后加postMessage解决
            var aNodes = document.getElementsByTagName('a');
            for (let i = 0; i < aNodes.length; i++) {
              let href = aNodes[i].href;
              if (href) {
                aNodes[i].setAttribute('data-href', aNodes[i].href);
                aNodes[i].removeAttribute('href');
                aNodes[i].addEventListener('click', function () {
                  window.postMessage(JSON.stringify({
                    type: 'onclick',
                    data: {
                      href: href,
                    }
                  }));
                })
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
      <View style={[_.container.flex, styles.dark]}>
        <StatusBar barStyle='light-content' />
        {loading && (
          <Loading
            style={[
              {
                ...StyleSheet.absoluteFill,
                zIndex: 1
              },
              styles.dark
            ]}
            color={_.colorPlain}
          />
        )}
        <CompWebView
          ref={ref => {
            this.WebView = ref
          }}
          style={[
            styles.dark,
            {
              paddingTop: _.statusBarHeight
            }
          ]}
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

const styles = StyleSheet.create({
  dark: {
    backgroundColor: 'rgb(0, 0, 0)'
  }
})
