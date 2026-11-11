/*
 * @Author: Q16KBreak
 * @Date: 2026-11-01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-11 21:16:27
 *
 * Passkey 登录编排：独立会话、单次用户交互、取消和离页后作废
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { passkeyErrorMessage, passkeyFailure } from './errors'
import { cancelPasskeyAssertion, canUsePasskey, isPasskeyModuleAvailable } from './native'
import { runPasskeyLogin } from './run'

import type { PasskeyLoginParams, PasskeyLoginView } from './types'

/**
 * Passkey 登录控制器
 *
 * @param params 登录页传入的互斥状态与导航
 */
export function usePasskeyLogin(params: PasskeyLoginParams): PasskeyLoginView {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const latest = useRef(params)
  const mounted = useRef(true)
  const runId = useRef(0)
  const busy = useRef(false)
  const done = useRef(false)
  const nativeRun = useRef<number | null>(null)
  latest.current = params

  const onCancel = useCallback(() => {
    if (!busy.current || done.current) return
    runId.current += 1
    busy.current = false
    latest.current.loginLock.current = false
    if (nativeRun.current !== null) {
      nativeRun.current = null
      void cancelPasskeyAssertion()
    }
    if (mounted.current) {
      setLoading(false)
      setMessage('已取消 Passkey 登录。')
    }
  }, [])

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      onCancel()
    }
  }, [onCancel])

  useEffect(() => {
    const subscription = params.navigation.addListener('blur', onCancel) as unknown as
      | (() => void)
      | { remove: () => void }
    return () => {
      if (typeof subscription === 'function') subscription()
      else subscription?.remove()
    }
  }, [onCancel, params.navigation])

  const onLogin = useCallback(async () => {
    if (!mounted.current || busy.current || latest.current.blocked) return
    if (latest.current.loginLock.current) return
    latest.current.loginLock.current = true
    busy.current = true
    done.current = false
    const id = ++runId.current
    const assertActive = () => {
      if (!mounted.current || runId.current !== id) {
        throw passkeyFailure('E_PASSKEY_CANCELLED')
      }
    }
    setLoading(true)
    setMessage('正在准备 Passkey 登录...')

    try {
      await runPasskeyLogin({
        assertActive,
        getContext: () => latest.current,
        onProgress: text => {
          assertActive()
          setMessage(text)
        },
        onNativeRequest: pending => {
          if (runId.current === id) nativeRun.current = pending ? id : null
        },
        onSuccess: () => {
          if (runId.current === id) {
            done.current = true
            setMessage('')
          }
        }
      })
    } catch (error) {
      if (mounted.current && runId.current === id) {
        setMessage(passkeyErrorMessage(error))
      }
    } finally {
      if (runId.current === id) {
        busy.current = false
        latest.current.loginLock.current = false
        if (mounted.current) setLoading(false)
      }
    }
  }, [])

  return {
    /** 是否展示当前平台的登录入口 */
    visible: canUsePasskey() && isPasskeyModuleAvailable(),

    /** 是否正在认证，用于与密码登录互斥 */
    loading,

    /** 不包含认证数据的流程提示 */
    message,

    /** 只在用户点击时发起凭据请求 */
    onLogin,

    /** 不自动重试，取消后保持原登录状态 */
    onCancel
  }
}
