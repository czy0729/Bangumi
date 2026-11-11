/*
 * @Author: Q16KBreak
 * @Date: 2026-11-01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-11 21:16:20
 *
 * Android Passkey 原生桥：由系统选择凭据提供方，仅获取已有凭据
 */
import { NativeModules, Platform } from 'react-native'
import { passkeyFailure } from './errors'

/** 原生桥契约，凭据内容只在一次登录调用内传递 */
type PasskeyNativeModule = {
  /** 系统 Credential Manager 是否可用 */
  isSupported: () => Promise<boolean>

  /** 执行一次 getCredential，返回 assertion JSON */
  getAssertion: (requestJson: string) => Promise<string>

  /** 取消进行中的凭据请求 */
  cancel: () => Promise<void>
}

/** 当前安装包是否内置原生桥 */
export function isPasskeyModuleAvailable(): boolean {
  const module = getModule()

  return !!module && typeof module.getAssertion === 'function'
}

/** 系统是否提供 Credential Manager (Android 14+) */
export function isPasskeyOS(): boolean {
  return Platform.OS === 'android' && Number(Platform.Version) >= 34
}

/** 入口可见性；开发环境放开，便于在低版本系统调试 UI */
export function canUsePasskey(): boolean {
  return isPasskeyOS() || (__DEV__ && Platform.OS === 'android')
}

/** 延迟读取，兼容尚未更新 APK 或非 Android 的环境 */
function getModule(): PasskeyNativeModule | undefined {
  return NativeModules.BangumiPasskey as PasskeyNativeModule | undefined
}

/** 仅检查系统 Credential Manager 能力，不保证提供方已启用或信任，不读取凭据 */
export async function isPasskeyAvailable(): Promise<boolean> {
  if (!canUsePasskey()) return false
  const module = getModule()
  if (!module || typeof module.isSupported !== 'function') {
    throw passkeyFailure('E_PASSKEY_UNSUPPORTED')
  }

  return module.isSupported()
}

/** 请求用户在系统选择的凭据提供方中确认一个已有的主站凭据 */
export async function getPasskeyAssertion(requestJson: string): Promise<string> {
  const module = getModule()
  if (!canUsePasskey() || !module) {
    throw passkeyFailure('E_PASSKEY_UNSUPPORTED')
  }

  return module.getAssertion(requestJson)
}

/** 取消原生交互；不将系统异常或凭据写入日志 */
export async function cancelPasskeyAssertion(): Promise<void> {
  try {
    await getModule()?.cancel()
  } catch {
    // 页面已销毁或桥接已释放时，JS 层仍会作废本次登录操作
  }
}
