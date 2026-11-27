/*
 * @Author: czy0729
 * @Date: 2026-10-23 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 05:09:18
 *
 * 登录链路请求: User-Agent / 表单码 / 验证码 / 密码登录 / 授权 code / access_token
 */
import Constants from 'expo-constants'
import { INIT_ACCESS_TOKEN } from '@stores/user/init'
import { getFormhash, getTimestamp, urlStringify } from '@utils'
import {
  axiosWithProxy,
  axiosWithProxyRedirect,
  parseOAuthCode,
  parseSetCookieHeader
} from '@utils/proxy'
import { axios } from '@utils/thirdParty'
import { APP_ID, APP_SECRET, URL_OAUTH_REDIRECT } from '@constants'
import { sanitizeServiceError, serviceError } from './passkey/errors'
import {
  accessTokenResponse,
  assertRequestOrigin,
  directOAuthCode,
  isSameOrigin,
  isSameOriginPath
} from './passkey/protocol'
import { BROWSER_HEADERS, DIRECT_TIMEOUT_MS } from './shared/constants'
import { mergeSetCookie, stringifyCookie } from './shared/cookie'
import { buildHeaders } from './shared/headers'
import { readRedirectTarget, resolveLogoutUrl } from './shared/redirect'
import { UA_EKIBUN_BANGUMI_APP } from './ds'

import type { AccessToken } from '@stores/user/types'
import type { ProxyRequestConfig } from '@utils/proxy/types'
import type { Cookie, LoginResponse } from './types'

/** 登录请求的传输模式 */
type LoginTransport = {
  /** 直连主站并自行管理 Cookie，绕过节点反代 */
  direct?: boolean

  /** 每次异步操作后检查本次登录是否仍有效 */
  assertActive?: () => void
}

/** 一次登录流程内的请求状态 (cookie / 表单码 / code / token) */
export class LoginService {
  /** 登录使用的域名 */
  host: string

  /** 请求使用的 User-Agent */
  userAgent = ''

  protected _formhash = ''

  protected _cookie: Cookie = { chii_theme: 'dark' }

  protected _code = ''

  private _accessToken: AccessToken = INIT_ACCESS_TOKEN

  /** 直连模式下请求必须归属的来源 */
  private readonly directOrigin: string

  constructor(host: string, private readonly transport: LoginTransport = {}) {
    this.host = host
    this.directOrigin = host
  }

  /** 是否直连主站 */
  protected get isDirect(): boolean {
    return !!this.transport.direct
  }

  /** 检查本次登录是否仍有效，密码链路为空操作 */
  protected assertActive() {
    try {
      this.transport.assertActive?.()
    } catch {
      throw serviceError('E_PASSKEY_CANCELLED')
    }
  }

  /**
   * 发送一次登录请求
   *
   * @param config 请求配置
   * @param options 是否允许最终地址换路径
   */
  protected async request<T = string>(
    config: ProxyRequestConfig,
    options: { allowPathChange?: boolean } = {}
  ): Promise<LoginResponse<T>> {
    if (!this.isDirect) return axiosWithProxy<LoginResponse<T>>(axios, config, true)
    this.assertActive()
    try {
      assertRequestOrigin(config.url, this.directOrigin)
      const response = await axios<T>({
        ...config,
        timeout: typeof config.timeout === 'number' ? config.timeout : DIRECT_TIMEOUT_MS,
        withCredentials: false,
        validateStatus: () => true,
        headers: {
          ...config.headers,
          Cookie: this.cookieString,
          'User-Agent': this.userAgent,
          Origin: this.directOrigin,
          Referer: `${this.directOrigin}/login`
        }
      } as never)
      this.assertActive()
      // 自动跟随的 302 没有逐跳校验；最终地址缺失或跨出主站都不接受响应
      const finalUrl = (response as LoginResponse<T>).request?.responseURL
      if (!finalUrl) throw serviceError('E_PASSKEY_FINAL_URL')
      if (!isSameOrigin(finalUrl, this.directOrigin)) {
        throw serviceError('E_PASSKEY_REDIRECT')
      }
      if (!options.allowPathChange && !this.isSameTarget(finalUrl, config.url)) {
        throw serviceError('E_PASSKEY_REDIRECT')
      }
      this.updateCookie(parseSetCookieHeader(response.headers))

      return response
    } catch (error) {
      this.assertActive()
      throw sanitizeServiceError(error, 'E_PASSKEY_NETWORK')
    }
  }

  /**
   * 最终地址是否仍是同一个接口
   *
   * @param finalUrl 最终地址
   * @param requestUrl 请求地址
   */
  private isSameTarget(finalUrl: string, requestUrl: string): boolean {
    try {
      return isSameOriginPath(finalUrl, requestUrl)
    } catch {
      return false
    }
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
    return stringifyCookie(this._cookie)
  }

  /** 重建本次登录的 cookie, 同时清空表单码、code 与 token */
  reset() {
    this._cookie = {
      chii_theme: 'dark'
    }
    this._formhash = ''
    this._code = ''
    this._accessToken = { ...INIT_ACCESS_TOKEN }
  }

  /**
   * 获取 User-Agent
   *
   * @param isCommonUA 是否使用固定 UA
   */
  async fetchUserAgent(isCommonUA: boolean) {
    this.assertActive()
    let userAgent = isCommonUA ? UA_EKIBUN_BANGUMI_APP : await Constants.getWebViewUserAgentAsync()
    // Dalvik/okhttp 这类非浏览器 UA 会被站点当成脚本请求, 拿不到会话 cookie
    if (!/mozilla\/.*applewebkit/i.test(userAgent)) userAgent = UA_EKIBUN_BANGUMI_APP

    this.assertActive()
    this.userAgent = userAgent
  }

  /** 从页面 HTML 里提取登出地址, 统一成绝对地址 */
  protected logoutUrl(html: string): string {
    return resolveLogoutUrl(this.host, html)
  }

  /** 获取表单 hash */
  async fetchFormHash() {
    if (!this._cookie.chii_sid) await this.bootstrapSession()

    const { data, headers } = await this.request({
      method: 'get',
      // 带随机参数绕过站点访客缓存, 否则响应不带会话 cookie
      url: `${this.host}/login?${new Date().getTime()}`,
      headers: { ...this.getHeaders(['User-Agent', 'Cookie']), ...BROWSER_HEADERS }
    })
    this.assertActive()
    this.updateCookie(parseSetCookieHeader(headers))
    if (this.isDirect && typeof data !== 'string') throw serviceError('E_PASSKEY_INVALID_RESPONSE')

    this._formhash = getFormhash(typeof data === 'string' ? data : '')
  }

  /**
   * 建立访客 session
   * - 访问设置页, 顺带吸收会话 cookie (该页不受访客缓存影响)
   * - 若仍处于登录态, 按页面里的登出链接退出
   */
  protected async bootstrapSession() {
    const home = await this.request({
      method: 'get',
      url: `${this.host}/settings`,
      headers: { ...this.getHeaders(['User-Agent', 'Cookie']), ...BROWSER_HEADERS }
    })
    this.updateCookie(parseSetCookieHeader(home.headers))

    if (typeof home.data !== 'string' || !home.data.includes('class="logout"')) return

    const url = this.logoutUrl(home.data)
    if (!url) return

    const logout = await this.request({
      method: 'get',
      url,
      headers: { ...this.getHeaders(['User-Agent', 'Cookie']), ...BROWSER_HEADERS }
    })
    this.updateCookie(parseSetCookieHeader(logout.headers))
  }

  /** 获取授权表单码 */
  async fetchAuthorizeFormHash() {
    const authorizeUrl = `${this.host}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`
    const response = await this.request(
      {
        method: 'get',
        url: authorizeUrl,
        headers: {
          ...this.getHeaders(['User-Agent', 'Cookie'])
        }
      },
      { allowPathChange: true }
    )
    this.assertActive()
    if (this.isDirect && this.resolveDirectCode(response)) return

    // 已授权过时, 节点/原生会把 302 转成 200 + JSON location; HTML 页面里的脚本不算
    const redirect = readRedirectTarget(response.data, response.headers)
    if (redirect) {
      const code = parseOAuthCode(redirect)
      if (code) {
        this._code = code
        return
      }
    }

    this._formhash = getFormhash(response.data)
    if (this.isDirect && !this._formhash) throw serviceError('E_PASSKEY_OAUTH')
  }

  /** 授权获取 code */
  async authorize() {
    this.assertActive()
    if (this._code) return

    if (this.isDirect) {
      await this.authorizeDirect()
      return
    }

    const config = {
      method: 'post',
      maxRedirects: 0,
      validateStatus: null,
      timeout: 12000,
      url: `${this.host}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
      headers: {
        ...this.getHeaders(['User-Agent', 'Cookie', 'Content-Type'])
      },
      data: urlStringify({
        formhash: this._formhash,
        redirect_uri: '',
        client_id: APP_ID,
        submit: '授权'
      })
    }
    try {
      const { redirectUrl } = await axiosWithProxyRedirect(axios, config, true)
      this._code = parseOAuthCode(redirectUrl)
    } catch (error) {
      // 密码路径保留原有节点重定向兜底
      this._code = parseOAuthCode(
        readRedirectTarget(undefined, (error as { response?: LoginResponse })?.response?.headers)
      )
    }
    if (!this._code) throw new Error('授权失败: 无法从重定向 URL 提取 code')
  }

  /**
   * 直连提交授权表单；XHR 会自行跟随 302，从最终地址取 code
   */
  private async authorizeDirect() {
    const response = await this.request(
      {
        method: 'post',
        timeout: 12000,
        url: `${this.host}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
        headers: this.getHeaders(['User-Agent', 'Cookie', 'Content-Type']),
        data: urlStringify({
          formhash: this._formhash,
          redirect_uri: '',
          client_id: APP_ID,
          submit: '授权'
        }),
        responseType: 'text'
      },
      { allowPathChange: true }
    )
    this.assertActive()
    const redirect =
      response.headers?.location ||
      response.headers?.Location ||
      response.request?.responseURL ||
      ''
    this._code = directOAuthCode(redirect, URL_OAUTH_REDIRECT)
  }

  /**
   * 直连在已授权时会直达 redirect_uri，直接从最终地址取 code
   *
   * @param response 授权页响应
   */
  private resolveDirectCode(response: LoginResponse): boolean {
    const redirect =
      response.headers?.location || response.headers?.Location || response.request?.responseURL
    if (!redirect || this.isAuthorizePage(redirect)) return false
    this._code = directOAuthCode(redirect, URL_OAUTH_REDIRECT)

    return true
  }

  /**
   * 地址是否仍停留在授权页
   *
   * @param url 重定向或最终地址
   */
  private isAuthorizePage(url: string): boolean {
    const absolute =
      url.startsWith('/') && !url.startsWith('//') ? `${this.directOrigin}${url}` : url
    try {
      return isSameOriginPath(absolute, `${this.directOrigin}/oauth/authorize`)
    } catch {
      return false
    }
  }

  /** code 换 access_token */
  async fetchAccessToken() {
    const { status, data } = await this.request<AccessToken>({
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
    })
    this.assertActive()
    if (status !== 200) throw new TypeError(String(status))
    this._accessToken = this.isDirect ? accessTokenResponse(data) : data
  }

  /**
   * 组装请求头
   *
   * @param keys 需要的头, 缺省则全部不带
   */
  protected getHeaders(keys: string[] = []) {
    return buildHeaders(
      { userAgent: this.userAgent, cookie: this.cookieString, host: this.host },
      keys
    )
  }

  /**
   * 更新 set-cookie (反代/节点可能返回多条, 只保留登录相关 key)
   *
   * @param setCookie Set-Cookie 原始串
   */
  protected updateCookie(setCookie: string = '') {
    this._cookie = mergeSetCookie(this._cookie, setCookie, this.isDirect)
  }
}
