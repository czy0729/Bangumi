/*
 * @Author: czy0729
 * @Date: 2026-06-21 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 04:08:29
 */
import { useCallback, useRef, useState } from 'react'
import { systemStore } from '@stores'
import { useMount } from '@utils/hooks'

/** Worker 代理字段状态管理 */
export function useWorkerFields() {
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

  const saveFields = useCallback(() => {
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
  }, [])

  useMount(() => {
    return () => {
      saveFields()
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
    saveFields
  }
}
