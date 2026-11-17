/*
 * @Author: Q16KBreak
 * @Date: 2026-11-01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-17 00:00:00
 *
 * 单次 Passkey 登录管线：可独立测试，完成全部授权后才提交用户状态
 */
import { saveLoginResult } from '../utils'
import { beginTempDirect } from './direct'
import { passkeyFailure } from './errors'
import { assertPasskeyDirect } from './guard'
import { canUsePasskey, getPasskeyAssertion, isPasskeyAvailable, isPasskeyOS } from './native'
import { PasskeyLoginService } from './service'

import type { PasskeyRunParams } from './types'

/**
 * 执行一次完整的 Passkey 登录
 *
 * @param assertActive 取消检查
 * @param getContext 延迟读取的页面上下文
 * @param onProgress 流程提示
 * @param onNativeRequest 原生凭据 UI 状态回调
 * @param tempDirect 临时直连窗口内登录 (绕过门禁, 结束后恢复原代理模式)
 */
export async function runPasskeyLogin({
  assertActive,
  getContext,
  onProgress,
  onNativeRequest,
  onSuccess,
  tempDirect = false
}: PasskeyRunParams): Promise<void> {
  assertActive()
  if (!canUsePasskey()) throw passkeyFailure('E_PASSKEY_UNSUPPORTED')
  if (!isPasskeyOS()) throw passkeyFailure('E_PASSKEY_UNSUPPORTED')
  assertPasskeyDirect({ tempDirect })
  if (!(await isPasskeyAvailable())) throw passkeyFailure('E_PASSKEY_PROVIDER')
  assertActive()

  const execute = async (): Promise<void> => {
    const service = new PasskeyLoginService(assertActive)
    const options = await service.prepare()
    assertActive()
    onProgress('请在凭据管理器中信任本应用，选择 bgm.tv 的 Passkey 并完成验证。')
    onNativeRequest(true)
    let assertion: string
    try {
      assertion = await getPasskeyAssertion(options)
    } finally {
      onNativeRequest(false)
    }
    assertActive()
    onProgress('正在向主站验证 Passkey...')
    await service.verify(assertion)
    assertActive()
    onProgress('正在完成客户端授权...')
    await service.finish()
    assertActive()
    onSuccess()
    saveLoginResult({
      cookie: service.cookieString,
      userAgent: service.userAgent,
      accessToken: service.accessToken,
      navigation: getContext().navigation,
      isSyncSetting: () => getContext().isSyncSetting
    })
  }

  if (tempDirect) {
    const restore = await beginTempDirect()
    try {
      await execute()
    } finally {
      await restore()
    }
  } else {
    await execute()
  }
}
