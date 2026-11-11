/*
 * @Date: 2026-11-01
 *
 * 网络服务对外只暴露固定错误码，不附加底层响应或凭据。
 */
export type PasskeyServiceErrorCode =
  | 'E_PASSKEY_OPTIONS'
  | 'E_PASSKEY_VERIFY'
  | 'E_PASSKEY_VERIFY_HTTP'
  | 'E_PASSKEY_VERIFY_REJECTED'
  | 'E_PASSKEY_SESSION'
  | 'E_PASSKEY_OAUTH'
  | 'E_PASSKEY_NETWORK'
  | 'E_PASSKEY_INVALID_RESPONSE'
  | 'E_PASSKEY_CANCELLED'

const MESSAGES: Record<PasskeyServiceErrorCode, string> = {
  E_PASSKEY_OPTIONS: '获取通行密钥登录请求失败，请重试。',
  E_PASSKEY_VERIFY: '通行密钥验证失败，请重新登录。',
  E_PASSKEY_VERIFY_HTTP: '主站验证接口返回异常状态，请重试。',
  E_PASSKEY_VERIFY_REJECTED: '主站拒绝了本次通行密钥验证，请重试。',
  E_PASSKEY_SESSION: '主站已确认身份，但未取得登录 Cookie，请重试。',
  E_PASSKEY_OAUTH: '获取登录授权失败，请重试。',
  E_PASSKEY_NETWORK: '连接主站失败，请检查网络后重试。',
  E_PASSKEY_INVALID_RESPONSE: '登录响应无效，请重新登录。',
  E_PASSKEY_CANCELLED: '已取消通行密钥登录。'
}

export class PasskeyServiceError extends Error {
  readonly code: PasskeyServiceErrorCode

  constructor(code: PasskeyServiceErrorCode) {
    super(MESSAGES[code])
    this.name = 'PasskeyServiceError'
    this.code = code
  }
}

export function serviceError(code: PasskeyServiceErrorCode): PasskeyServiceError {
  return new PasskeyServiceError(code)
}

/** 不透传 Axios 的 message / config / request / response / cause。 */
export function sanitizeServiceError(error: unknown, fallback: PasskeyServiceErrorCode) {
  return error instanceof PasskeyServiceError ? error : serviceError(fallback)
}
