/*
 * @Date: 2026-11-01
 *
 * 单次 Passkey 登录管线: 可独立测试, 完成全部授权后才提交用户状态
 */
import { saveLoginResult } from '../utils'
import { passkeyFailure } from './errors'
import { canUsePasskey, getPasskeyAssertion, isPasskeyAvailable } from './native'
import { PasskeyLoginService } from './service'

import type { PasskeyRunParams } from './ui-types'

export async function runPasskeyLogin({
  assertActive,
  getContext,
  onProgress,
  onNativeRequest
}: PasskeyRunParams): Promise<void> {
  assertActive()
  if (!canUsePasskey()) throw passkeyFailure('E_PASSKEY_UNSUPPORTED')
  if (!(await isPasskeyAvailable())) throw passkeyFailure('E_PASSKEY_PROVIDER')
  assertActive()
  const service = new PasskeyLoginService(assertActive)
  const options = await service.prepare()
  assertActive()
  onProgress('请在凭据管理器中信任本应用, 选择 bgm.tv 的 Passkey 并完成验证。')
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
  saveLoginResult({
    cookie: service.cookieString,
    userAgent: service.userAgent,
    accessToken: service.accessToken,
    navigation: getContext().navigation,
    isSyncSetting: () => getContext().isSyncSetting
  })
}
