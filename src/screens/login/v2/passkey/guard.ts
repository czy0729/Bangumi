/*
 * @Author: Q16KBreak
 * @Date: 2026-11-11
 * @Last Modified by: Q16KBreak
 * @Last Modified time: 2026-11-11 23:10:00
 *
 * Passkey 登录的直连门禁：请求必须直达 bgm.tv，不能被节点反代改写地址或请求头
 */
import { getProxyStrategy } from '@utils/proxy'
import { passkeyFailure } from './errors'

/** 直连状态与读取结果 */
type DirectState = {
  /** 是否处于直连模式 */
  direct: boolean

  /** 策略读取是否失败 */
  failed: boolean
}

/** 读取当前代理策略 */
function readDirectState(): DirectState {
  try {
    const { disabled, ech } = getProxyStrategy()

    return { direct: disabled && !ech, failed: false }
  } catch {
    return { direct: false, failed: true }
  }
}

/** 非直连模式拒绝发起登录 */
export function assertPasskeyDirect() {
  const { direct, failed } = readDirectState()
  if (failed) throw passkeyFailure('E_PASSKEY_FAILED')
  if (!direct) throw passkeyFailure('E_PASSKEY_PROXY')
}
