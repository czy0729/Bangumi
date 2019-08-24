/*
 * Oauth获取用户accessToken
 * 过程中捕获用户cookie
 * @Author: czy0729
 * @Date: 2019-03-31 11:21:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-24 13:56:04
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { WebView, Flex, Image, Button, Loading, Text } from '@components'
import { StatusBar, StatusBarPlaceholder } from '@screens/_'
import { urlStringify } from '@utils'
import { info } from '@utils/ui'
import { hm } from '@utils/fetch'
import { IOS, APP_ID, HOST, OAUTH_URL, OAUTH_REDIRECT_URL } from '@constants'
import { userStore } from '@stores'
import _ from '@styles'

const title = '登陆'
const uri = `${OAUTH_URL}?${urlStringify({
  response_type: 'code',
  client_id: APP_ID,
  redirect_uri: OAUTH_REDIRECT_URL
})}`
const injectedJavaScript = `(function(){
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
          userAgent: navigator.userAgent,
          cookie: document.cookie
        }
      }));
    }
  }
  setTimeout(() => { waitForBridge() }, 0);
}());`

export default class Login extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    clicked: false,
    refreshed: false
  }

  componentDidMount() {
    hm('login', title)
  }

  onTour = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  onLogin = () => {
    this.setState({
      clicked: true
    })
  }

  onMessage = async event => {
    try {
      const { type, data } = JSON.parse(event.nativeEvent.data)
      switch (type) {
        case 'onload':
          if (data) {
            if (data.href.indexOf(`${HOST}/login?`) !== -1) {
              // do nothing
            } else if (data.href.indexOf(`${OAUTH_URL}?`) !== -1) {
              // @issue 首次登陆跳转后redirect_uri丢失了, 不清楚是什么问题
              // 这个时候刷新当前页面就回到正常的页面?
              if (data.href.indexOf('redirect_uri') === -1) {
                // @issue 安卓登陆后全过程能拿到完整的cookie, 但是iOS不清除是什么问题
                // 只有这个报错的节点能找到chii_auth, 所以在这里捕获用户cookie
                this.updateUserCookie(data)
                this.refreshWebView()
              }
            } else if (
              data.href.indexOf(`${OAUTH_REDIRECT_URL}/?code=`) !== -1
            ) {
              // 得到code之后获取access_token
              this.doLogin(data)
            } else {
              setTimeout(() => {
                this.onOtherPage()
              }, 1600)
            }
          }
          break
        default:
          break
      }
    } catch (ex) {
      // do nothing
    }
  }

  onError = () => {
    info('网络似乎出了点问题')
    this.setState({
      clicked: false
    })
  }

  onOtherPage = () => {
    info('授权过程中不要随便乱逛>.<')
    this.setState({
      clicked: false
    })
  }

  refreshWebView = () => {
    this.setState({
      refreshed: true
    })
    setTimeout(() => {
      this.setState({
        refreshed: false
      })
    }, 800)
  }

  /**
   * 要传递v=1区分版本, 当iOS端v=1的时候, html都不使用https
   */
  updateUserCookie = ({ userAgent, cookie }) =>
    userStore.updateUserCookie({
      userAgent,
      cookie,
      v: 1
    })

  doLogin = async ({ href = '' } = {}) => {
    const { navigation } = this.props
    const code = href.replace(`${HOST}/?code=`, '')
    try {
      info('获取token中, 请稍等...')
      await userStore.fetchAccessToken(code)
    } catch (ex) {
      this.setState({
        clicked: false
      })
      return
    }

    await userStore.fetchUserInfo()
    await userStore.fetchUsersInfo()
    navigation.popToTop()
  }

  renderPreview() {
    return (
      <View style={[_.container.column, styles.gray]}>
        <Image
          style={styles.gray}
          width={160}
          height={128}
          src={require('@assets/screens/login/login.png')}
        />
        <View style={[styles.bottomContainer, _.mt.md]}>
          <Button type='main' shadow onPress={this.onLogin}>
            授权登陆
          </Button>
          <Button style={_.mt.md} type='plain' shadow onPress={this.onTour}>
            游客访问
          </Button>
        </View>
      </View>
    )
  }

  renderLoading() {
    return (
      <View style={[_.container.column, styles.gray]}>
        <Image
          style={styles.gray}
          width={160}
          height={128}
          src={require('@assets/screens/login/login.png')}
        />
        <View style={[styles.bottomContainer, _.mt.md]}>
          <Flex style={styles.loading} direction='column' justify='center'>
            <Loading.Raw color={_.colorMain} />
            <Text style={_.mt.md} size={12} type='main'>
              网页加载中, 请稍等
            </Text>
          </Flex>
        </View>
      </View>
    )
  }

  renderWebView() {
    const { refreshed } = this.state
    if (refreshed) {
      return null
    }
    return (
      <WebView
        ref={ref => (this.ref = ref)}
        uri={uri}
        javaScriptEnabled
        injectedJavaScript={injectedJavaScript}
        startInLoadingState
        thirdPartyCookiesEnabled={!IOS}
        mixedContentMode='always'
        renderLoading={() => this.renderLoading()}
        onError={this.onError}
        onMessage={this.onMessage}
      />
    )
  }

  render() {
    const { clicked } = this.state
    return (
      <View style={[_.container.flex, styles.gray]}>
        <StatusBar />
        <StatusBarPlaceholder style={styles.gray} />
        <View style={_.container.flex}>
          {clicked ? this.renderWebView() : this.renderPreview()}
        </View>
        {!clicked && (
          <Text style={styles.ps} size={12} type='sub'>
            PS: 若登陆过程中出现问题, 请手动把授权网页里面的Bangumi账号登出,
            不然可能会出现cookie过期的情况.
          </Text>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  gray: {
    backgroundColor: 'rgb(251, 251, 251)'
  },
  bottomContainer: {
    width: 280,
    height: 350
  },
  loading: {
    width: 280,
    height: 64
  },
  ps: {
    position: 'absolute',
    right: _.wind * 2,
    bottom: _.bottom,
    left: _.wind * 2
  }
})
