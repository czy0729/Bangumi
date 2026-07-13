/*
 * @Author: czy0729
 * @Date: 2026-06-21 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 04:08:14
 */
import { useCallback, useState } from 'react'
import { feedback } from '@utils'
import { logger } from '@utils/dev'
import { ping } from '@utils/fetch'
import { API_HOST, HOST, HOST_BGM_STATIC } from '@constants'
import { COMPONENT } from '../ds'

import type { PingStatus } from '../types'

/** Ping 测试钩子 */
function usePingTest(urlTemplate: string, replaceTarget: string) {
  const [state, setState] = useState<{ status: PingStatus; ms: number }>({
    status: 'idle',
    ms: 0
  })

  const handlePing = useCallback(
    async (proxy: string) => {
      const url = proxy
        ? urlTemplate.replace(replaceTarget, proxy)
        : urlTemplate
      setState({ status: 'testing', ms: 0 })

      logger.info(COMPONENT, 'ping', { url })
      const ms = await ping(url)

      feedback(true)
      setState({ status: ms > 0 ? 'done' : 'fail', ms })
    },
    [urlTemplate, replaceTarget]
  )

  return { ...state, handlePing, urlTemplate }
}

/** Ping 测试集合 */
export function usePingTests() {
  const pingWorkerProxy = usePingTest(`${HOST}/subject/543360`, HOST)
  const pingWorkerApiProxy = usePingTest(`${API_HOST}/calendar`, API_HOST)
  const pingWorkerLainProxy = usePingTest(
    `${HOST_BGM_STATIC}/r/200/pic/cover/l/30/1b/543360_tZvht.jpg`,
    HOST_BGM_STATIC
  )

  return {
    pingWorkerProxy,
    pingWorkerApiProxy,
    pingWorkerLainProxy
  }
}
