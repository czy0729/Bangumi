/*
 * @Author: czy0729
 * @Date: 2026-06-21 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 */
import { useCallback, useState } from 'react'
import { feedback } from '@utils'
import { logger } from '@utils/dev'
import { ping } from '@utils/fetch'
import { applyLainProxy, getProxyStrategy } from '@utils/proxy'
import { API_HOST, HOST, HOST_BGM_STATIC } from '@constants'
import { COMPONENT } from '../ds'

import type { PingStatus } from '../types'

/** Ping 请求构造器 */
type BuildRequest = (proxy?: string) => { url: string; headers: Record<string, string> }

/** Worker 式节点要求的请求头 (普通反代由对方自行处理, 无需携带) */
function getWorkerHeaders(upstream: string) {
  const { rewriteHeaders, secret } = getProxyStrategy()
  if (!rewriteHeaders) return {}

  const headers: Record<string, string> = {
    'x-upstream': upstream
  }
  if (secret) headers['x-proxy-key'] = secret

  return headers
}

/**
 * Ping 测试钩子
 * - ping 直发 XHR 且不经过 applyProxy, 地址与鉴权头需在这里补齐
 */
function usePingTest(buildRequest: BuildRequest) {
  const [state, setState] = useState<{ status: PingStatus; ms: number }>({
    status: 'idle',
    ms: 0
  })

  const handlePing = useCallback(
    async (proxy?: string) => {
      const { url, headers } = buildRequest(proxy)
      if (!url) return

      setState({ status: 'testing', ms: 0 })

      logger.info(COMPONENT, 'ping', { url })
      const ms = await ping(url, headers)

      feedback(true)
      setState({ status: ms > 0 ? 'done' : 'fail', ms })
    },
    [buildRequest]
  )

  return { ...state, handlePing }
}

/** Ping 测试集合 */
export function usePingTests() {
  const pingWorkerProxy = usePingTest(
    useCallback((proxy?: string) => {
      const url = `${HOST}/subject/543360`
      return {
        url: proxy ? url.replace(HOST, proxy) : url,
        headers: getWorkerHeaders('bgm.tv')
      }
    }, [])
  )

  const pingWorkerApiProxy = usePingTest(
    useCallback((proxy?: string) => {
      const url = `${API_HOST}/calendar`
      return {
        url: proxy ? url.replace(API_HOST, proxy) : url,
        headers: getWorkerHeaders('api.bgm.tv')
      }
    }, [])
  )

  const pingWorkerLainProxy = usePingTest(
    useCallback(
      () => ({
        // 图片节点靠地址上的 v= 签名鉴权, 统一交给 applyLainProxy 生成最终地址
        url: applyLainProxy(`${HOST_BGM_STATIC}/r/200/pic/cover/l/30/1b/543360_tZvht.jpg`),
        headers: {}
      }),
      []
    )
  )

  return {
    pingWorkerProxy,
    pingWorkerApiProxy,
    pingWorkerLainProxy
  }
}
