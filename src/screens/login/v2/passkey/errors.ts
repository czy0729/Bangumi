/*
 * @Date: 2026-11-01
 *
 * Passkey 错误展示: 仅使用固定文案, 不暴露认证响应或底层错误内容
 */
const MESSAGES: Record<string, string> = {
  E_PASSKEY_UNSUPPORTED: '需要 Android 14 及以上和支持 Passkey 的新版安装包。',
  E_PASSKEY_CANCELLED: '已取消 Passkey 登录。',
  E_PASSKEY_NO_CREDENTIAL:
    '未找到可用凭据。请启用支持网站来源授权的凭据管理器, 确认其中已有 bgm.tv 的 Passkey, 并信任本应用。',
  E_PASSKEY_PROVIDER:
    '凭据管理器不可用或尚未信任本应用。请在所选提供方的特权应用设置中授权后重试。',
  E_PASSKEY_BUSY: '已有凭据请求正在进行, 请先完成或取消。',
  E_PASSKEY_ACTIVITY: '登录页面已失效, 请返回后重新打开。',
  E_PASSKEY_OPTIONS: '获取主站登录请求失败, 请检查网络后重试。',
  E_PASSKEY_VERIFY: '主站未接受本次 Passkey 验证, 请重新发起登录。',
  E_PASSKEY_VERIFY_HTTP: '主站验证接口返回异常状态, 请检查网络后重试。',
  E_PASSKEY_VERIFY_REJECTED: '主站拒绝了本次 Passkey 签名验证, 请重新发起登录。',
  E_PASSKEY_SESSION: '主站已确认身份, 但客户端未取得登录 Cookie, 请重新发起登录。',
  E_PASSKEY_INVALID_REQUEST: '主站返回的凭据请求不受支持, 已停止本次登录。',
  E_PASSKEY_INVALID_RESPONSE: '凭据响应与主站请求不匹配, 已停止本次登录。',
  E_PASSKEY_OAUTH: 'Passkey 验证后的客户端授权未完成, 请重新发起登录。',
  E_PASSKEY_NETWORK: '连接主站失败, 请检查网络或手机代理的配置后重试。'
}

/** 仅提取非敏感错误码, 不显示原始 message / response */
export function passkeyErrorCode(error: unknown): string {
  if (!error || typeof error !== 'object') return ''
  const code = (error as { code?: unknown }).code
  return typeof code === 'string' ? code : ''
}

/** 认证失败统一映射为固定中文提示 */
export function passkeyErrorMessage(error: unknown): string {
  return MESSAGES[passkeyErrorCode(error)] || 'Passkey 登录失败, 可重试或使用原有账号登录。'
}

/** 为本地控制流创建只有固定提示的错误 */
export function passkeyFailure(code: string): Error & { code: string } {
  return Object.assign(new Error(passkeyErrorMessage({ code })), { code })
}
