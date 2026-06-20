/*
 * @Author: czy0729
 * @Date: 2026-06-21 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 04:08:04
 */
import { useCallback, useEffect, useState } from 'react'
import { systemStore } from '@stores'
import { feedback } from '@utils'
import { logger } from '@utils/dev'
import { disableEchProxy, enableEchProxy, getEchProxyLogs, getEchProxyPort } from '@utils/proxy/ech'
import { COMPONENT } from '../ds'

import type { EchProxyLog } from '@utils/proxy/ech'

/** ECH 代理逻辑 */
export function useEchProxy() {
  const [echLoading, setEchLoading] = useState(false)
  const [echPort, setEchPort] = useState<number>(() => getEchProxyPort())
  const [echLogs, setEchLogs] = useState<EchProxyLog[]>([])

  // 定期从 Native 获取 ECH 日志
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const logs = await getEchProxyLogs()
        setEchLogs(logs)
      } catch {}
    }

    fetchLogs()
    const timer = setInterval(fetchLogs, 5000)
    return () => clearInterval(timer)
  }, [])

  const toggleEchProxy = useCallback(async () => {
    if (echLoading) return

    setEchLoading(true)
    feedback(true)

    try {
      const enabled = systemStore.setting.echProxyEnabled
      if (enabled) {
        await disableEchProxy()
        setEchPort(0)
        systemStore.switchSetting('echProxyEnabled')
      } else {
        const port = await enableEchProxy()
        if (port > 0) {
          logger.log(COMPONENT, 'toggleEchProxy running', port)
          setEchPort(port)
          systemStore.switchSetting('echProxyEnabled')
        } else {
          logger.warn(COMPONENT, 'toggleEchProxy failed: port=0')
        }
      }
    } catch (e) {
      logger.warn(COMPONENT, 'toggleEchProxy error', e)
    } finally {
      setEchLoading(false)
    }
  }, [echLoading])

  return {
    echRunning: systemStore.setting.echProxyEnabled,
    echLoading,
    echPort,
    echLogs,
    toggleEchProxy
  }
}
