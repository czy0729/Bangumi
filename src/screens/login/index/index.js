/*
 * Oauth获取用户accessToken
 * 过程中捕获用户cookie
 * @Author: czy0729
 * @Date: 2019-03-31 11:21:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-27 14:15:52
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import {
  TITLE,
  StatusBarEvents,
  WebView,
  Flex,
  Image,
  Button,
  Loading,
  Text,
  Mesume,
  UM
} from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import { _, userStore } from '@stores'
import { urlStringify } from '@utils'
import { info } from '@utils/ui'
import { hm, t } from '@utils/fetch'
import { HTMLTrim } from '@utils/html'
import {
  SDK,
  IOS,
  APP_ID,
  HOST,
  URL_OAUTH,
  URL_OAUTH_REDIRECT
} from '@constants'

const title = '登陆V1'
const uri = `${URL_OAUTH}?${urlStringify({
  response_type: 'code',
  client_id: APP_ID,
  redirect_uri: URL_OAUTH_REDIRECT
})}`

export default
@observer
class Login extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    clicked: false,
    refreshed: false
  }

  componentDidMount() {
    hm('login', 'Login')
  }

  onTour = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  onLogin = () => {
    t('授权登陆.登陆')

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
            } else if (data.href.indexOf(`${URL_OAUTH}?`) !== -1) {
              // @issue 首次登陆跳转后redirect_uri丢失了, 不清楚是什么问题
              // 这个时候刷新当前页面就回到正常的页面?
              if (data.href.indexOf('redirect_uri') === -1) {
                // @issue 安卓登陆后全过程能拿到完整的cookie, 但是iOS不清除是什么问题
                // 只有这个报错的节点能找到chii_auth, 所以在这里捕获用户cookie
                this.updateUserCookie(data)
                this.refreshWebView()
              }
            } else if (
              data.href.indexOf(`${URL_OAUTH_REDIRECT}?code=`) !== -1
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
    t('授权登陆.网络问题')

    info('网络似乎出了点问题')
    this.setState({
      clicked: false
    })
  }

  onOtherPage = () => {
    t('授权登陆.乱逛')

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
   * 要传递v=1区分版本, 当iOS端v=2的时候, html都不使用https
   */
  updateUserCookie = ({ userAgent, cookie }) =>
    userStore.updateUserCookie({
      userAgent,
      cookie,
      v: 0
    })

  doLogin = async ({ href = '' } = {}) => {
    const { navigation } = this.props
    const code = href.replace(`${URL_OAUTH_REDIRECT}?code=`, '')
    try {
      info('获取token中, 请稍等...', 6)
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

    t('授权登陆.成功')
  }

  renderPreview() {
    return (
      <View style={[_.container.column, this.styles.gray]}>
        {IOS ? (
          <Mesume />
        ) : (
          <Image
            style={this.styles.gray}
            width={160}
            height={128}
            src={require('@assets/screens/login/login.png')}
          />
        )}
        <View style={[this.styles.bottomContainer, _.mt.md]}>
          <Button type='main' shadow onPress={this.onLogin}>
            授权登陆
          </Button>
          <Button style={_.mt.md} type='plain' shadow onPress={this.onTour}>
            返回
          </Button>
          <Text style={_.mt.lg} size={12} type='sub'>
            旧版授权登陆已很久没维护, 不保证成功登陆后能正常运行APP内所有功能,
            建议使用账号密码登陆
          </Text>
        </View>
      </View>
    )
  }

  renderLoading() {
    return (
      <View style={[_.container.column, this.styles.gray]}>
        {IOS ? (
          <Mesume />
        ) : (
          <Image
            style={this.styles.gray}
            width={160}
            height={128}
            src={require('@assets/screens/login/login.png')}
          />
        )}
        <View style={[this.styles.bottomContainer, _.mt.md]}>
          <Flex style={this.styles.loading} direction='column' justify='center'>
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

    const injectedJavaScript = `(function(){
      // 注入优化样式
      document.querySelector('html').dataset.theme = "${_.select(
        'light',
        'dark'
      )}";
      var resetStyle = document.createElement("style");
      try {
        resetStyle.appendChild(document.createTextNode("${HTMLTrim(
          `
            #headerNeue2,
            #columnLoginB,
            .family {
              display: none;
            }
          `
        )}"));
      } catch (ex) {}
      document.body.append(resetStyle);

      // postMessage
      var __isBridgeOk = false;
      function waitForBridge() {
        if (!__isBridgeOk && window${
          SDK >= 36 ? '.ReactNativeWebView' : ''
        }.postMessage.length !== 1) {
          setTimeout(waitForBridge, 200);
        } else {
          __isBridgeOk = true
          window${
            SDK >= 36 ? '.ReactNativeWebView' : ''
          }.postMessage(JSON.stringify({
            type: 'onload',
            data: {
              href: document.location.href,
              userAgent: navigator.userAgent,
              cookie: document.cookie
            }
          }));
        }
      }
      setTimeout(() => { waitForBridge() }, 800);
    }());`
    return (
      <WebView
        ref={ref => (this.ref = ref)}
        uri={uri}
        javaScriptEnabled
        injectedJavaScript={injectedJavaScript}
        startInLoadingState
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
      <View style={[_.container.flex, this.styles.gray]}>
        <UM screen={title} />
        <StatusBarEvents backgroundColor={_.colorBg} />
        <StatusBarPlaceholder style={this.styles.gray} />
        <View style={_.container.flex}>
          {clicked ? this.renderWebView() : this.renderPreview()}
        </View>
        {!clicked && (
          <Text style={this.styles.ps} size={12} type='sub'>
            PS: 若登陆过程中出现问题, 请手动把授权网页里面的{TITLE}账号登出,
            不然可能会出现cookie过期的情况.
          </Text>
        )}
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  gray: {
    backgroundColor: _.colorBg
  },
  bottomContainer: {
    width: 320,
    height: 350
  },
  loading: {
    width: 320,
    height: 64
  },
  ps: {
    position: 'absolute',
    right: _.wind * 2,
    bottom: _.bottom,
    left: _.wind * 2
  }
}))
