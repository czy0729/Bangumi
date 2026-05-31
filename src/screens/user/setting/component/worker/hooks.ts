/*
 * @Author: czy0729
 * @Date: 2026-05-30 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-30 12:00:00
 */
import { useCallback, useRef, useState } from 'react'
import { systemStore } from '@stores'
import { useMount } from '@utils/hooks'

/** Worker 代理设置逻辑 */
export function useWorkerSettings() {
  const [workerProxy, setWorkerProxy] = useState(String(systemStore.setting.workerProxy || ''))
  const [workerSecret, setWorkerSecret] = useState(String(systemStore.setting.workerSecret || ''))
  const [workerLainProxy, setWorkerLainProxy] = useState(String(systemStore.setting.workerLainProxy || ''))
  const [workerLainSecret, setWorkerLainSecret] = useState(String(systemStore.setting.workerLainSecret || ''))
  const [workerApiProxy, setWorkerApiProxy] = useState(String(systemStore.setting.workerApiProxy || ''))

  const workerProxyRef = useRef(workerProxy)
  const workerSecretRef = useRef(workerSecret)
  const workerLainProxyRef = useRef(workerLainProxy)
  const workerLainSecretRef = useRef(workerLainSecret)
  const workerApiProxyRef = useRef(workerApiProxy)

  const handleSetWorkerProxy = useCallback((text: string) => {
    const value = text.trim()
    workerProxyRef.current = value
    setWorkerProxy(value)
  }, [])

  const handleSetWorkerSecret = useCallback((text: string) => {
    const value = text.trim()
    workerSecretRef.current = value
    setWorkerSecret(value)
  }, [])

  const handleSetWorkerLainProxy = useCallback((text: string) => {
    const value = text.trim()
    workerLainProxyRef.current = value
    setWorkerLainProxy(value)
  }, [])

  const handleSetWorkerLainSecret = useCallback((text: string) => {
    const value = text.trim()
    workerLainSecretRef.current = value
    setWorkerLainSecret(value)
  }, [])

  const handleSetWorkerApiProxy = useCallback((text: string) => {
    const value = text.trim()
    workerApiProxyRef.current = value
    setWorkerApiProxy(value)
  }, [])

  const setWorkerProxyDirect = useCallback(() => {
    systemStore.switchSetting('workerProxyDirect')
  }, [])

  useMount(() => {
    return () => {
      if (workerProxyRef.current !== systemStore.setting.workerProxy) {
        systemStore.setSetting('workerProxy', workerProxyRef.current)
      }

      if (workerSecretRef.current !== systemStore.setting.workerSecret) {
        systemStore.setSetting('workerSecret', workerSecretRef.current)
      }

      if (workerLainProxyRef.current !== systemStore.setting.workerLainProxy) {
        systemStore.setSetting('workerLainProxy', workerLainProxyRef.current)
      }

      if (workerLainSecretRef.current !== systemStore.setting.workerLainSecret) {
        systemStore.setSetting('workerLainSecret', workerLainSecretRef.current)
      }

      if (workerApiProxyRef.current !== systemStore.setting.workerApiProxy) {
        systemStore.setSetting('workerApiProxy', workerApiProxyRef.current)
      }
    }
  })

  return {
    workerProxy,
    workerSecret,
    workerLainProxy,
    workerLainSecret,
    workerApiProxy,
    workerProxyDirect: systemStore.setting.workerProxyDirect,
    setWorkerProxy: handleSetWorkerProxy,
    setWorkerSecret: handleSetWorkerSecret,
    setWorkerLainProxy: handleSetWorkerLainProxy,
    setWorkerLainSecret: handleSetWorkerLainSecret,
    setWorkerApiProxy: handleSetWorkerApiProxy,
    setWorkerProxyDirect
  }
}
