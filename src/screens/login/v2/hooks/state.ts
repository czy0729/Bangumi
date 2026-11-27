/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * 页面 state: 初值 / 合并更新
 */
import { useCallback, useRef, useState } from 'react'
import { HOST, WEB } from '@constants'
import { HOST_PROXY } from '@src/config'

import type { PasswordLoginService } from '../password'
import type { LoginState } from '../types'

/** 页面 state 初始值 */
export const INIT_STATE: LoginState = {
  host: WEB ? HOST_PROXY : HOST,
  clicked: false,
  email: '',
  password: '',
  captcha: '',
  base64: '',
  isCommonUA: false,
  isSyncSetting: false,
  loading: false,
  info: '',
  focus: false,
  failed: false,
  networkFailed: false
}

export function useLoginState(service: PasswordLoginService) {
  const [state, setState] = useState<LoginState>(INIT_STATE)

  // 异步流程内读取的最新 state, 对应 class 的 this.state
  const stateRef = useRef(state)

  /** 合并进 stateRef 后再 setState; host 变化时同步给 service */
  const patch = useCallback(
    (next: Partial<LoginState>) => {
      const merged = { ...stateRef.current, ...next }
      stateRef.current = merged
      if (next.host !== undefined) service.host = next.host
      setState(merged)
    },
    [service]
  )

  return { state, stateRef, patch }
}
