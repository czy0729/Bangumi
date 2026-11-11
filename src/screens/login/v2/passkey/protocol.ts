/*
 * @Date: 2026-11-01
 *
 * Passkey 请求/断言的严格协议校验，以及直连 OAuth 回调和 Token 校验。
 */
import Base64 from '@utils/thirdParty/base64'
import { serviceError } from './service-errors'

import type { AccessToken } from '@stores/user/types'
import type { PasskeyAssertion, PasskeyRequestOptions } from './types'

export const PASSKEY_ORIGIN = 'https://bgm.tv'
export const PASSKEY_COOKIETIME = 2592000

export function objectResponse(value: unknown): Record<string, unknown> {
  try {
    const parsed: unknown = typeof value === 'string' ? JSON.parse(value) : value
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>
    }
  } catch {}
  throw serviceError('E_PASSKEY_INVALID_RESPONSE')
}

/** 严格解码且检查规范编码，避免宽松 base64 解码器忽略非法字符。 */
function binary(value: unknown): string {
  if (typeof value !== 'string' || !value || value.length > 65536) {
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  }
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  const unpadded = value
  if (unpadded.length % 4 === 1) throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  try {
    const decoded = Base64.atob(unpadded.replace(/-/g, '+').replace(/_/g, '/'))
    const encoded = Base64.btoa(decoded).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    if (encoded === unpadded) return decoded
  } catch {}
  throw serviceError('E_PASSKEY_INVALID_RESPONSE')
}

export function requestOptions(value: unknown): PasskeyRequestOptions {
  const options = objectResponse(value)
  const challenge = binary(options.challenge)
  if (options.rpId !== 'bgm.tv' || challenge.length < 16 || challenge.length > 1024) {
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  }
  if (options.allowCredentials !== undefined) {
    if (!Array.isArray(options.allowCredentials)) throw serviceError('E_PASSKEY_INVALID_RESPONSE')
    for (const item of options.allowCredentials) {
      const credential = objectResponse(item)
      if (credential.type !== 'public-key') throw serviceError('E_PASSKEY_INVALID_RESPONSE')
      binary(credential.id)
      if (
        credential.transports !== undefined &&
        (!Array.isArray(credential.transports) ||
          credential.transports.some(t => typeof t !== 'string'))
      ) {
        throw serviceError('E_PASSKEY_INVALID_RESPONSE')
      }
    }
  }
  if (
    options.timeout !== undefined &&
    (typeof options.timeout !== 'number' ||
      !Number.isFinite(options.timeout) ||
      options.timeout <= 0)
  ) {
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  }
  if (
    options.userVerification !== undefined &&
    !['required', 'preferred', 'discouraged'].includes(String(options.userVerification))
  ) {
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  }
  return options as PasskeyRequestOptions
}

export function assertionResponse(json: string, options: PasskeyRequestOptions): PasskeyAssertion {
  if (typeof json !== 'string' || json.length > 131072)
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  const credential = objectResponse(json)
  const response = objectResponse(credential.response)
  if (credential.type !== 'public-key' || binary(credential.id) !== binary(credential.rawId)) {
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  }
  const allowed = options.allowCredentials
  if (allowed?.length && !allowed.some(item => binary(item.id) === binary(credential.rawId))) {
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  }
  let clientData: Record<string, unknown>
  try {
    const bytes = binary(response.clientDataJSON)
    const text = decodeURIComponent(
      Array.from(bytes, char => `%${char.charCodeAt(0).toString(16).padStart(2, '0')}`).join('')
    )
    clientData = objectResponse(text)
  } catch {
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  }
  if (
    clientData.type !== 'webauthn.get' ||
    clientData.origin !== PASSKEY_ORIGIN ||
    binary(clientData.challenge) !== binary(options.challenge) ||
    (clientData.crossOrigin !== undefined && clientData.crossOrigin !== false) ||
    clientData.topOrigin !== undefined
  ) {
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  }
  if (binary(response.authenticatorData).length < 37)
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  binary(response.signature)
  if (
    response.userHandle !== undefined &&
    response.userHandle !== null &&
    response.userHandle !== ''
  ) {
    binary(response.userHandle)
  }
  return {
    id: credential.id as string,
    rawId: credential.rawId as string,
    type: 'public-key',
    response: {
      clientDataJSON: response.clientDataJSON as string,
      authenticatorData: response.authenticatorData as string,
      signature: response.signature as string,
      userHandle: (response.userHandle as string) || null
    },
    clientExtensionResults:
      credential.clientExtensionResults === undefined
        ? {}
        : objectResponse(credential.clientExtensionResults)
  }
}

/** 不依赖 RN 旧版 URL 尚未实现的 origin / hostname getter。 */
function httpUrl(url: string) {
  if (typeof url !== 'string' || /[\s\\#]/.test(url)) throw serviceError('E_PASSKEY_OAUTH')
  const match = /^(https:\/\/[^/?#]+)(\/[^?#]*)?(?:\?([^#]*))?$/.exec(url)
  if (!match) throw serviceError('E_PASSKEY_OAUTH')
  return { origin: match[1], path: match[2] || '/', query: match[3] || '' }
}

export function assertRequestOrigin(url: string, origin: string) {
  if (httpUrl(url).origin !== origin) throw serviceError('E_PASSKEY_INVALID_RESPONSE')
}

/** 直连只信真实 Location / XHR 最终 URL，不从 Worker JSON 或任意 HTML 提取 code。 */
export function directOAuthCode(value: string, redirect: string): string {
  if (typeof value !== 'string') throw serviceError('E_PASSKEY_OAUTH')
  const expected = httpUrl(redirect)
  const absolute =
    value.startsWith('/') && !value.startsWith('//') ? expected.origin + value : value
  const actual = httpUrl(absolute)
  if (actual.origin !== expected.origin || actual.path !== expected.path)
    throw serviceError('E_PASSKEY_OAUTH')
  let code = ''
  try {
    for (const pair of actual.query.split('&')) {
      const index = pair.indexOf('=')
      const key = decodeURIComponent(index < 0 ? pair : pair.slice(0, index))
      if (key === 'error') throw new Error()
      if (key !== 'code') continue
      if (code || index < 1) throw new Error()
      code = decodeURIComponent(pair.slice(index + 1))
      if (!code || /[\s\u0000-\u001f\u007f]/.test(code) || code.length > 4096) throw new Error()
    }
  } catch {
    throw serviceError('E_PASSKEY_OAUTH')
  }
  if (!code) throw serviceError('E_PASSKEY_OAUTH')
  return code
}

export function accessTokenResponse(value: unknown): AccessToken {
  let token: Record<string, unknown>
  try {
    token = objectResponse(value)
  } catch {
    throw serviceError('E_PASSKEY_OAUTH')
  }
  if (
    typeof token.access_token !== 'string' ||
    !token.access_token.trim() ||
    typeof token.refresh_token !== 'string' ||
    !token.refresh_token.trim() ||
    typeof token.token_type !== 'string' ||
    token.token_type.toLowerCase() !== 'bearer' ||
    typeof token.expires_in !== 'number' ||
    !Number.isFinite(token.expires_in) ||
    token.expires_in <= 0 ||
    !Number.isInteger(token.user_id) ||
    Number(token.user_id) <= 0 ||
    (token.scope !== undefined && token.scope !== null && typeof token.scope !== 'string')
  ) {
    throw serviceError('E_PASSKEY_OAUTH')
  }
  return { ...token, scope: token.scope ?? null } as AccessToken
}
