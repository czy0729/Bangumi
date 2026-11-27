/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * 用系统 cookie 存储检查服务端登录态, 已登录则按页面里的登出链接退出
 */
import { logger } from '@utils/dev'
import { axiosWithProxy, getProxyStrategy } from '@utils/proxy'
import { axios } from '@utils/thirdParty'
import { NAMESPACE, UA_EKIBUN_BANGUMI_APP } from '../../ds'
import { BROWSER_HEADERS, PROBE_TIMEOUT_MS } from '../../shared/constants'
import { resolveLogoutUrl } from '../../shared/redirect'

import type { LoginResponse } from '../../types'

/**
 * 探测并清理系统 cookie 里的旧登录态
 *
 * @param params host / 当前 UA
 */
export async function probeSystemSession(params: {
  host: string
  userAgent: string
}): Promise<void> {
  const { host, userAgent } = params

  // 只有地址真被改写到节点时才跳过; 禁用代理 / 无节点时 URL 不变, 系统 cookie 仍有效
  const strategy = getProxyStrategy()
  if (strategy.enabled && strategy.host) return

  const headers = {
    ...BROWSER_HEADERS,
    'User-Agent': userAgent || UA_EKIBUN_BANGUMI_APP
  }

  try {
    const response = await axiosWithProxy<LoginResponse>(
      axios,
      {
        method: 'get',
        url: `${host}/settings`,
        timeout: PROBE_TIMEOUT_MS,
        withCredentials: true,
        headers
      },
      true
    )
    const { data } = response
    if (typeof data !== 'string' || !data.includes('class="logout"')) return

    const url = resolveLogoutUrl(host, data)
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
