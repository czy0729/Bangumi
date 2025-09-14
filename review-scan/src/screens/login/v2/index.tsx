/*
 * @Author: czy0729
 * @Date: 2019-06-30 15:48:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-14 16:57:13
 */
import React from 'react'
import { View } from 'react-native'
import cheerio from 'cheerio-without-node-native'
import Constants from 'expo-constants'
import { Component, KeyboardSpacer } from '@components'
import { Notice, StatusBarPlaceholder } from '@_'
import { _, rakuenStore, usersStore, userStore } from '@stores'
import { confirm, feedback, getStorage, getTimestamp, info, setStorage, urlStringify } from '@utils'
import { ob } from '@utils/decorators'
import { hm, queue, t } from '@utils/fetch'
import { get } from '@utils/kv'
import axios from '@utils/thirdParty/axios'
import { APP_ID, APP_SECRET, HOST, URL_OAUTH_REDIRECT, WEB } from '@constants'
import i18n from '@constants/i18n'
import { confirmDownloadSetting } from '@screens/user/setting/component/system/utils'
import { HOST_PROXY } from '@src/config'
import { NavigationProps } from '@types'
import Extra from './component/extra'
import Footer from './component/footer'
import Form from './component/form'
import Notify from './component/notify'
import Preview from './component/preview'
import { AUTH_RETRY_COUNT, NAMESPACE, UA_EKIBUN_BANGUMI_APP } from './ds'

/** 账号密码登录 */
class LoginV2 extends React.Component<NavigationProps> {
  state = {
    host: WEB ? HOST_PROXY : HOST,
    clicked: false,
    email: '',
    password: '',
    captcha: '',
    base64: '',
    isCommonUA: false,
    isSyncSetting: false,
    loading: false,
    info: '',
    focus: false,
    failed: false
  }

  private _userAgent = ''
  private _formhash = ''
  private _lastCaptcha = ''
  private _cookie: {
    chii_theme?: string
    chii_auth?: string
  } = {}
  private _code = ''
  private _accessToken = {}
  private _retryCount = 0
  private _codeRef = null

  componentDidMount() {
    this.getLocalSetting()
    hm('login/v2', 'LoginV2')
  }

  /** 恢复本地数据 */
  getLocalSetting = async () => {
    const keys = ['host', 'email', 'password', 'isCommonUA', 'isSyncSetting'] as const
    const values = await Promise.all(keys.map(key => getStorage(`${NAMESPACE}|${key}`)))
    const state = keys.reduce((acc, key, index) => {
      // 只有 truthy 值才添加到 state
      if (values[index]) acc[key] = values[index]
      return acc
    }, {})
    this.setState(state, this.reset)
  }

  /** 获取 userAgent */
  getUA = async () => {
    this._userAgent = this.state.isCommonUA
      ? UA_EKIBUN_BANGUMI_APP
      : await Constants.getWebViewUserAgentAsync()
    return true
  }

  /** 获取表单 hash */
  getFormHash = async () => {
    const { host } = this.state

    // @ts-expect-error
    axios.defaults.withCredentials = false

    // @ts-expect-error
    const { data, headers } = await axios({
      method: 'get',
      url: `${host}/login`,
      headers: this.getHeaders(['User-Agent'])
    })
    this.getCookies(headers)

    const match = data.match(/<input type="hidden" name="formhash" value="(.+?)">/)
    if (match) this._formhash = match[1]

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
    const { request, headers } = await axios({
      method: 'get',
      url: `${host}/signup/captcha?${new Date().getTime()}${String(
        1 + Math.floor(Math.random() * 6)
      )}`,
      headers: this.getHeaders(['User-Agent', 'Cookie']),
      responseType: 'arraybuffer'
    })
    this.getCookies(headers)

    const base64: string = WEB
      ? btoa(String.fromCharCode.apply(null, new Uint8Array(request.response)))
      : request._response
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
        formhash: this._formhash,
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
    this._formhash = cheerio.load(data)('input[name=formhash]').attr('value')

    return true
  }

  /** 授权获取 code */
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
        formhash: this._formhash,
        redirect_uri: '',
        client_id: APP_ID,
        submit: '授权'
      })
    })
    this._code = request?.responseURL?.split('=').slice(1).join('=')

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
        code: this._code,
        redirect_uri: URL_OAUTH_REDIRECT,
        state: getTimestamp()
      })
    })
    if (status !== 200) throw new TypeError(status)

    this._accessToken = data

    return true
  }

  /** 获取请求头 */
  getHeaders = (keys: string[] = []) => {
    const headers: Record<string, string> = {}
    if (keys.includes('User-Agent')) headers[WEB ? 'X-User-Agent' : 'User-Agent'] = this._userAgent
    if (keys.includes('Cookie')) headers[WEB ? 'X-Cookie' : 'Cookie'] = this.cookieString
    if (keys.includes('Content-Type')) headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (keys.includes('Referer')) headers['Referer'] = `${this.state.host}/login`
    return headers
  }

  /** 获取 cookie */
  getCookies = (headers = {}) => {
    this.updateCookie(WEB ? headers?.['x-set-cookie'] : headers?.['set-cookie']?.[0])
  }

  /** 更新 set-cookie */
  updateCookie = (setCookie = '') => {
    if (!setCookie) return

    const cookies = setCookie.split(/,\s*/)
    cookies.forEach(cookie => {
      const [keyValue] = cookie.split(';')
      const [key, value] = keyValue.trim().split('=')
      if (
        [
          'chii_auth',
          'chii_cookietime',
          'chii_sec',
          'chii_sec_id',
          'chii_sid',
          'chii_theme'
        ].includes(key)
      ) {
        if (value === 'delete') {
          delete this._cookie[key]
        } else {
          this._cookie[key] = value
        }
      }
    })

    console.log({
      cookie: this._cookie
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
      userAgent: this._userAgent,
      v: 0
    })
    userStore.updateAccessToken(this._accessToken)
    feedback()
    navigation.popToTop()
    t('登陆.成功')

    queue(
      [
        () => userStore.fetchUserInfo(),
        () => userStore.fetchUsersInfo(),
        () => {
          return this.state.isSyncSetting ? confirmDownloadSetting() : true
        },
        () => rakuenStore.fetchPrivacy(),
        () => usersStore.fetchFriends()
      ],
      1
    )
  }

  /** 重设 */
  reset = async () => {
    this._cookie = {
      chii_theme: 'dark'
    }
    this.setState({
      base64: ''
    })
    this._retryCount = 0

    await this.getUA()
    await this.getFormHash()
    await this.getCaptcha()
  }

  /** 登录流程 */
  onLogin = async () => {
    const { email, password, captcha } = this.state
    if (!email || !password || !captcha) {
      info('请填写以上字段')
      return
    }

    try {
      if (this._lastCaptcha !== captcha) {
        t('登陆.登陆')

        if (typeof this?._codeRef?.inputRef?.blur === 'function') {
          this._codeRef.inputRef.blur()
        }
        setStorage(`${NAMESPACE}|email`, email)

        await this.login()
        if (!this._cookie.chii_auth) {
          this.loginFail(`验证码或密码错误，稍会再重试或前往授权${i18n.login()} →`)
          return
        }

        // 缓存上次的正确的验证码
        this._lastCaptcha = captcha
        await this.oauth()
        await this.authorize()
      } else {
        this.setState({
          info: '重试 (4/5)'
        })
        this._retryCount += 1
      }

      await this.getAccessToken()
      setStorage(`${NAMESPACE}|password`, password)
      this.inStore()
    } catch (ex) {
      this._retryCount += 1
      if (this._retryCount >= AUTH_RETRY_COUNT) {
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

  /** 游客访问 */
  onTour = async () => {
    t('登陆.游客访问')

    try {
      info('正在从 github 获取游客 cookie...')

      const { accessToken, userCookie } = await get('tourist')
      userStore.updateAccessToken(accessToken)
      userStore.updateUserCookie({
        cookie: userCookie.cookie,
        userAgent: userCookie.userAgent,
        v: 0,
        tourist: 1
      })

      info(`${i18n.login()}成功, 正在请求个人信息...`, 6)
      feedback()
      userStore.fetchUserInfo()
      userStore.fetchUsersInfo()

      const { navigation } = this.props
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

  /** 输入框聚焦 */
  onFocus = () => {
    this.setState({
      focus: true
    })
  }

  /** 输入框失焦 */
  onBlur = () => {
    this.setState({
      focus: false
    })
  }

  /** 输入框变化 */
  onChange = (evt: { nativeEvent: any }, type: any) => {
    let { text } = evt.nativeEvent
    if (type === 'captcha') text = text.replace(/ /g, '')
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
    feedback(true)

    this.reset()
  }

  /** 切换是否自动同步设置 */
  onSyncSettingChange = () => {
    const { isSyncSetting } = this.state
    const next = !isSyncSetting

    setStorage(`${NAMESPACE}|isSyncSetting`, next)
    this.setState({
      isSyncSetting: next
    })
    feedback(true)
  }

  get cookieString() {
    return Object.entries(this._cookie)
      .map(([k, v]) => `${k}=${v}`)
      .join('; ')
  }

  renderPreview() {
    return (
      <Preview
        onLogin={this.onPreviewLogin}
        onTour={() => {
          confirm(
            `将使用开发者的测试账号, 提供大部分功能预览, 确定${i18n.login()}? (可以在设置里面退出${i18n.login()})`,
            this.onTour,
            '提示'
          )
        }}
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
      isSyncSetting,
      loading,
      info,
      failed
    } = this.state
    return (
      <Form
        forwardRef={ref => (this._codeRef = ref)}
        navigation={navigation}
        email={email}
        password={password}
        captcha={captcha}
        base64={base64}
        isCommonUA={isCommonUA}
        isSyncSetting={isSyncSetting}
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
        onSyncSettingChange={this.onSyncSettingChange}
        onLogin={this.onLogin}
      />
    )
  }

  renderContent() {
    const { navigation } = this.props
    const { clicked, focus } = this.state
    return (
      <>
        <View style={_.container.flex}>{clicked ? this.renderForm() : this.renderPreview()}</View>
        {clicked ? !focus && <Notify /> : <Footer navigation={navigation} />}
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
        <Extra />
      </Component>
    )
  }
}

export default ob(LoginV2)
