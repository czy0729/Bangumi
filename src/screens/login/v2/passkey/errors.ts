/*
 * @Author: Q16KBreak
 * @Date: 2026-11-01
 * @Last Modified by: Q16KBreak
 * @Last Modified time: 2026-11-11 23:40:00
 *
 * Passkey 错误码、固定文案与错误类型
 */

/** 全部 Passkey 错误码 */
export type PasskeyErrorCode =
  | 'E_PASSKEY_UNSUPPORTED'
  | 'E_PASSKEY_CANCELLED'
  | 'E_PASSKEY_NO_CREDENTIAL'
  | 'E_PASSKEY_PROVIDER'
  | 'E_PASSKEY_BUSY'
  | 'E_PASSKEY_ACTIVITY'
  | 'E_PASSKEY_OPTIONS'
  | 'E_PASSKEY_VERIFY'
  | 'E_PASSKEY_VERIFY_HTTP'
  | 'E_PASSKEY_VERIFY_REJECTED'
  | 'E_PASSKEY_SESSION'
  | 'E_PASSKEY_REDIRECT'
  | 'E_PASSKEY_FINAL_URL'
  | 'E_PASSKEY_INVALID_REQUEST'
  | 'E_PASSKEY_INVALID_RESPONSE'
  | 'E_PASSKEY_OAUTH'
  | 'E_PASSKEY_PROXY'
  | 'E_PASSKEY_NETWORK'
  | 'E_PASSKEY_FAILED'

/** 网络链路内部会抛出的错误码 */
export type PasskeyServiceErrorCode = Extract<
  PasskeyErrorCode,
  | 'E_PASSKEY_OPTIONS'
  | 'E_PASSKEY_VERIFY'
  | 'E_PASSKEY_VERIFY_HTTP'
  | 'E_PASSKEY_VERIFY_REJECTED'
  | 'E_PASSKEY_SESSION'
  | 'E_PASSKEY_REDIRECT'
  | 'E_PASSKEY_FINAL_URL'
  | 'E_PASSKEY_INVALID_RESPONSE'
  | 'E_PASSKEY_OAUTH'
  | 'E_PASSKEY_NETWORK'
  | 'E_PASSKEY_CANCELLED'
>

/** 错误码对应的固定中文文案 */
const MESSAGES: Record<PasskeyErrorCode, string> = {
  E_PASSKEY_UNSUPPORTED: '需要 Android 14 及以上和支持 Passkey 的新版安装包。',
  E_PASSKEY_CANCELLED: '已取消 Passkey 登录。',
  E_PASSKEY_NO_CREDENTIAL:
    '未找到可用凭据。请启用支持网站来源授权的凭据管理器，确认其中已有 bgm.tv 的 Passkey，并信任本应用。',
  E_PASSKEY_PROVIDER:
    '凭据管理器不可用或尚未信任本应用。请在所选提供方的特权应用设置中授权后重试。',
  E_PASSKEY_BUSY: '已有凭据请求正在进行，请先完成或取消。',
  E_PASSKEY_ACTIVITY: '登录页面已失效，请返回后重新打开。',
  E_PASSKEY_OPTIONS: '获取主站登录请求失败，请检查网络后重试。',
  E_PASSKEY_VERIFY: '主站未接受本次 Passkey 验证，请重新发起登录。',
  E_PASSKEY_VERIFY_HTTP: '主站验证接口返回异常状态，请检查网络后重试。',
  E_PASSKEY_VERIFY_REJECTED: '主站拒绝了本次 Passkey 签名验证，请重新发起登录。',
  E_PASSKEY_SESSION: '主站已确认身份，但客户端未取得登录 Cookie，请重新发起登录。',
  E_PASSKEY_REDIRECT: '主站请求被重定向到未知地址，已停止本次登录。',
  E_PASSKEY_FINAL_URL: '无法确认主站响应地址，已停止本次登录。',
  E_PASSKEY_INVALID_REQUEST: '主站返回的凭据请求不受支持，已停止本次登录。',
  E_PASSKEY_INVALID_RESPONSE: '凭据响应与主站请求不匹配，已停止本次登录。',
  E_PASSKEY_OAUTH: 'Passkey 验证后的客户端授权未完成，请重新发起登录。',
  E_PASSKEY_PROXY: 'Passkey 登录需要在「设置 → 代理」中切换为直连模式后重试。',
  E_PASSKEY_NETWORK: '连接主站失败，请检查网络或手机代理的配置后重试。',
  E_PASSKEY_FAILED: 'Passkey 登录未完成，请重试。'
}

/** 未登记错误码的兜底文案 */
const DEFAULT_MESSAGE = 'Passkey 登录失败，可重试或使用原有账号登录。'

/** 已登记的错误码集合 */
const CODES = new Set<string>(Object.keys(MESSAGES))

/** 服务层固定错误，不携带底层 message / response */
export class PasskeyServiceError extends Error {
  /** 固定错误码 */
  readonly code: PasskeyServiceErrorCode

  constructor(code: PasskeyServiceErrorCode) {
    super(MESSAGES[code])
    this.name = 'PasskeyServiceError'
    this.code = code
  }
}

/**
 * 创建服务层错误
 *
 * @param code 固定错误码
 */
export function serviceError(code: PasskeyServiceErrorCode): PasskeyServiceError {
  return new PasskeyServiceError(code)
}

/**
 * 非 PasskeyServiceError 一律收敛为 fallback，不透传 Axios 的 message / config / response / cause
 *
 * @param error 原始异常
 * @param fallback 收敛后的错误码
 */
export function sanitizeServiceError(
  error: unknown,
  fallback: PasskeyServiceErrorCode
): PasskeyServiceError {
  return error instanceof PasskeyServiceError ? error : serviceError(fallback)
}

/**
 * 仅提取已登记的非敏感错误码
 *
 * @param error 原始异常
 */
export function passkeyErrorCode(error: unknown): PasskeyErrorCode | '' {
  if (!error || typeof error !== 'object') return ''
  const code = (error as { code?: unknown }).code

  return typeof code === 'string' && CODES.has(code) ? (code as PasskeyErrorCode) : ''
}

/**
 * 认证失败统一映射为固定文案
 *
 * @param error 原始异常
 */
export function passkeyErrorMessage(error: unknown): string {
  const code = passkeyErrorCode(error)

  return (code && MESSAGES[code]) || DEFAULT_MESSAGE
}

/**
 * 为本地控制流创建只有固定文案的错误
 *
 * @param code 固定错误码
 */
export function passkeyFailure(code: PasskeyErrorCode): Error & { code: PasskeyErrorCode } {
  return Object.assign(new Error(MESSAGES[code] || DEFAULT_MESSAGE), { code })
}
