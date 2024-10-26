/*
 * @Author: czy0729
 * @Date: 2019-06-30 15:48:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-09 21:09:31
 */
import React from 'react'
import { View } from 'react-native'
import cheerio from 'cheerio-without-node-native'
import Constants from 'expo-constants'
import { Component, Flex, Heatmap, Iconfont, KeyboardSpacer, Text, Touchable } from '@components'
import { Notice, StatusBarPlaceholder } from '@_'
import { _, rakuenStore, usersStore, userStore } from '@stores'
import {
  confirm,
  feedback,
  getStorage,
  getTimestamp,
  info,
  open,
  setStorage,
  urlStringify
} from '@utils'
import { ob } from '@utils/decorators'
import { hm, queue, t } from '@utils/fetch'
import { get } from '@utils/kv'
import axios from '@utils/thirdParty/axios'
import {
  APP_ID,
  APP_SECRET,
  FROZEN_FN,
  HOST,
  URL_OAUTH_REDIRECT,
  URL_PRIVACY,
  WEB
} from '@constants'
import i18n from '@constants/i18n'
import { HOST_PROXY } from '@src/config'
import { Navigation } from '@types'
import Form from './form'
import Preview from './preview'
import { AUTH_RETRY_COUNT, NAMESPACE, UA_EKIBUN_BANGUMI_APP } from './ds'
import { memoStyles } from './styles'

/** 账号密码登录 */
class LoginV2 extends React.Component<{
  navigation: Navigation
}> {
  state = {
    host: WEB ? HOST_PROXY : HOST,
    clicked: false,
    email: '',
    password: '',
    captcha: '',
    base64: '',
    isCommonUA: false,
    loading: false,
    info: '',
    focus: false,
    failed: false
  }

  userAgent = ''
  formhash = ''
  lastCaptcha = ''
  cookie: {
    chii_auth?: string
  } = {}
  code = ''
  accessToken = {}
  retryCount = 0
  codeRef = null

  async componentDidMount() {
    const state: {
      host?: string
      email?: string
      password?: string
      isCommonUA?: boolean
    } = {}

    const host = await getStorage(`${NAMESPACE}|host`)
    if (host) state.host = host

    const email = await getStorage(`${NAMESPACE}|email`)
    if (email) state.email = email

    const password = await getStorage(`${NAMESPACE}|password`)
    if (password) state.password = password

    const isCommonUA = await getStorage(`${NAMESPACE}|isCommonUA`)
    if (isCommonUA) state.isCommonUA = isCommonUA

    this.setState(state, () => {
      this.reset()
    })

    hm('login/v2', 'LoginV2')
  }

  /** 游客访问 */
  onTour = async () => {
    t('登陆.游客访问')

    try {
      info('正在从github获取游客cookie...')

      const { accessToken, userCookie } = await get('tourist')
      userStore.updateAccessToken(accessToken)

      const { navigation } = this.props
      userStore.updateUserCookie({
        cookie: userCookie.cookie,
        userAgent: userCookie.userAgent,
        v: 0,
        tourist: 1
      })

      info(`${i18n.login()}成功, 正在请求个人信息...`, 6)
      userStore.fetchUserInfo()
      userStore.fetchUsersInfo()
      feedback()
      navigation.popToTop()
    } catch (error) {
      console.error(NAMESPACE, 'onTour', error)
      info(`${i18n.login()}状态过期, 请稍后再试`)
    }
  }

  /** 显示登录表单 */
  onPreviewLogin = () => {
    this.setState({
      clicked: true
    })
  }

  /** 登录最终失败 */
  loginFail = async (info: string) => {
    t('登陆.错误')

    this.setState({
      loading: false,
      info,
      failed: true
    })
    this.reset()
  }

  /** 登录流程 */
  onLogin = async () => {
    const { email, password, captcha } = this.state
    if (!email || !password || !captcha) {
      info('请填写以上字段')
      return
    }

    try {
      if (this.lastCaptcha !== captcha) {
        t('登陆.登陆')

        if (typeof this?.codeRef?.inputRef?.blur === 'function') {
          this.codeRef.inputRef.blur()
        }
        setStorage(`${NAMESPACE}|email`, email)

        await this.login()
        if (!this.cookie.chii_auth) {
          this.loginFail(`验证码或密码错误，稍会再重试或前往授权${i18n.login()} →`)
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

      await this.getAccessToken()

      setStorage(`${NAMESPACE}|password`, password)
      this.inStore()
    } catch (ex) {
      this.retryCount += 1
      if (this.retryCount >= AUTH_RETRY_COUNT) {
        this.loginFail(
          `[${String(
            ex
          )}] ${i18n.login()}失败，请重试或重启APP，或点击前往旧版授权${i18n.login()} →`
        )
        return
      }

      console.error('login/v2/index.js', 'onLogin', ex)
      this.onLogin()
    }
  }

  /** 随机生成一个 UserAgent */
  getUA = async () => {
    const { isCommonUA } = this.state
    if (isCommonUA) {
      // 与 ekibun 的 bangumi 一样的 ua
      const ua = UA_EKIBUN_BANGUMI_APP
      this.userAgent = ua
      return ua
    }

    const UA = await Constants.getWebViewUserAgentAsync()
    this.userAgent = WEB ? UA : `${UA} ${getTimestamp()}`

    return UA
  }

  getHeaders = (keys: string[] = []) => {
    const headers: any = {}
    if (keys.includes('User-Agent')) {
      headers[WEB ? 'X-User-Agent' : 'User-Agent'] = this.userAgent
    }

    if (keys.includes('Cookie')) {
      headers[WEB ? 'X-Cookie' : 'Cookie'] = this.cookieString
    }

    if (keys.includes('Content-Type')) {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }

    return headers
  }

  getCookies = (headers = {}) => {
    this.updateCookie(WEB ? headers?.['x-set-cookie'] : headers?.['set-cookie']?.[0])
  }

  /** 获取表单 hash */
  getFormHash = async () => {
    const { host } = this.state

    // @ts-expect-error
    axios.defaults.withCredentials = false

    // @ts-expect-error
    const res = await axios({
      method: 'get',
      url: `${host}/login`,
      headers: this.getHeaders(['User-Agent'])
    })
    const { data, headers } = res
    this.getCookies(headers)

    const match = data.match(/<input type="hidden" name="formhash" value="(.+?)">/)
    if (match) this.formhash = match[1]

    return true
  }

  /** 获取验证码 */
  getCaptcha = async () => {
    this.setState({
      base64: ''
    })

    const { host } = this.state

    // @ts-expect-error
    axios.defaults.withCredentials = false

    // @ts-expect-error
    const { request } = await axios({
      method: 'get',
      url: `${host}/signup/captcha?${getTimestamp()}`,
      headers: this.getHeaders(['User-Agent', 'Cookie']),
      responseType: 'arraybuffer'
    })

    let base64: string
    if (WEB) {
      base64 = btoa(String.fromCharCode.apply(null, new Uint8Array(request.response)))
    } else {
      base64 = request._response
    }

    this.setState({
      base64: `data:image/gif;base64,${base64}`,
      captcha: ''
    })

    return true
  }

  /** 密码登录 */
  login = async () => {
    this.setState({
      loading: true,
      info: `${i18n.login()}请求中...(1/5)`
    })

    const { host, email, password, captcha } = this.state

    // @ts-expect-error
    axios.defaults.withCredentials = false

    // @ts-expect-error
    const { data, headers } = await axios({
      method: 'post',
      url: `${host}/FollowTheRabbit`,
      headers: this.getHeaders(['User-Agent', 'Cookie', 'Content-Type']),
      data: urlStringify({
        formhash: this.formhash,
        referer: '',
        dreferer: '',
        email,
        password,
        captcha_challenge_field: captcha,
        loginsubmit: '登录'
      })
    })

    if (data.includes('分钟内您将不能登录本站')) {
      info(`累计 5 次错误尝试，15 分钟内您将不能${i18n.login()}本站。`)
    } else {
      this.getCookies(headers)
    }

    return true
  }

  /** 获取授权表单码 */
  oauth = async () => {
    this.setState({
      info: '获取授权表单码...(2/5)'
    })

    const { host } = this.state

    // @ts-expect-error
    axios.defaults.withCredentials = false

    // @ts-expect-error
    const { data } = await axios({
      method: 'get',
      url: `${host}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
      headers: this.getHeaders(['User-Agent', 'Cookie'])
    })
    this.formhash = cheerio.load(data)('input[name=formhash]').attr('value')

    return true
  }

  /** 授权获取code */
  authorize = async () => {
    this.setState({
      info: '授权中...(3/5)'
    })

    const { host } = this.state

    // @ts-expect-error
    axios.defaults.withCredentials = false

    // @ts-expect-error
    const { request } = await axios({
      method: 'post',
      maxRedirects: 0,
      validateStatus: null,
      url: `${host}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
      headers: this.getHeaders(['User-Agent', 'Cookie', 'Content-Type']),
      data: urlStringify({
        formhash: this.formhash,
        redirect_uri: '',
        client_id: APP_ID,
        submit: '授权'
      })
    })
    this.code = request?.responseURL?.split('=').slice(1).join('=')

    return true
  }

  /** code 获取 access_token */
  getAccessToken = async () => {
    this.setState({
      info: '授权成功, 获取token中...(4/5)'
    })

    const { host } = this.state

    // @ts-expect-error
    axios.defaults.withCredentials = false

    // @ts-expect-error
    const { status, data } = await axios({
      method: 'post',
      maxRedirects: 0,
      validateStatus: null,
      url: `${host}/oauth/access_token`,
      headers: this.getHeaders(['User-Agent', 'Content-Type']),
      data: urlStringify({
        grant_type: 'authorization_code',
        client_id: APP_ID,
        client_secret: APP_SECRET,
        code: this.code,
        redirect_uri: URL_OAUTH_REDIRECT,
        state: getTimestamp()
      })
    })
    if (status !== 200) throw new TypeError(status)

    this.accessToken = data

    return true
  }

  /** 更新 responseHeader 的 set-cookie */
  updateCookie = (setCookie = '') => {
    const setCookieKeys = ['__cfduid', 'chii_sid', 'chii_sec_id', 'chii_cookietime', 'chii_auth']

    setCookieKeys.forEach(item => {
      const reg = new RegExp(`${item}=(.+?);`)
      const match = setCookie.match(reg)
      if (match) this.cookie[item] = match[1]
    })
  }

  /** 入库 */
  inStore = async () => {
    this.setState({
      info: `${i18n.login()}成功, 正在请求个人信息...(5/5)`
    })

    const { navigation } = this.props
    userStore.updateUserCookie({
      cookie: this.cookieString,
      userAgent: this.userAgent,
      v: 0
    })
    userStore.updateAccessToken(this.accessToken)

    feedback()
    navigation.popToTop()
    t('登陆.成功')

    queue(
      [
        () => userStore.fetchUserInfo(),
        () => userStore.fetchUsersInfo(),
        () => usersStore.fetchFriends(),
        () => rakuenStore.downloadFavorTopic()
      ],
      1
    )
  }

  /** 重设 */
  reset = async () => {
    this.cookie = {}
    this.setState({
      base64: ''
    })
    this.retryCount = 0

    await this.getUA()
    await this.getFormHash()
    await this.getCaptcha()
  }

  /** 输入框 focus */
  onFocus = () => {
    this.setState({
      focus: true
    })
  }

  /** 输入框 blur */
  onBlur = () => {
    this.setState({
      focus: false
    })
  }

  /** 输入框变化 */
  onChange = (evt: { nativeEvent: any }, type: any) => {
    const { nativeEvent } = evt
    const { text } = nativeEvent
    this.setState({
      [type]: text,
      info: ''
    })
  }

  /** 切换登录域名 */
  onSelect = (host: string) => {
    setStorage(`${NAMESPACE}|host`, host)
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

  /** 切换是否使用固定 UA 登录 */
  onUAChange = () => {
    const { isCommonUA } = this.state
    const next = !isCommonUA

    setStorage(`${NAMESPACE}|isCommonUA`, next)
    this.setState({
      isCommonUA: next
    })

    this.reset()
  }

  get cookieString() {
    return Object.keys(this.cookie)
      .map(item => `${item}=${this.cookie[item]}`)
      .join('; ')
      .trim()
  }

  renderPreview() {
    return (
      <Preview
        onLogin={this.onPreviewLogin}
        onTour={() =>
          confirm(
            `将使用开发者的测试账号, 提供大部分功能预览, 确定${i18n.login()}? (可以在设置里面退出${i18n.login()})`,
            this.onTour,
            '提示'
          )
        }
      />
    )
  }

  renderForm() {
    const { navigation } = this.props
    const { host, email, password, captcha, base64, isCommonUA, loading, info, failed } = this.state
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
        failed={failed}
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
        <View style={_.container.flex}>{clicked ? this.renderForm() : this.renderPreview()}</View>
        {clicked ? (
          !focus && (
            <View style={this.styles.ps}>
              <Text size={12} lineHeight={14} type='sub'>
                隐私策略: 我们十分尊重您的隐私, 我们不会收集上述信息. (多次
                {i18n.login()}失败后可能一段时间内不能再次{i18n.login()})
              </Text>
            </View>
          )
        ) : (
          <Flex style={this.styles.old} justify='around'>
            {!WEB && (
              <Touchable
                onPress={() => {
                  t('登陆.跳转', {
                    to: 'Signup'
                  })

                  confirm(
                    // eslint-disable-next-line max-len
                    '声明: 本APP的性质为第三方，只提供显示数据和简单的操作，没有修复和改变源站业务的能力。 \n\n在移动端浏览器注册会经常遇到验证码错误，碰到错误建议在浏览器里使用 [电脑版UA]，再不行推荐使用电脑Chrome注册。 \n\n注册后会有 [激活码] 发到邮箱，测试过只会发送一次，请务必在激活有效时间内激活，否则这个注册账号就废了。输入激活码前，看见下方的文字改变了再填入，提示服务不可用的请务必等到浏览器加载条完成，不然永远都会说激活码错误。\n\n作者只能帮大家到这里了。',
                    () => open(`${HOST}/signup`),
                    '提示',
                    FROZEN_FN,
                    '前往注册'
                  )
                }}
              >
                <Flex justify='center'>
                  <Text size={11} type='sub' bold>
                    注册
                  </Text>
                  <Iconfont style={_.ml.xxs} name='md-open-in-new' color={_.colorSub} size={12} />
                </Flex>
                <Heatmap id='登陆.跳转' to='Signup' alias='注册' />
              </Touchable>
            )}
            <Touchable
              onPress={() => {
                t('登陆.跳转', {
                  to: 'Privacy'
                })

                open(URL_PRIVACY)
              }}
            >
              <Flex justify='center'>
                <Text size={11} type='sub' bold>
                  隐私保护政策
                </Text>
                <Iconfont style={_.ml.xxs} name='md-open-in-new' color={_.colorSub} size={12} />
              </Flex>
              <Heatmap id='登陆.跳转' to='Privacy' alias='隐私保护政策' />
            </Touchable>
            {!WEB && (
              <Text
                size={11}
                bold
                type='sub'
                onPress={() => {
                  t('登陆.跳转', {
                    to: 'LoginAssist'
                  })

                  const { navigation } = this.props
                  navigation.push('LoginAssist')
                }}
              >
                辅助{i18n.login()}
                <Heatmap id='登陆.跳转' to='LoginAssist' alias='辅助登录' />
              </Text>
            )}
          </Flex>
        )}
      </>
    )
  }

  render() {
    return (
      <Component id='screen-login-v2' style={_.container.plain}>
        <StatusBarPlaceholder />
        {WEB && (
          <Notice style={_.mv.lg}>当前网页版{i18n.login()}功能尚未实装，本页面仅供查看使用</Notice>
        )}
        {this.renderContent()}
        <KeyboardSpacer topSpacing={_.ios(-120, 0)} />
        <Heatmap id='登陆.登陆' right={_.wind} bottom={_.bottom + 120} transparent />
        <Heatmap id='登陆.成功' right={_.wind} bottom={_.bottom + 86} transparent />
        <Heatmap id='登陆.错误' right={_.wind} bottom={_.bottom + 52} transparent />
        <Heatmap id='登陆' screen='Login' />
      </Component>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default ob(LoginV2)
