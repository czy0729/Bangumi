/*
 * @Author: czy0729
 * @Date: 2019-06-30 15:48:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-24 14:20:17
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import Constants from 'expo-constants'
import cheerio from 'cheerio-without-node-native'
import { Text, KeyboardSpacer } from '@components'
import { StatusBar, StatusBarPlaceholder } from '@screens/_'
import { userStore } from '@stores'
import { getTimestamp, setStorage, getStorage } from '@utils'
import { xhrCustom, hm, iOSUrlFixed } from '@utils/fetch'
import { info } from '@utils/ui'
import { HOST, APP_ID, APP_SECRET, OAUTH_REDIRECT_URL } from '@constants'
import _ from '@styles'
import Preview from './preview'
import Form from './form'

const title = '登陆V2'
const namespace = 'LoginV2'

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
    info: ''
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

  onTour = () => {
    const { navigation } = this.props
    navigation.goBack()
  }

  onLogin = () => {
    this.setState({
      clicked: true
    })
  }

  /**
   * 登出
   */
  logout = () =>
    xhrCustom({
      url: `${HOST}/logout/7dd16c5e`,
      headers: {
        'User-Agent': this.userAgent
      }
    })

  /**
   * 获取表单hash
   */
  getFormHash = async () => {
    const res = xhrCustom({
      url: `${HOST}/login`,
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
      url: `${HOST}/signup/captcha?state=${getTimestamp()}`,
      headers: {
        Cookie: `chii_sid=${this.cookie.chiiSid}`,
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
   * 登陆
   */
  login = async () => {
    const { loading, email, password, captcha } = this.state
    if (loading) {
      return
    }

    if (!email || !password || !captcha) {
      info('请填写以上字段')
      return
    }

    this.setState({
      loading: true,
      info: '登陆请求中...'
    })

    this.inputRef.inputRef.blur()

    try {
      const { responseHeaders } = await xhrCustom({
        method: 'POST',
        url: `${HOST}/FollowTheRabbit`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Cookie: `chii_sid=${this.cookie.chiiSid}`,
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

      if (responseHeaders['Set-Cookie']) {
        const match = responseHeaders['Set-Cookie'].match(/chii_auth=(.+?);/)
        if (match) {
          this.cookie.chiiAuth = match[1]
        }
      }

      if (!this.cookie.chiiAuth) {
        this.setState({
          loading: false,
          info: '登陆失败, 请重试或点击这里前往旧版登陆 >'
        })
        return
      }

      this.setState({
        info: '获取授权表单码...'
      })
      await this.oauth()

      this.setState({
        info: '授权中...'
      })
      await this.authorize()

      this.setState({
        info: '授权成功, 获取token中...'
      })
      const { _response } = await this.getAccessToken()

      const accessToken = JSON.parse(_response)
      userStore.updateAccessToken(accessToken)
      this.inStore()
      this.setState({
        loading: false,
        info: '登陆成功, 正在请求个人信息...'
      })
    } catch (ex) {
      this.setState({
        loading: false,
        info: '登陆失败, 请重试或点击这里前往旧版登陆 >'
      })
    }
  }

  /**
   * 获取授权表单码
   */
  oauth = async () => {
    const res = xhrCustom({
      url: `${HOST}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${iOSUrlFixed(
        OAUTH_REDIRECT_URL
      )}`,
      headers: {
        Cookie: `chii_sid=${this.cookie.chiiSid}; chii_auth=${this.cookie.chiiAuth}`,
        'User-Agent': this.userAgent
      }
    })

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
    const res = xhrCustom({
      method: 'POST',
      url: `${HOST}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${iOSUrlFixed(
        OAUTH_REDIRECT_URL
      )}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: `chii_sid=${this.cookie.chiiSid}; chii_auth=${this.cookie.chiiAuth}`,
        'User-Agent': this.userAgent
      },
      data: {
        formhash: this.formhash,
        redirect_uri: '',
        client_id: APP_ID,
        submit: '授权'
      }
    })

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
  getAccessToken = () =>
    xhrCustom({
      method: 'POST',
      url: `${HOST}/oauth/access_token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': this.userAgent
      },
      data: {
        grant_type: 'authorization_code',
        client_id: APP_ID,
        client_secret: APP_SECRET,
        code: this.code,
        redirect_uri: iOSUrlFixed(OAUTH_REDIRECT_URL),
        state: getTimestamp()
      }
    })

  /**
   * 入库
   */
  inStore = async () => {
    const { navigation } = this.props
    const { email } = this.state

    setStorage(`${namespace}|email`, email)
    userStore.updateUserCookie({
      cookie: `chii_sid=${this.cookie.chiiSid}; chii_auth=${this.cookie.chiiAuth}`,
      userAgent: this.userAgent,
      v: 2
    })
    await userStore.fetchUserInfo()
    await userStore.fetchUsersInfo()

    navigation.popToTop()
  }

  onChange = (evt, type) => {
    const { nativeEvent } = evt
    const { text } = nativeEvent
    this.setState({
      [type]: text,
      info: ''
    })
  }

  renderPreview() {
    return <Preview onLogin={this.onLogin} onTour={this.onTour} />
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
        onLogin={this.login}
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
          <Text style={styles.ps} size={12} type='sub'>
            隐私策略: 我们十分尊重您的个人隐私, 这些信息仅存储于您的设备中,
            我们不会收集上述信息. (多次尝试登陆后,
            可能会导致一段时间内不能再次登陆; 又或者完全退出,
            之后清除数据再尝试)
          </Text>
        ) : (
          <Text
            style={styles.old}
            type='sub'
            onPress={() => {
              const { navigation } = this.props
              navigation.push('Login')
            }}
          >
            旧版授权登陆
          </Text>
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
    left: 0,
    width: '100%',
    padding: _.sm,
    textAlign: 'center'
  },
  ps: {
    position: 'absolute',
    right: _.wind * 2,
    bottom: _.bottom,
    left: _.wind * 2
  }
})
