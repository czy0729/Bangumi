/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * Android 密码登录: 只实现「请求怎么发」
 * - 302 由 OkHttp 拦截器 (x-no-redirect: native) 或 Worker 节点 (x-no-redirect: true) 处理
 */
import { logger } from '@utils/dev'
import { axiosWithProxy, axiosWithProxyRedirect, getProxyStrategy } from '@utils/proxy'
import { axios } from '@utils/thirdParty'
import { NAMESPACE, UA_EKIBUN_BANGUMI_APP } from '../ds'
import { BROWSER_HEADERS, PROBE_TIMEOUT_MS } from '../shared/constants'
import { readRedirectTarget, resolveLogoutUrl } from '../shared/redirect'
import { getAuthorizeUrl, PasswordLoginServiceBase } from './base'

import type { LoginResponse } from '../types'

export class AndroidLoginService extends PasswordLoginServiceBase {
  get canCaptureAuth(): boolean {
    return true
  }

  /** Android 无平台准备动作 */
  applySupporter(): boolean {
    return true
  }

  restoreProxy() {}

  /** 用系统 cookie 探测登录态 */
  async probeHome() {
    const strategy = getProxyStrategy()
    if (strategy.enabled && strategy.host) return

    const headers = {
      ...BROWSER_HEADERS,
      'User-Agent': this.userAgent || UA_EKIBUN_BANGUMI_APP
    }

    try {
      const response = await axiosWithProxy<LoginResponse>(
        axios,
        {
          method: 'get',
          url: `${this.host}/settings`,
          timeout: PROBE_TIMEOUT_MS,
          withCredentials: true,
          headers
        },
        true
      )
      const { data } = response
      if (typeof data !== 'string' || !data.includes('class="logout"')) return

      const url = resolveLogoutUrl(this.host, data)
      if (!url) return

      await axiosWithProxy<LoginResponse>(
        axios,
        {
          method: 'get',
          url,
          timeout: PROBE_TIMEOUT_MS,
          withCredentials: true,
          headers
        },
        true
      )
    } catch (error) {
      // 只记录失败原因, 不输出响应内容
      logger.error(NAMESPACE, 'probeHome', (error as Error)?.message || String(error))
    }
  }

  /** 节点优先, 否则交给原生 OkHttp 拦截器 */
  protected getNoRedirectMode(): string {
    const strategy = getProxyStrategy()

    return strategy.enabled && strategy.rewriteHeaders && !!strategy.host ? 'true' : 'native'
  }

  protected sendLoginRequest(config: {
    headers: Record<string, string>
    data: string
  }): Promise<LoginResponse> {
    return axiosWithProxy<LoginResponse>(
      axios,
      {
        method: 'post',
        url: `${this.host}/FollowTheRabbit`,
        headers: config.headers,
        data: config.data
      },
      true
    )
  }

  protected sendAuthorizePage(headers: Record<string, string>): Promise<LoginResponse> {
    return this.request(
      {
        method: 'get',
        url: getAuthorizeUrl(this.host),
        headers
      },
      { allowPathChange: true }
    )
  }

  protected async sendAuthorize(config: {
    headers: Record<string, string>
    data: string
  }): Promise<string> {
    const requestConfig = {
      method: 'post',
      maxRedirects: 0,
      validateStatus: null,
      timeout: 12000,
      url: getAuthorizeUrl(this.host),
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
