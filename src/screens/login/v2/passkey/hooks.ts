/*
 * @Author: Q16KBreak
 * @Date: 2026-11-01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-17 00:00:00
 *
 * Passkey 登录编排：独立会话、单次用户交互、取消和离页后作废
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Alert } from 'react-native'
import { syncS2T } from '@utils/async'
import { switchDefaultToDirect } from './direct'
import { passkeyErrorMessage, passkeyFailure } from './errors'
import { getPasskeyDirectState } from './guard'
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
    const release = () => {
      if (runId.current !== id) return
      busy.current = false
      latest.current.loginLock.current = false
      if (mounted.current) setLoading(false)
    }

    const startRun = async (tempDirect: boolean) => {
      // 弹窗期间可能已离页或取消, 失效则只释放占用的锁
      if (!mounted.current || runId.current !== id) {
        release()
        return
      }
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
          },
          tempDirect
        })
      } catch (error) {
        if (mounted.current && runId.current === id) {
          setMessage(passkeyErrorMessage(error))
        }
      } finally {
        release()
      }
    }

    // 先置 loading, 弹窗期间密码登录按钮呈禁用态, 避免静默无响应
    setLoading(true)

    const { direct, failed, echRunning } = getPasskeyDirectState()
    if (direct || failed) {
      await startRun(false)
      return
    }

    // 无需弹窗的非直连场景, 静默以临时直连放行:
    // - 仅镜像 / 反代: 它只改写 axiosWithProxy 路径, direct 请求本来直达 bgm.tv
    // - ECH 设置开但进程没起来: 网络层已是直连, beginTempDirect 会暂停生命周期防止登录中途拉起
    if (!echRunning) {
      await startRun(true)
      return
    }

    // ECH 接管中: OkHttp 全局接管, 必须临时停掉本地代理, 询问本次登录方式
    setMessage('请在弹窗中选择本次登录方式。')
    Alert.alert(
      syncS2T('提示'),
      syncS2T(
        'Passkey 登录需要请求直达 bgm.tv，当前处于 ECH 模式。\n' +
          '\n「本次直连验证」仅在本次登录临时停用 ECH，结束后自动恢复。' +
          '\n「切换为直连模式」会修改默认设置，可随时在「设置 → 代理」改回。'
      ),
      [
        {
          text: syncS2T('取消'),
          style: 'cancel',
          onPress: () => {
            release()
            if (mounted.current) setMessage('')
          }
        },
        {
          text: syncS2T('本次直连验证'),
          onPress: () => {
            void startRun(true)
          }
        },
        {
          text: syncS2T('切换为直连模式'),
          onPress: () => {
            void (async () => {
              await switchDefaultToDirect()
              if (mounted.current && runId.current === id) {
                await startRun(false)
              } else {
                release()
              }
            })()
          }
        }
      ]
    )
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
