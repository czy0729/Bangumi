/*
 * v2.1 为了应付多种特异的情况
 * [0]正常登陆 -> 不行 -> [1]换成http -> 不行 -> [2]withCredentials = true -> 不行 -> 失败
 * 假如最终是[1]成功登陆, 接下来所有请求html都不能带https
 * @Author: czy0729
 * @Date: 2019-06-30 15:48:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-28 23:40:51
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Constants from 'expo-constants'
import cheerio from 'cheerio-without-node-native'
import deepmerge from 'deepmerge'
import { Text, Flex, KeyboardSpacer } from '@components'
import { StatusBar, StatusBarPlaceholder } from '@screens/_'
import { userStore } from '@stores'
import { getTimestamp, setStorage, getStorage } from '@utils'
import { xhrCustom, hm } from '@utils/fetch'
import { info } from '@utils/ui'
import { APP_ID, APP_SECRET, OAUTH_REDIRECT_URL } from '@constants'
import _ from '@styles'
import Preview from './preview'
import Form from './form'

const title = '登陆V2'
const namespace = 'LoginV2'
const HOST_BANGUMI = 'https://bangumi.tv'

export default class LoginV2 extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    clicked: false,
    email: '',
    password: '',
    captcha: '',
    base64: '',
    loading: false,
    info: '',
    retry: 0
  }

  userAgent = ''
  formhash = ''
  cookie = {
    chiiSid: '',
    chiiAuth: ''
  }
  code = ''
  accessToken = ''

  inputRef

  async componentDidMount() {
    const email = await getStorage(`${namespace}|email`)
    if (email) {
      this.setState({
        email
      })
    }

    this.userAgent = await Constants.getWebViewUserAgentAsync()

    // await this.logout()
    await this.getFormHash()
    await this.getCaptcha()

    hm('login?v=2', title)
  }

  /**
   * 游客访问
   */
  onTour = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  /**
   * 显示登陆表单
   */
  onPreviewLogin = () => {
    this.setState({
      clicked: true
    })
  }

  /**
   * 登出
   */
  logout = () =>
    xhrCustom({
      url: `${HOST_BANGUMI}/logout/7dd16c5e`,
      headers: {
        'User-Agent': this.userAgent
      }
    })

  /**
   * 获取表单hash
   */
  getFormHash = async () => {
    const res = xhrCustom({
      // @notice 尝试过很多遍bgm.tv就是不能登陆
      url: `${HOST_BANGUMI}/login`,
      headers: {
        'User-Agent': this.userAgent
      }
    })

    const { responseHeaders, _response } = await res
    if (responseHeaders['Set-Cookie']) {
      const match = responseHeaders['Set-Cookie'].match(/chii_sid=(.+?);/)
      if (match) {
        this.cookie.chiiSid = match[1]
      }
    }

    const match = _response.match(
      /<input type="hidden" name="formhash" value="(.+?)">/
    )
    if (match) {
      this.formhash = match[1]
    }

    return res
  }

  /**
   * 获取验证码
   */
  getCaptcha = async () => {
    const res = xhrCustom({
      // @notice 尝试过很多遍bgm.tv就是不能登陆
      url: `${HOST_BANGUMI}/signup/captcha`,
      headers: {
        Cookie: `chii_sid=${this.cookie.chiiSid};`,
        'User-Agent': this.userAgent
      },
      responseType: 'arraybuffer'
    })

    const { _response } = await res
    this.setState({
      base64: `data:image/gif;base64,${_response}`
    })

    return res
  }

  /**
   * 构造再登录请求数据
   */
  getRetryData = data => {
    const { retry } = this.state
    if (retry <= 1) {
      return data
    }

    const _data = deepmerge({}, data)
    if (retry === 2) {
      _data.withCredentials = true
    }
    return _data
  }

  /**
   * 尝试再登陆
   */
  retryLogin = info => {
    this.finalLoginFail(info)

    // @todo 有问题, 待处理
    // const { retry } = this.state
    // if (retry <= 2) {
    //   this.setState(
    //     {
    //       retry: retry + 1
    //     },
    //     () => {
    //       this.login()
    //     }
    //   )
    // } else {
    //   this.finalLoginFail(info)
    // }
  }

  /**
   * 登陆最终失败
   */
  finalLoginFail = info => {
    this.setState({
      loading: false,
      info,
      retry: 0
    })
    this.getCaptcha()
  }

  /**
   * 登陆流程
   */
  onLogin = async () => {
    const { loading, email, password, captcha } = this.state
    if (loading) {
      return
    }

    if (!email || !password || !captcha) {
      info('请填写以上字段')
      return
    }

    this.inputRef.inputRef.blur()
    setStorage(`${namespace}|email`, email)

    try {
      await this.login()
      if (!this.cookie.chiiAuth) {
        this.retryLogin('验证码错误, 请重试或点击这里前往旧版授权登陆 >')
        return
      }

      await this.oauth()
      await this.authorize()

      const { _response } = await this.getAccessToken()
      const accessToken = JSON.parse(_response)
      userStore.updateAccessToken(accessToken)
      this.inStore()
    } catch (ex) {
      this.retryLogin('登陆失败, 请重试或点击这里前往旧版授权登陆 >')
    }
  }

  /**
   * 密码登陆
   */
  login = async () => {
    this.setState({
      loading: true,
      info: `${this.retryText}登陆请求中...(1/5)`
    })

    const { email, password, captcha } = this.state
    const res = xhrCustom(
      this.getRetryData({
        method: 'POST',

        // @notice 尝试过很多遍bgm.tv就是不能登陆
        url: `${HOST_BANGUMI}/FollowTheRabbit`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie: `chii_sid=${this.cookie.chiiSid};`,
          'User-Agent': this.userAgent
        },
        data: {
          formhash: this.formhash,
          referer: '',
          dreferer: '',
          email,
          password,
          captcha_challenge_field: captcha,
          loginsubmit: '登陆'
        }
      })
    )

    const { responseHeaders } = await res
    if (responseHeaders['Set-Cookie']) {
      const match = responseHeaders['Set-Cookie'].match(/chii_auth=(.+?);/)
      if (match) {
        this.cookie.chiiAuth = match[1]
      }
    }

    return res
  }

  /**
   * 获取授权表单码
   */
  oauth = async () => {
    this.setState({
      info: `${this.retryText}获取授权表单码...(2/5)`
    })

    const res = xhrCustom(
      this.getRetryData({
        url: `${HOST_BANGUMI}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${OAUTH_REDIRECT_URL}`,
        headers: {
          Cookie: `chii_sid=${this.cookie.chiiSid}; chii_auth=${this.cookie.chiiAuth};`,
          'User-Agent': this.userAgent
        }
      })
    )

    const { _response } = await res
    this.formhash = cheerio
      .load(_response)('input[name=formhash]')
      .attr('value')

    return res
  }

  /**
   * 授权获取code
   */
  authorize = async () => {
    this.setState({
      info: `${this.retryText}授权中...(3/5)`
    })

    const res = xhrCustom(
      this.getRetryData({
        method: 'POST',
        url: `${HOST_BANGUMI}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${OAUTH_REDIRECT_URL}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie: `chii_sid=${this.cookie.chiiSid}; chii_auth=${this.cookie.chiiAuth};`,
          'User-Agent': this.userAgent
        },
        data: {
          formhash: this.formhash,
          redirect_uri: '',
          client_id: APP_ID,
          submit: '授权'
        }
      })
    )

    const { responseURL } = await res
    this.code = responseURL
      .split('=')
      .slice(1)
      .join('=')

    return res
  }

  /**
   * code获取access_token
   */
  getAccessToken = () => {
    this.setState({
      info: `${this.retryText}授权成功, 获取token中...(4/5)`
    })

    return xhrCustom(
      this.getRetryData({
        method: 'POST',
        url: `${HOST_BANGUMI}/oauth/access_token`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': this.userAgent
        },
        data: {
          grant_type: 'authorization_code',
          client_id: APP_ID,
          client_secret: APP_SECRET,
          code: this.code,
          redirect_uri: OAUTH_REDIRECT_URL,
          state: getTimestamp()
        }
      })
    )
  }

  /**
   * 入库
   */
  inStore = async () => {
    this.setState({
      info: `${this.retryText}登陆成功, 正在请求个人信息...(5/5)`
    })

    const { navigation } = this.props
    const { retry } = this.state
    userStore.updateUserCookie({
      cookie: `chii_sid=${this.cookie.chiiSid}; chii_auth=${this.cookie.chiiAuth};`,
      userAgent: this.userAgent,
      v: retry // retry约定用于标记登陆版本
    })

    await userStore.fetchUserInfo()
    await userStore.fetchUsersInfo()

    navigation.popToTop()
  }

  /**
   * 输入框变化
   */
  onChange = (evt, type) => {
    const { nativeEvent } = evt
    const { text } = nativeEvent
    this.setState({
      [type]: text,
      info: ''
    })
  }

  /**
   * 重试登陆文案
   */
  get retryText() {
    const { retry } = this.state
    if (!retry) {
      return ''
    }
    return `第${retry}次重试, `
  }

  renderPreview() {
    return <Preview onLogin={this.onPreviewLogin} onTour={this.onTour} />
  }

  renderForm() {
    const { navigation } = this.props
    const { email, password, captcha, base64, loading, info } = this.state
    return (
      <Form
        forwardRef={ref => (this.inputRef = ref)}
        navigation={navigation}
        email={email}
        password={password}
        captcha={captcha}
        base64={base64}
        loading={loading}
        info={info}
        onGetCaptcha={this.getCaptcha}
        onChange={this.onChange}
        onLogin={this.onLogin}
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
          {clicked ? this.renderForm() : this.renderPreview()}
        </View>
        {clicked ? (
          <View style={styles.ps}>
            <Text size={12} lineHeight={14} type='sub'>
              隐私策略: 我们十分尊重您的个人隐私, 信息仅存储于您的设备中,
              我们不会收集上述信息. (多次尝试登陆后, 会导致一段时间不能再次登陆,
              可者完全退出后清除应用数据再尝试)
            </Text>
          </View>
        ) : (
          <Flex style={styles.old}>
            <Flex.Item>
              <Text
                type='sub'
                align='center'
                onPress={() => {
                  const { navigation } = this.props
                  navigation.push('Login')
                }}
              >
                旧版授权登陆
              </Text>
            </Flex.Item>
            <Flex.Item style={styles.border}>
              <Text
                type='sub'
                align='center'
                onPress={() => {
                  const { navigation } = this.props
                  navigation.push('LoginAssist')
                }}
              >
                电脑辅助登陆
              </Text>
            </Flex.Item>
          </Flex>
        )}
        <KeyboardSpacer />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  gray: {
    backgroundColor: 'rgb(251, 251, 251)'
  },
  old: {
    position: 'absolute',
    zIndex: 1,
    bottom: _.bottom,
    left: _.wind,
    right: _.wind,
    padding: _.sm
  },
  ps: {
    position: 'absolute',
    right: _.wind * 2,
    bottom: _.bottom,
    left: _.wind * 2
  },
  border: {
    borderLeftWidth: 1,
    borderColor: _.colorBorder
  }
})
