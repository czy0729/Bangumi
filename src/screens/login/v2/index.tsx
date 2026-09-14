/*
 * @Author: czy0729
 * @Date: 2019-06-30 15:48:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 09:02:48
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import Constants from 'expo-constants'
import { Component, KeyboardSpacer } from '@components'
import { Notice, StatusBarPlaceholder } from '@_'
import { _, rakuenStore, usersStore, userStore } from '@stores'
import { INIT_ACCESS_TOKEN } from '@stores/user/init'
import {
  confirm,
  feedback,
  getFormhash,
  getStorage,
  getTimestamp,
  info,
  setStorage,
  urlStringify
} from '@utils'
import { logger } from '@utils/dev'
import { hm, queue, t } from '@utils/fetch'
import { get } from '@utils/kv'
import {
  axiosWithProxy,
  axiosWithProxyRedirect,
  getRedirectFromHeaders,
  parseOAuthCode,
  parseSetCookieHeader
} from '@utils/proxy'
import { axios } from '@utils/thirdParty'
import { APP_ID, APP_SECRET, HOST, URL_OAUTH_REDIRECT, WEB } from '@constants'
import i18n from '@constants/i18n'
import { confirmDownloadSetting } from '@screens/user/setting/component/system/utils'
import { HOST_PROXY } from '@src/config'
import Extra from './component/extra'
import Footer from './component/footer'
import Form from './component/form'
import Notify from './component/notify'
import Preview from './component/preview'
import { AUTH_RETRY_COUNT, NAMESPACE, UA_EKIBUN_BANGUMI_APP } from './ds'

import type { InputInstance } from '@components'
import type { AccessToken } from '@stores/user/types'
import type { NavigationProps } from '@types'
import type { ChangeField, LoginResponse, LoginState } from './ds'

/** 账号密码登录 */
class LoginV2 extends React.Component<NavigationProps> {
  state: LoginState = {
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
    failed: false,
    networkFailed: false
  }

  private _userAgent = ''
  private _formhash = ''
  private _lastCaptcha = ''
  private _cookie: {
    chii_theme?: string
    chii_auth?: string
  } = {}
  private _code = ''
  private _accessToken: AccessToken = INIT_ACCESS_TOKEN
  private _retryCount = 0
  private _codeRef: InputInstance | null = null

  componentDidMount() {
    this.getLocalSetting()
    hm('login/v2', 'LoginV2')
  }

  /** 恢复本地数据 */
  getLocalSetting = async () => {
    const keys = [
      // 'host',
      'email',
      'password',
      // 'isCommonUA',
      'isSyncSetting'
    ] as const
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

    const { data, headers } = await axiosWithProxy<LoginResponse>(
      axios,
      {
        method: 'get',
        url: `${host}/login`,
        headers: this.getHeaders(['User-Agent'])
      },
      true
    )
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

    const { request, headers } = await axiosWithProxy<LoginResponse>(
      axios,
      {
        method: 'get',
        url: `${host}/signup/captcha?${new Date().getTime()}${String(
          1 + Math.floor(Math.random() * 6)
        )}`,
        headers: this.getHeaders(['User-Agent', 'Cookie']),
        responseType: 'arraybuffer'
      },
      true
    )
    this.getCookies(headers)

    const base64: string = WEB
      ? window.btoa(String.fromCharCode(...new Uint8Array(request?.response as ArrayBuffer)))
      : (request?._response as string)
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

    // 注: 当前依赖节点跟随跳转 (实测 bgm 直接返回 200 + Set-Cookie);
    // 若将来出现 302 上携带 Set-Cookie, 需改为 x-no-redirect 并读取重定向地址
    const postLogin = async (): Promise<LoginResponse> => {
      return axiosWithProxy<LoginResponse>(
        axios,
        {
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
        },
        true
      )
    }

    let { data, headers } = await postLogin()

    // 先吸收本次响应的 cookie: 登录成功的页面同样含登出入口, 不能只看页面判断
    this.getCookies(headers)

    // 本机已有有效 session: 服务端直接返回已登录页面, 本次不会下发新的 chii_auth
    // 需要先主动登出清除 session, 再重新请求登录
    if (!this._cookie.chii_auth && data.includes('class="logout"')) {
      const logoutMatch = data.match(/href="([^"]*\/logout\/[^"]*)"/)
      if (logoutMatch) {
        await axiosWithProxy<LoginResponse>(
          axios,
          {
            method: 'get',
            url: logoutMatch[1],
            headers: this.getHeaders(['User-Agent', 'Cookie'])
          },
          true
        )
      }

      this._cookie = { chii_theme: 'dark' }
      await this.getFormHash()

      const retry = await postLogin()
      data = retry.data
      headers = retry.headers

      // 重试结果同样先吸收
      this.getCookies(headers)
    }

    if (data.includes('分钟内您将不能登录本站')) {
      info(`累计 5 次错误尝试，15 分钟内您将不能${i18n.login()}本站。`)
    }

    return true
  }

  /** 获取授权表单码 */
  oauth = async () => {
    this.setState({
      info: '获取授权表单码...(2/5)'
    })

    const { host } = this.state

    const { data } = await axiosWithProxy<LoginResponse>(
      axios,
      {
        method: 'get',
        url: `${host}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
        headers: this.getHeaders(['User-Agent', 'Cookie'])
      },
      true
    )
    this._formhash = getFormhash(data)

    return true
  }

  /** 授权获取 code */
  authorize = async () => {
    this.setState({
      info: '授权中...(3/5)'
    })

    const { host } = this.state

    try {
      const { redirectUrl } = await axiosWithProxyRedirect(
        axios,
        {
          method: 'post',
          maxRedirects: 0,
          validateStatus: null,
          timeout: 12000,
          url: `${host}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
          headers: this.getHeaders(['User-Agent', 'Cookie', 'Content-Type']),
          data: urlStringify({
            formhash: this._formhash,
            redirect_uri: '',
            client_id: APP_ID,
            submit: '授权'
          })
        },
        true
      )

      // 从重定向 URL 提取 code
      this._code = parseOAuthCode(redirectUrl)

      if (!this._code) {
        throw new Error('授权失败: 无法从重定向 URL 提取 code')
      }
    } catch (error) {
      // 降级：尝试从错误响应中提取
      if (!this._code) {
        const errResp = (error as { response?: LoginResponse })?.response
        this._code = parseOAuthCode(getRedirectFromHeaders(errResp?.headers))
      }

      if (!this._code) {
        throw new Error('授权失败: 无法从重定向 URL 提取 code')
      }
    }

    return true
  }

  /** code 获取 access_token */
  getAccessToken = async () => {
    this.setState({
      info: '授权成功, 获取token中...(4/5)'
    })

    const { host } = this.state

    const { status, data } = await axiosWithProxy<LoginResponse<AccessToken>>(
      axios,
      {
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
      },
      true
    )
    if (status !== 200) throw new TypeError(String(status))

    this._accessToken = data

    return true
  }

  /** 获取请求头 */
  getHeaders = (keys: string[] = []) => {
    const headers: Record<string, string> = {}
    if (keys.includes('User-Agent')) headers['User-Agent'] = this._userAgent
    if (keys.includes('Cookie')) headers['Cookie'] = this.cookieString
    if (keys.includes('Content-Type')) headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (keys.includes('Referer')) headers['Referer'] = `${this.state.host}/login`
    return headers
  }

  /** 获取 cookie (反代/节点可能返回多条 Set-Cookie, 统一取全部) */
  getCookies = (headers: Record<string, unknown> = {}) => {
    this.updateCookie(parseSetCookieHeader(headers))
  }

  /** 更新 set-cookie */
  updateCookie = (setCookie: string = '') => {
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
        if (value === 'delete' || value === 'deleted') {
          delete this._cookie[key]
        } else {
          this._cookie[key] = value
        }
      }
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
        () => userStore.fetchUserSetting(),
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
    try {
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
    } catch {
      this.setState({
        loading: false,
        info: '连接主站失败，获取验证码失败',
        networkFailed: true
      })
    }
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
          `[${String(ex)}] ${i18n.login()}失败，请重试或重启客户端，或前往授权${i18n.login()} →`
        )
        return
      }

      logger.error(NAMESPACE, 'onLogin', ex)
      this.onLogin()
    }
  }

  /** 游客访问 */
  onTour = async () => {
    t('登陆.游客访问')

    try {
      info('正在从 github 获取游客 cookie...')

      const { accessToken, userCookie } = await get<{
        accessToken: AccessToken
        userCookie: { cookie: string; userAgent: string }
      }>('tourist')
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
      logger.error(NAMESPACE, 'onTour', error)
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
  onChange = (evt: { nativeEvent: { text: string } }, type: ChangeField) => {
    let { text } = evt.nativeEvent
    if (type === 'captcha') text = text.replace(/ /g, '')

    const next: Partial<LoginState> = { info: '' }
    next[type] = text
    this.setState(next)
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
      failed,
      networkFailed
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
        networkFailed={networkFailed}
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

export default observer(LoginV2)
