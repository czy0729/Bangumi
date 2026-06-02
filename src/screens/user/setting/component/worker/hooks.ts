/*
 * @Author: czy0729
 * @Date: 2026-05-30 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-02 09:29:27
 */
import { useCallback, useRef, useState } from 'react'
import { systemStore } from '@stores'
import { feedback } from '@utils'
import { logger } from '@utils/dev'
import { ping } from '@utils/fetch'
import { useMount } from '@utils/hooks'
import { API_HOST, HOST, HOST_BGM_STATIC } from '@constants'
import { COMPONENT } from './ds'

import type { PingStatus } from './types'
/** Ping 测试钩子 */
function usePingTest(urlTemplate: string, replaceTarget: string) {
  const [state, setState] = useState<{ status: PingStatus; ms: number }>({
    status: 'idle',
    ms: 0
  })

  const handlePing = useCallback(
    async (proxy: string) => {
      if (!proxy) return
      setState({ status: 'testing', ms: 0 })
      const url = urlTemplate.replace(replaceTarget, proxy)

      logger.info(COMPONENT, 'ping', { url })
      const ms = await ping(url)

      feedback(true)
      setState({ status: ms > 0 ? 'done' : 'fail', ms })
    },
    [urlTemplate, replaceTarget]
  )

  return { ...state, handlePing, urlTemplate }
}

/** Worker 代理设置逻辑 */
export function useWorkerSettings() {
  const [workerProxy, setWorkerProxy] = useState(String(systemStore.setting.workerProxy || ''))
  const [workerSecret, setWorkerSecret] = useState(String(systemStore.setting.workerSecret || ''))
  const [workerLainProxy, setWorkerLainProxy] = useState(
    String(systemStore.setting.workerLainProxy || '')
  )
  const [workerLainSecret, setWorkerLainSecret] = useState(
    String(systemStore.setting.workerLainSecret || '')
  )
  const [workerApiProxy, setWorkerApiProxy] = useState(
    String(systemStore.setting.workerApiProxy || '')
  )

  const [lockedFields, setLockedFields] = useState<Record<string, boolean>>({
    workerProxy: !!systemStore.setting.workerProxy,
    workerApiProxy: !!systemStore.setting.workerApiProxy,
    workerLainProxy: !!systemStore.setting.workerLainProxy,
    workerSecret: true,
    workerLainSecret: true
  })

  const [focusedField, setFocusedField] = useState<string | null>(null)

  const toggleLock = useCallback((field: string) => {
    setLockedFields(prev => ({ ...prev, [field]: !prev[field] }))
  }, [])

  const handleFocus = useCallback((field: string) => {
    setFocusedField(field)
  }, [])

  const handleBlur = useCallback(() => {
    setFocusedField(null)
  }, [])

  const pingWorkerProxy = usePingTest(`${HOST}/subject/543360`, HOST)
  const pingWorkerApiProxy = usePingTest(`${API_HOST}/calendar`, API_HOST)
  const pingWorkerLainProxy = usePingTest(
    `${HOST_BGM_STATIC}/r/200/pic/cover/l/30/1b/543360_tZvht.jpg`,
    HOST_BGM_STATIC
  )

  const workerProxyRef = useRef(workerProxy)
  const workerSecretRef = useRef(workerSecret)
  const workerLainProxyRef = useRef(workerLainProxy)
  const workerLainSecretRef = useRef(workerLainSecret)
  const workerApiProxyRef = useRef(workerApiProxy)

  const handleSetWorkerProxy = useCallback((text: string) => {
    workerProxyRef.current = text
    setWorkerProxy(text)
  }, [])

  const handleSetWorkerSecret = useCallback((text: string) => {
    workerSecretRef.current = text
    setWorkerSecret(text)
  }, [])

  const handleSetWorkerLainProxy = useCallback((text: string) => {
    workerLainProxyRef.current = text
    setWorkerLainProxy(text)
  }, [])

  const handleSetWorkerLainSecret = useCallback((text: string) => {
    workerLainSecretRef.current = text
    setWorkerLainSecret(text)
  }, [])

  const handleSetWorkerApiProxy = useCallback((text: string) => {
    workerApiProxyRef.current = text
    setWorkerApiProxy(text)
  }, [])

  const setWorkerProxyDirect = useCallback(() => {
    systemStore.switchSetting('workerProxyDirect')
  }, [])

  const setWorkerProxyDisabled = useCallback(() => {
    systemStore.switchSetting('workerProxyDisabled')
  }, [])

  useMount(() => {
    return () => {
      const trimProxy = workerProxyRef.current.trim()
      if (trimProxy !== systemStore.setting.workerProxy) {
        systemStore.setSetting('workerProxy', trimProxy)
      }

      const trimSecret = workerSecretRef.current.trim()
      if (trimSecret !== systemStore.setting.workerSecret) {
        systemStore.setSetting('workerSecret', trimSecret)
      }

      const trimLainProxy = workerLainProxyRef.current.trim()
      if (trimLainProxy !== systemStore.setting.workerLainProxy) {
        systemStore.setSetting('workerLainProxy', trimLainProxy)
      }

      const trimLainSecret = workerLainSecretRef.current.trim()
      if (trimLainSecret !== systemStore.setting.workerLainSecret) {
        systemStore.setSetting('workerLainSecret', trimLainSecret)
      }

      const trimApiProxy = workerApiProxyRef.current.trim()
      if (trimApiProxy !== systemStore.setting.workerApiProxy) {
        systemStore.setSetting('workerApiProxy', trimApiProxy)
      }
    }
  })

  return {
    workerProxy,
    workerSecret,
    workerLainProxy,
    workerLainSecret,
    workerApiProxy,
    workerProxyDisabled: systemStore.setting.workerProxyDisabled,
    workerProxyDirect: systemStore.setting.workerProxyDirect,
    lockedFields,
    focusedField,
    setWorkerProxy: handleSetWorkerProxy,
    setWorkerSecret: handleSetWorkerSecret,
    setWorkerLainProxy: handleSetWorkerLainProxy,
    setWorkerLainSecret: handleSetWorkerLainSecret,
    setWorkerApiProxy: handleSetWorkerApiProxy,
    setWorkerProxyDisabled,
    setWorkerProxyDirect,
    toggleLock,
    handleFocus,
    handleBlur,
    pingWorkerProxy,
    pingWorkerApiProxy,
    pingWorkerLainProxy
  }
}
