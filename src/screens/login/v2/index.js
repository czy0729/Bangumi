/* eslint-disable no-trailing-spaces */
/*
 * @Author: czy0729
 * @Date: 2019-06-30 15:48:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 20:59:41
 */
import React from 'react'
import { Alert, View } from 'react-native'
import Constants from 'expo-constants'
import cheerio from 'cheerio-without-node-native'
import {
  KeyboardSpacer,
  StatusBarEvents,
  Text,
  Flex,
  UM,
  Heatmap
} from '@components'
import { StatusBarPlaceholder } from '@screens/_'
import { _, userStore, usersStore } from '@stores'
import { getTimestamp, setStorage, getStorage, open } from '@utils'
import { ob } from '@utils/decorators'
import { xhrCustom, hm, t, queue } from '@utils/fetch'
import { info, feedback } from '@utils/ui'
import { IOS, HOST_2, APP_ID, APP_SECRET, URL_OAUTH_REDIRECT } from '@constants'
import Preview from './preview'
import Form from './form'

const title = '登陆'
const namespace = 'LoginV2'
const AUTH_RETRY_COUNT = 10

export default
@ob
class LoginV2 extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    host: HOST_2,
    clicked: false,
    email: '',
    password: '',
    captcha: '',
    base64: '',
    isCommonUA: false,
    loading: false,
    info: '',
    focus: false
  }

  userAgent = ''
  formhash = ''
  lastCaptcha = ''
  cookie = {
    chiiSid: '',
    chiiAuth: ''
  }
  code = ''
  accessToken = ''
  retryCount = 0

  codeRef

  async componentDidMount() {
    const state = {}
    const host = await getStorage(`${namespace}|host`)
    if (host) state.host = host

    const email = await getStorage(`${namespace}|email`)
    if (email) state.email = email

    const password = await getStorage(`${namespace}|password`)
    if (password) state.password = password

    const isCommonUA = await getStorage(`${namespace}|isCommonUA`)
    if (isCommonUA) state.isCommonUA = isCommonUA

    this.setState(state, () => {
      this.reset()
    })
    hm('login/v2', 'LoginV2')
  }

  /**
   * 游客访问
   */
  onTour = async () => {
    t('登陆.游客访问')

    try {
      info('正在从github获取游客cookie...')

      const { _response } = await xhrCustom({
        // url: IOS
        //   ? 'https://czy0729.github.io/Bangumi/web/tourist.ios.json'
        //   : 'https://czy0729.github.io/Bangumi/web/tourist.json'
        url: IOS
          ? `https://gitee.com/a402731062/bangumi/raw/master/tourist.ios.json?t=${getTimestamp()}`
          : `https://gitee.com/a402731062/bangumi/raw/master/tourist.json?t=${getTimestamp()}`
      })
      const { accessToken, userCookie } = JSON.parse(_response)
      userStore.updateAccessToken(accessToken)

      const { navigation } = this.props
      userStore.updateUserCookie({
        cookie: userCookie.cookie,
        userAgent: userCookie.userAgent,
        v: 0,
        tourist: 1
      })

      info('登陆成功, 正在请求个人信息...', 6)
      userStore.fetchUserInfo()
      userStore.fetchUsersInfo()
      feedback()
      navigation.popToTop()
    } catch (error) {
      warn(namespace, 'onTour', error)
      info('登陆状态过期, 请稍后再试')
    }
  }

  /**
   * 显示登陆表单
   */
  onPreviewLogin = () =>
    this.setState({
      clicked: true
    })

  /**
   * 随机生成一个UserAgent
   */
  getUA = async () => {
    const { isCommonUA } = this.state
    if (isCommonUA) {
      // 与ekibun的bangumi一样的ua
      const ua =
        'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36'
      this.userAgent = ua
      return ua
    }

    const res = Constants.getWebViewUserAgentAsync()
    const UA = await res
    this.userAgent = `${UA} ${getTimestamp()}`

    return res
  }

  /**
   * 获取表单hash
   */
  getFormHash = async () => {
    const { host } = this.state
    const res = xhrCustom({
      url: `${host}/login`,
      headers: {
        // Cookie: '; chii_cookietime=2592000;',
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
    this.setState({
      base64: ''
    })

    const { host } = this.state
    const res = xhrCustom({
      url: `${host}/signup/captcha`,
      headers: {
        Cookie: `; chii_sid=${this.cookie.chiiSid};`,
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
   * 登陆最终失败
   */
  loginFail = async info => {
    t('登陆.错误')

    this.setState({
      loading: false,
      info
    })
    this.reset()
  }

  /**
   * 登陆流程
   */
  onLogin = async () => {
    const { email, password, captcha } = this.state
    if (!email || !password || !captcha) {
      info('请填写以上字段')
      return
    }

    try {
      if (this.lastCaptcha !== captcha) {
        t('登陆.登陆')
        this.codeRef.inputRef.blur()
        setStorage(`${namespace}|email`, email)

        await this.login()
        if (!this.cookie.chiiAuth) {
          this.loginFail('验证码或密码错误，重试或前往旧版授权登陆 →')
          return
        }

        // 缓存上次的正确的验证码
        this.lastCaptcha = captcha

        await this.oauth()
        await this.authorize()
      } else {
        this.setState({
          info: '重试 (4/5)'
        })
        this.retryCount += 1
      }

      const { _response } = await this.getAccessToken()
      const accessToken = JSON.parse(_response)
      userStore.updateAccessToken(accessToken)
      setStorage(`${namespace}|password`, password)
      this.inStore()
    } catch (ex) {
      if (this.retryCount >= AUTH_RETRY_COUNT) {
        this.loginFail(
          `[${String(ex)}] 登陆失败，请重试或重启APP，或点击前往旧版授权登陆 →`
        )
        return
      }

      warn('login/v2/index.js', 'onLogin', ex)
      this.onLogin()
    }
  }

  /**
   * 密码登陆
   */
  login = async () => {
    this.setState({
      loading: true,
      info: '登陆请求中...(1/5)'
    })

    const { host, email, password, captcha } = this.state
    const res = xhrCustom({
      method: 'POST',
      url: `${host}/FollowTheRabbit`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: `; chii_sid=${this.cookie.chiiSid};`,
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

    const data = await res
    const { _response, responseHeaders } = data
    if (_response.includes('分钟内您将不能登录本站。')) {
      info('累计 5 次错误尝试，15 分钟内您将不能登录本站。')
    }

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
      info: '获取授权表单码...(2/5)'
    })

    const { host } = this.state
    const res = xhrCustom({
      url: `${host}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
      headers: {
        Cookie: `; chii_cookietime=2592000; chii_sid=${this.cookie.chiiSid}; chii_auth=${this.cookie.chiiAuth};`,
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
    this.setState({
      info: '授权中...(3/5)'
    })

    const { host } = this.state
    const res = xhrCustom({
      method: 'POST',
      url: `${host}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: `; chii_cookietime=2592000; chii_sid=${this.cookie.chiiSid}; chii_auth=${this.cookie.chiiAuth};`,
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
    this.code = responseURL.split('=').slice(1).join('=')

    return res
  }

  /**
   * code获取access_token
   */
  getAccessToken = () => {
    this.setState({
      info: '授权成功, 获取token中...(4/5)'
    })

    const { host } = this.state
    return xhrCustom({
      method: 'POST',
      url: `${host}/oauth/access_token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': this.userAgent
      },
      data: {
        grant_type: 'authorization_code',
        client_id: APP_ID,
        client_secret: APP_SECRET,
        code: this.code,
        redirect_uri: URL_OAUTH_REDIRECT,
        state: getTimestamp()
      }
    })
  }

  /**
   * 入库
   */
  inStore = async () => {
    this.setState({
      info: '登陆成功, 正在请求个人信息...(5/5)'
    })

    const { navigation } = this.props
    userStore.updateUserCookie({
      cookie: `chii_sid=${this.cookie.chiiSid}; chii_auth=${this.cookie.chiiAuth};`,
      userAgent: this.userAgent,
      v: 0
    })
    feedback()
    navigation.popToTop()
    t('登陆.成功')

    queue(
      [
        () => userStore.fetchUserInfo(),
        () => userStore.fetchUsersInfo(),
        () => usersStore.fetchFriends()
      ],
      1
    )
  }

  reset = async () => {
    this.setState({
      base64: ''
    })

    this.retryCount = 0
    await this.getUA()
    await this.getFormHash()
    await this.getCaptcha()
  }

  onFocus = () =>
    this.setState({
      focus: true
    })

  onBlur = () =>
    this.setState({
      // focus: false
    })

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
   * 切换登陆域名
   */
  onSelect = host => {
    setStorage(`${namespace}|host`, host)
    this.setState(
      {
        host
      },
      () => {
        t('登陆.切换域名', {
          host
        })

        this.reset()
      }
    )
  }

  /**
   * 切换是否使用固定UA登陆
   */
  onUAChange = () => {
    const { isCommonUA } = this.state
    const next = !isCommonUA

    setStorage(`${namespace}|isCommonUA`, next)
    this.setState({
      isCommonUA: next
    })

    this.reset()
  }

  renderPreview() {
    return (
      <Preview
        onLogin={this.onPreviewLogin}
        onTour={() =>
          Alert.alert(
            '提示',
            '将使用开发者的测试账号, 提供大部分功能预览, 确定登陆? (可以在设置里面退出登陆)',
            [
              {
                text: '取消',
                style: 'cancel'
              },
              {
                text: '确定',
                onPress: this.onTour
              }
            ]
          )
        }
      />
    )
  }

  renderForm() {
    const { navigation } = this.props
    const {
      host,
      email,
      password,
      captcha,
      base64,
      isCommonUA,
      loading,
      info
    } = this.state
    return (
      <Form
        forwardRef={ref => (this.codeRef = ref)}
        navigation={navigation}
        email={email}
        password={password}
        captcha={captcha}
        base64={base64}
        isCommonUA={isCommonUA}
        loading={loading}
        info={info}
        host={host}
        onGetCaptcha={this.getCaptcha}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onChange={this.onChange}
        onSelect={this.onSelect}
        onUAChange={this.onUAChange}
        onLogin={this.onLogin}
      />
    )
  }

  renderContent() {
    const { clicked, focus } = this.state
    return (
      <>
        <View style={_.container.flex}>
          {clicked ? this.renderForm() : this.renderPreview()}
        </View>
        {clicked ? (
          !focus && (
            <View style={this.styles.ps}>
              <Text size={12} lineHeight={14} type='sub'>
                隐私策略: 我们十分尊重您的隐私, 我们不会收集上述信息.
                (多次登陆失败后可能一段时间内不能再次登陆)
              </Text>
            </View>
          )
        ) : (
          <Flex style={this.styles.old}>
            <Flex.Item>
              <Text
                size={13}
                align='center'
                onPress={() => {
                  t('登陆.跳转', {
                    to: 'Signup'
                  })
                  Alert.alert(
                    '提示',
                    // eslint-disable-next-line max-len
                    '声明: 本APP的性质为第三方，只提供显示数据和简单的操作，没有修复和改变源站业务的能力。 \n\n在移动端浏览器注册会经常遇到验证码错误，碰到错误建议在浏览器里使用 [电脑版UA]，再不行推荐使用电脑Chrome注册。 \n\n注册后会有 [激活码] 发到邮箱，测试过只会发送一次，请务必在激活有效时间内激活，否则这个注册账号就废了。输入激活码前 [请务必等几秒]，看见下方的文字改变了再填入，不然永远都会说激活码错误。\n\n作者只能帮大家到这里了。',
                    [
                      {
                        text: '取消',
                        type: 'cancel'
                      },
                      {
                        text: '前往注册',
                        onPress: () => open('https://bgm.tv/signup')
                      }
                    ]
                  )
                }}
              >
                注册
              </Text>
              <Heatmap
                id='登陆.跳转'
                data={{
                  to: 'Signup',
                  alias: '注册'
                }}
              />
            </Flex.Item>
            <Flex.Item style={this.styles.border}>
              <Text
                size={13}
                align='center'
                onPress={() => {
                  t('登陆.跳转', {
                    to: 'Login'
                  })

                  const { navigation } = this.props
                  navigation.push('Login')
                }}
              >
                旧版登陆
              </Text>
              <Heatmap
                id='登陆.跳转'
                data={{
                  to: 'Login',
                  alias: '旧版登陆'
                }}
              />
            </Flex.Item>
            <Flex.Item style={this.styles.border}>
              <Text
                size={13}
                align='center'
                onPress={() => {
                  t('登陆.跳转', {
                    to: 'LoginAssist'
                  })

                  const { navigation } = this.props
                  navigation.push('LoginAssist')
                }}
              >
                辅助登陆
              </Text>
              <Heatmap
                id='登陆.跳转'
                data={{
                  to: 'LoginAssist',
                  alias: '辅助登陆'
                }}
              />
            </Flex.Item>
          </Flex>
        )}
      </>
    )
  }

  render() {
    return (
      <View style={_.container.plain}>
        <UM screen={title} />
        <StatusBarEvents backgroundColor='transparent' />
        <StatusBarPlaceholder />
        {this.renderContent()}
        <KeyboardSpacer />
        <Heatmap
          right={_.wind}
          bottom={_.bottom + 120}
          id='登陆.登陆'
          transparent
        />
        <Heatmap
          right={_.wind}
          bottom={_.bottom + 86}
          id='登陆.成功'
          transparent
        />
        <Heatmap
          right={_.wind}
          bottom={_.bottom + 52}
          id='登陆.错误'
          transparent
        />
        <Heatmap
          id='登陆'
          screen='Login'
        />
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
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
}))
