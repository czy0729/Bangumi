/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * iOS 密码登录: 只实现「请求怎么发」
 * - IPA: 原生不跟随跳转 (./ios/native)
 * - Expo Go: 临时借用支持者节点 (./ios/supporter)
 * - 旧登录态清理: 系统 cookie 探测 (./ios/probe)
 */
import { axiosWithProxy, axiosWithProxyRedirect, getProxyStrategy } from '@utils/proxy'
import { axios } from '@utils/thirdParty'
import { readRedirectTarget } from '../shared/redirect'
import { getAuthorizeUrl, PasswordLoginServiceBase } from './base'
import { hasNativeNoRedirect, nativeRequest } from './ios/native'
import { probeSystemSession } from './ios/probe'
import { createSupporterSwitch } from './ios/supporter'

import type { LoginResponse } from '../types'

export class IosLoginService extends PasswordLoginServiceBase {
  private readonly supporter = createSupporterSwitch()

  get canCaptureAuth(): boolean {
    return !!this.getNoRedirectMode()
  }

  /** IPA 自带原生实现; Expo Go 借用内置节点 */
  applySupporter(): boolean {
    if (hasNativeNoRedirect()) return true

    return this.supporter.apply()
  }

  restoreProxy() {
    this.supporter.restore()
  }

  probeHome() {
    return probeSystemSession({ host: this.host, userAgent: this.userAgent })
  }

  /** 节点优先, 其次原生能力; 都没有则当前路径不可用 */
  protected getNoRedirectMode(): string {
    const strategy = getProxyStrategy()
    if (strategy.enabled && strategy.rewriteHeaders && !!strategy.host) return 'true'

    return hasNativeNoRedirect() ? 'native' : ''
  }

  protected sendLoginRequest(config: {
    headers: Record<string, string>
    data: string
  }): Promise<LoginResponse> {
    const url = `${this.host}/FollowTheRabbit`

    // IPA: 原生不跟随跳转
    if (this.getNoRedirectMode() === 'native') {
      return nativeRequest({
        url,
        method: 'post',
        headers: config.headers,
        data: config.data
      })
    }

    return axiosWithProxy<LoginResponse>(
      axios,
      {
        method: 'post',
        url,
        headers: config.headers,
        data: config.data
      },
      true
    )
  }

  protected sendAuthorizePage(headers: Record<string, string>): Promise<LoginResponse> {
    const url = getAuthorizeUrl(this.host)

    // IPA: 已授权时直接从 302 的 location 取 code
    if (this.getNoRedirectMode() === 'native') {
      return nativeRequest({ url, method: 'get', headers })
    }

    return this.request({ method: 'get', url, headers }, { allowPathChange: true })
  }

  protected async sendAuthorize(config: {
    headers: Record<string, string>
    data: string
  }): Promise<string> {
    const url = getAuthorizeUrl(this.host)

    // IPA: 原生不跟随跳转, 从 302 的 location 读 code
    if (this.getNoRedirectMode() === 'native') {
      const response = await nativeRequest({
        url,
        method: 'post',
        headers: config.headers,
        data: config.data
      })

      return readRedirectTarget(response.data, response.headers)
    }

    const requestConfig = {
      method: 'post',
      maxRedirects: 0,
      validateStatus: null,
      timeout: 12000,
      url,
      headers: config.headers,
      data: config.data
    }
    try {
      const { redirectUrl } = await axiosWithProxyRedirect(axios, requestConfig, true)

      return redirectUrl
    } catch (error) {
      return readRedirectTarget(
        undefined,
        (error as { response?: LoginResponse })?.response?.headers
      )
    }
  }
}
