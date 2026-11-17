/*
 * @Author: Q16KBreak
 * @Date: 2026-11-11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-17
 *
 * Passkey 登录的直连门禁：请求必须直达 bgm.tv，不能被节点反代改写地址或请求头
 */
import { syncSystemStore } from '@utils/async'
import { getProxyStrategy } from '@utils/proxy'
import { passkeyFailure } from './errors'

/** 直连状态与读取结果 */
type DirectState = {
  /** 是否处于直连模式 */
  direct: boolean

  /** 策略读取是否失败 */
  failed: boolean

  /** ECH 本地代理是否接管中 (临时直连需要停掉它) */
  echRunning: boolean
}

/** 读取当前代理策略 */
function readDirectState(): DirectState {
  try {
    const { disabled, ech } = getProxyStrategy()
    // 设置态也算非直连: echProxyEnabled 开但进程没起来时, 生命周期可能在登录中途把代理拉起
    const echSettingEnabled = syncSystemStore()?.setting?.echProxyEnabled === true

    return {
      direct: disabled && !ech && !echSettingEnabled,
      failed: false,
      echRunning: ech
    }
  } catch {
    return { direct: false, failed: true, echRunning: false }
  }
}

/** 读取 Passkey 登录的直连状态 (不抛错, 供 UI 询问用户) */
export function getPasskeyDirectState(): DirectState {
  return readDirectState()
}

/**
 * 非直连模式拒绝发起登录
 *
 * @param options.tempDirect 临时直连窗口内跳过模式检查
 * (ECH 已停掉; 镜像 / 反代只改写 axiosWithProxy 路径, direct 请求本来不经它)
 */
export function assertPasskeyDirect(options: { tempDirect?: boolean } = {}) {
  const { direct, failed } = readDirectState()
  if (failed) throw passkeyFailure('E_PASSKEY_FAILED')
  if (!direct && !options.tempDirect) throw passkeyFailure('E_PASSKEY_PROXY')
}
