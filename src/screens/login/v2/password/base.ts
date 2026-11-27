/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * 密码登录共享流程: 表单码 / 验证码 / 登录 / 授权 / token
 * 平台只负责「怎么把请求发出去」(302 由谁处理)
 */
import { getFormhash } from '@utils'
import { logger } from '@utils/dev'
import { parseOAuthCode, parseSetCookieHeader } from '@utils/proxy'
import { APP_ID, URL_OAUTH_REDIRECT, WEB } from '@constants'
import { NAMESPACE } from '../ds'
import { LoginService } from '../service'
import { BROWSER_HEADERS } from '../shared/constants'
import { readRedirectTarget, resolveLogoutUrl } from '../shared/redirect'
import {
  createAuthorizePayload,
  createLoginPayload,
  hasLoginRedirect,
  isFormHashInvalidPage
} from './shared'

import type { LoginResponse } from '../types'
import type { PasswordLoginService } from './types'

export abstract class PasswordLoginServiceBase
  extends LoginService
  implements PasswordLoginService
{
  abstract get canCaptureAuth(): boolean

  abstract applySupporter(): boolean

  abstract restoreProxy(): void

  abstract probeHome(): Promise<void>

  /** 登录 POST 的发送方式 */
  protected abstract sendLoginRequest(config: {
    headers: Record<string, string>
    data: string
  }): Promise<LoginResponse>

  /** 授权页 GET 的发送方式 */
  protected abstract sendAuthorizePage(headers: Record<string, string>): Promise<LoginResponse>

  /** 授权 POST 的发送方式, 返回可用于解析 code 的地址 */
  protected abstract sendAuthorize(config: {
    headers: Record<string, string>
    data: string
  }): Promise<string>

  async fetchFormHash() {
    if (!this._cookie.chii_sid) await this.bootstrapSession()

    const { data, headers } = await this.request({
      method: 'get',
      url: `${this.host}/login?${new Date().getTime()}`,
      headers: { ...this.getHeaders(['User-Agent', 'Cookie']), ...BROWSER_HEADERS }
    })
    this.assertActive()
    this.updateCookie(parseSetCookieHeader(headers))

    this._formhash = getFormhash(typeof data === 'string' ? data : '')
  }

  async fetchCaptcha(): Promise<string> {
    const { request, headers } = await this.request({
      method: 'get',
      url: `${this.host}/signup/captcha?${new Date().getTime()}${String(
        1 + Math.floor(Math.random() * 6)
      )}`,
      headers: this.getHeaders(['User-Agent', 'Cookie']),
      responseType: 'arraybuffer'
    })
    this.updateCookie(parseSetCookieHeader(headers))

    const base64: string = WEB
      ? window.btoa(String.fromCharCode(...new Uint8Array(request?.response as ArrayBuffer)))
      : (request?._response as string)

    if (!base64 || !/^(R0lGOD|iVBORw0KGgo|\/9j\/|UklGR)/.test(base64)) {
      throw new Error(`验证码返回非图片内容: ${String(base64).slice(0, 80)}`)
    }

    return `data:image/gif;base64,${base64}`
  }

  async login(email: string, password: string, captcha: string) {
    const noRedirect = this.getNoRedirectMode()

    const postLogin = async (): Promise<LoginResponse> =>
      this.sendLoginRequest({
        headers: {
          ...this.getHeaders(['User-Agent', 'Cookie', 'Content-Type', 'Referer']),
          ...BROWSER_HEADERS,
          Origin: this.host,
          ...(noRedirect ? { 'x-no-redirect': noRedirect } : {})
        },
        data: createLoginPayload({
          formhash: this._formhash,
          host: this.host,
          email,
          password,
          captcha
        })
      })

    const first = await postLogin()
    let { data, headers } = first

    this.updateCookie(parseSetCookieHeader(headers))

    if (isFormHashInvalidPage(data)) {
      const error = new Error('登录页校验失败') as Error & { code: string }
      error.code = 'E_LOGIN_FORMHASH'
      throw error
    }

    // 旧会话: 服务端直接返回已登录页面且没有新 chii_auth, 先登出再重试一次
    const redirected = hasLoginRedirect(data, headers, first.request?.responseURL)
    if (
      !redirected &&
      !this._cookie.chii_auth &&
      typeof data === 'string' &&
      data.includes('class="logout"')
    ) {
      const url = resolveLogoutUrl(this.host, data)
      if (url) {
        await this.request({
          method: 'get',
          url,
          headers: this.getHeaders(['User-Agent', 'Cookie'])
        })
      }

      this._cookie = { chii_theme: 'dark' }
      await this.fetchFormHash()

      const retry = await postLogin()
      data = retry.data
      headers = retry.headers

      this.updateCookie(parseSetCookieHeader(headers))
    }

    // 走到这里仍未拿到 chii_auth 才是真的失败 (旧会话重试成功不会记录)
    if (noRedirect === 'native' && !this._cookie.chii_auth) {
      logger.error(NAMESPACE, 'login.noChiiAuth', {
        mode: noRedirect,
        status: first.status,
        url: first.request?.responseURL
      })
    }

    return typeof data === 'string' ? data : ''
  }

  async fetchAuthorizeFormHash() {
    const mode = this.getNoRedirectMode()
    const response = await this.sendAuthorizePage({
      ...this.getHeaders(['User-Agent', 'Cookie']),
      ...BROWSER_HEADERS,
      ...(mode ? { 'x-no-redirect': mode } : {})
    })
    this.assertActive()

    const code = parseOAuthCode(readRedirectTarget(response.data, response.headers))
    if (code) {
      this._code = code

      return
    }

    this._formhash = getFormhash(response.data)
  }

  async authorize() {
    this.assertActive()
    if (this._code) return

    const mode = this.getNoRedirectMode()
    const redirect = await this.sendAuthorize({
      headers: {
        ...this.getHeaders(['User-Agent', 'Cookie', 'Content-Type']),
        ...BROWSER_HEADERS,
        ...(mode ? { 'x-no-redirect': mode } : {})
      },
      data: createAuthorizePayload(this._formhash)
    })
    this._code = parseOAuthCode(redirect)
    if (!this._code) throw new Error('授权失败: 无法从重定向 URL 提取 code')
  }

  /** 当前平台关闭自动跳转的方式 */
  protected abstract getNoRedirectMode(): string
}

/** 授权地址 */
export function getAuthorizeUrl(host: string): string {
  return `${host}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`
}
