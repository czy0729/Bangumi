/*
 * @Author: czy0729
 * @Date: 2026-10-23 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 10:00:00
 *
 * 登录链路请求: User-Agent / 表单码 / 验证码 / 密码登录 / 授权 code / access_token
 */
import Constants from 'expo-constants'
import { INIT_ACCESS_TOKEN } from '@stores/user/init'
import { getFormhash, getTimestamp, urlStringify } from '@utils'
import {
  axiosWithProxy,
  axiosWithProxyRedirect,
  getRedirectFromHeaders,
  parseOAuthCode,
  parseSetCookieHeader
} from '@utils/proxy'
import { axios } from '@utils/thirdParty'
import { APP_ID, APP_SECRET, URL_OAUTH_REDIRECT, WEB } from '@constants'
import { UA_EKIBUN_BANGUMI_APP } from './ds'

import type { AccessToken } from '@stores/user/types'
import type { Cookie, CookieKey, LoginResponse } from './types'

/** 登录链路需要保留的 cookie key */
const COOKIE_KEYS: CookieKey[] = [
  'chii_auth',
  'chii_cookietime',
  'chii_sec',
  'chii_sec_id',
  'chii_sid',
  'chii_theme'
]

/** 一次登录流程内的请求状态 (cookie / 表单码 / code / token) */
export class LoginService {
  /** 登录使用的域名 */
  host: string

  /** 请求使用的 User-Agent */
  userAgent = ''

  private _formhash = ''

  private _cookie: Cookie = { chii_theme: 'dark' }

  private _code = ''

  private _accessToken: AccessToken = INIT_ACCESS_TOKEN

  constructor(host: string) {
    this.host = host
  }

  /** 密码登录是否成功 (以 chii_auth 下发为准) */
  get authorized(): boolean {
    return !!this._cookie.chii_auth
  }

  /** 授权得到的 access_token */
  get accessToken(): AccessToken {
    return this._accessToken
  }

  get cookieString(): string {
    return Object.entries(this._cookie)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ')
  }

  /** 重建本次登录的 cookie, 表单码与 code 保留给下一次登录流程复用 */
  reset() {
    this._cookie = {
      chii_theme: 'dark'
    }
  }

  /**
   * 获取 User-Agent
   *
   * @param isCommonUA 是否使用固定 UA
   */
  async fetchUserAgent(isCommonUA: boolean) {
    this.userAgent = isCommonUA ? UA_EKIBUN_BANGUMI_APP : await Constants.getWebViewUserAgentAsync()
  }

  /** 获取表单 hash */
  async fetchFormHash() {
    const { data, headers } = await axiosWithProxy<LoginResponse>(
      axios,
      {
        method: 'get',
        url: `${this.host}/login`,
        headers: this.getHeaders(['User-Agent'])
      },
      true
    )
    this.updateCookie(parseSetCookieHeader(headers))

    const match = data.match(/<input type="hidden" name="formhash" value="(.+?)">/)
    if (match) this._formhash = match[1]
  }

  /** 获取验证码, 返回图片 data URI */
  async fetchCaptcha(): Promise<string> {
    const { request, headers } = await axiosWithProxy<LoginResponse>(
      axios,
      {
        method: 'get',
        url: `${this.host}/signup/captcha?${new Date().getTime()}${String(
          1 + Math.floor(Math.random() * 6)
        )}`,
        headers: this.getHeaders(['User-Agent', 'Cookie']),
        responseType: 'arraybuffer'
      },
      true
    )
    this.updateCookie(parseSetCookieHeader(headers))

    const base64: string = WEB
      ? window.btoa(String.fromCharCode(...new Uint8Array(request?.response as ArrayBuffer)))
      : (request?._response as string)

    return `data:image/gif;base64,${base64}`
  }

  /**
   * 密码登录, 成功后 cookie 带上 chii_auth
   *
   * @param email 邮箱
   * @param password 密码
   * @param captcha 验证码
   */
  async login(email: string, password: string, captcha: string) {
    // 注: 当前依赖节点跟随跳转 (实测 bgm 直接返回 200 + Set-Cookie);
    // 若将来出现 302 上携带 Set-Cookie, 需改为 x-no-redirect 并读取重定向地址
    const postLogin = async (): Promise<LoginResponse> => {
      return axiosWithProxy<LoginResponse>(
        axios,
        {
          method: 'post',
          url: `${this.host}/FollowTheRabbit`,
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
    this.updateCookie(parseSetCookieHeader(headers))

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
      await this.fetchFormHash()

      const retry = await postLogin()
      data = retry.data
      headers = retry.headers

      // 重试结果同样先吸收
      this.updateCookie(parseSetCookieHeader(headers))
    }

    return data
  }

  /** 获取授权表单码 */
  async fetchAuthorizeFormHash() {
    const { data } = await axiosWithProxy<LoginResponse>(
      axios,
      {
        method: 'get',
        url: `${this.host}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
        headers: this.getHeaders(['User-Agent', 'Cookie'])
      },
      true
    )
    this._formhash = getFormhash(data)
  }

  /** 授权获取 code */
  async authorize() {
    try {
      const { redirectUrl } = await axiosWithProxyRedirect(
        axios,
        {
          method: 'post',
          maxRedirects: 0,
          validateStatus: null,
          timeout: 12000,
          url: `${this.host}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
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

      this._code = parseOAuthCode(redirectUrl)
    } catch (error) {
      // 降级: 尝试从错误响应中提取
      this._code = parseOAuthCode(
        getRedirectFromHeaders((error as { response?: LoginResponse })?.response?.headers)
      )
    }

    if (!this._code) throw new Error('授权失败: 无法从重定向 URL 提取 code')
  }

  /** code 换 access_token */
  async fetchAccessToken() {
    const { status, data } = await axiosWithProxy<LoginResponse<AccessToken>>(
      axios,
      {
        method: 'post',
        maxRedirects: 0,
        validateStatus: null,
        url: `${this.host}/oauth/access_token`,
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
  }

  /**
   * 组装请求头
   *
   * @param keys 需要的头, 缺省则全部不带
   */
  private getHeaders(keys: string[] = []) {
    const headers: Record<string, string> = {}
    if (keys.includes('User-Agent')) headers['User-Agent'] = this.userAgent
    if (keys.includes('Cookie')) headers['Cookie'] = this.cookieString
    if (keys.includes('Content-Type')) headers['Content-Type'] = 'application/x-www-form-urlencoded'
    if (keys.includes('Referer')) headers['Referer'] = `${this.host}/login`

    return headers
  }

  /**
   * 更新 set-cookie (反代/节点可能返回多条, 只保留登录相关 key)
   *
   * @param setCookie Set-Cookie 原始串
   */
  private updateCookie(setCookie: string = '') {
    if (!setCookie) return

    setCookie.split(/,\s*/).forEach(cookie => {
      const [keyValue] = cookie.split(';')
      const [key, value] = keyValue.trim().split('=')
      if (!COOKIE_KEYS.includes(key as CookieKey)) return

      if (value === 'delete' || value === 'deleted') {
        delete this._cookie[key as CookieKey]
      } else {
        this._cookie[key as CookieKey] = value
      }
    })
  }
}
