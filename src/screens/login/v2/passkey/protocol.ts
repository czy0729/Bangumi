/*
 * @Author: Q16KBreak
 * @Date: 2026-11-01
 * @Last Modified by: Q16KBreak
 * @Last Modified time: 2026-11-11 23:10:00
 *
 * Passkey 请求/断言的严格协议校验，以及直连 OAuth 回调和 Token 校验
 */
import Base64 from '@utils/thirdParty/base64'
import { serviceError } from './errors'

import type { AccessToken } from '@stores/user/types'
import type { PasskeyAssertion, PasskeyRequestOptions } from './types'

/** 主站来源，同时作为 Credential Manager 的 delegated origin */
export const PASSKEY_ORIGIN = 'https://bgm.tv'

/** 登录 cookie 有效期，单位秒 */
export const PASSKEY_COOKIETIME = 2592000

/** 主站 options 允许的顶层字段，与原生层白名单保持一致 */
const REQUEST_KEYS = [
  'rpId',
  'challenge',
  'timeout',
  'allowCredentials',
  'userVerification',
  'extensions'
]

/** 允许的认证器传输方式，与原生层白名单保持一致 */
const TRANSPORTS = ['usb', 'nfc', 'ble', 'internal', 'hybrid', 'smart-card']

/** 拆分后的 https 绝对地址 */
type HttpUrl = {
  /** 协议 + 主机 */
  origin: string

  /** 不含 query 的路径 */
  path: string

  /** 不含 `?` 的查询串 */
  query: string
}

/**
 * 解析并校验 JSON 对象
 *
 * @param value 原始 JSON 字符串或已解析对象
 */
export function objectResponse(value: unknown): Record<string, unknown> {
  try {
    const parsed: unknown = typeof value === 'string' ? JSON.parse(value) : value
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as Record<string, unknown>
    }
  } catch {}
  throw serviceError('E_PASSKEY_INVALID_RESPONSE')
}

/**
 * 严格解码 base64url 并检查规范编码，允许 provider 返回带 `=` 填充的形式
 *
 * @param value 无填充或有填充的 base64url 字符串
 * @param max 解码前允许的最大字符数
 */
function binary(value: unknown, max: number = 65536): string {
  if (typeof value !== 'string' || !value || value.length > Math.ceil((max + 2) / 3) * 4) {
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  }
  const unpadded = value.replace(/=+$/, '')
  if (!unpadded || !/^[A-Za-z0-9_-]+$/.test(unpadded))
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  if (unpadded.length % 4 === 1) throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  try {
    const decoded = Base64.atob(unpadded.replace(/-/g, '+').replace(/_/g, '/'))
    const encoded = Base64.btoa(decoded).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
    if (encoded === unpadded && decoded.length <= max) return decoded
  } catch {}
  throw serviceError('E_PASSKEY_INVALID_RESPONSE')
}

/**
 * 校验主站返回的 publicKey 请求选项
 *
 * @param value 主站返回的 options 字段
 */
export function requestOptions(value: unknown): PasskeyRequestOptions {
  const options = objectResponse(value)
  for (const key of Object.keys(options)) {
    if (!REQUEST_KEYS.includes(key)) throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  }
  const challenge = binary(options.challenge, 1024)
  if (options.rpId !== 'bgm.tv' || challenge.length < 16 || challenge.length > 1024) {
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  }
  if (options.extensions !== undefined) {
    if (Object.keys(objectResponse(options.extensions)).length) {
      throw serviceError('E_PASSKEY_INVALID_RESPONSE')
    }
  }
  if (options.allowCredentials !== undefined) {
    if (!Array.isArray(options.allowCredentials)) throw serviceError('E_PASSKEY_INVALID_RESPONSE')
    if (options.allowCredentials.length > 128) throw serviceError('E_PASSKEY_INVALID_RESPONSE')
    for (const item of options.allowCredentials) {
      const credential = objectResponse(item)
      for (const key of Object.keys(credential)) {
        if (!['type', 'id', 'transports'].includes(key)) {
          throw serviceError('E_PASSKEY_INVALID_RESPONSE')
        }
      }
      if (credential.type !== 'public-key') throw serviceError('E_PASSKEY_INVALID_RESPONSE')
      binary(credential.id, 1024)
      if (credential.transports !== undefined) {
        if (!Array.isArray(credential.transports)) throw serviceError('E_PASSKEY_INVALID_RESPONSE')
        if (credential.transports.length > 6) throw serviceError('E_PASSKEY_INVALID_RESPONSE')
        for (const transport of credential.transports) {
          if (typeof transport !== 'string' || !TRANSPORTS.includes(transport)) {
            throw serviceError('E_PASSKEY_INVALID_RESPONSE')
          }
        }
      }
    }
  }
  if (
    options.timeout !== undefined &&
    (typeof options.timeout !== 'number' ||
      !Number.isInteger(options.timeout) ||
      options.timeout < 1 ||
      options.timeout > 600000)
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

/**
 * 校验原生返回的 assertion 是否绑定本次 challenge
 *
 * @param json 原生桥返回的 PublicKeyCredential JSON
 * @param options 本次登录的请求选项
 */
export function assertionResponse(
  json: string,
  options: PasskeyRequestOptions
): PasskeyAssertion {
  if (typeof json !== 'string' || json.length > 131072)
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  const credential = objectResponse(json)
  const response = objectResponse(credential.response)
  if (
    credential.type !== 'public-key' ||
    binary(credential.id, 1024) !== binary(credential.rawId, 1024)
  ) {
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  }
  const allowed = options.allowCredentials
  if (
    allowed?.length &&
    !allowed.some(item => binary(item.id, 1024) === binary(credential.rawId, 1024))
  ) {
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  }
  let clientData: Record<string, unknown>
  try {
    const bytes = binary(response.clientDataJSON, 16384)
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
    binary(clientData.challenge, 1024) !== binary(options.challenge, 1024) ||
    (clientData.crossOrigin !== undefined && clientData.crossOrigin !== false) ||
    clientData.topOrigin !== undefined
  ) {
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  }
  if (binary(response.authenticatorData).length < 37)
    throw serviceError('E_PASSKEY_INVALID_RESPONSE')
  binary(response.signature, 8192)
  if (
    response.userHandle !== undefined &&
    response.userHandle !== null &&
    response.userHandle !== ''
  ) {
    binary(response.userHandle, 1024)
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

/**
 * 拆分 https 绝对地址，不依赖 RN 旧版 URL 尚未实现的 origin / hostname getter
 *
 * @param url 待拆分的地址
 */
function httpUrl(url: string): HttpUrl {
  if (typeof url !== 'string' || /[\s\\#]/.test(url)) throw serviceError('E_PASSKEY_OAUTH')
  const match = /^(https:\/\/[^/?#]+)(\/[^?#]*)?(?:\?([^#]*))?$/.exec(url)
  if (!match) throw serviceError('E_PASSKEY_OAUTH')
  return { origin: match[1], path: match[2] || '/', query: match[3] || '' }
}

/**
 * 请求地址必须属于主站来源
 *
 * @param url 请求地址
 * @param origin 允许的来源
 */
export function assertRequestOrigin(url: string, origin: string) {
  if (httpUrl(url).origin !== origin) throw serviceError('E_PASSKEY_INVALID_RESPONSE')
}

/**
 * 地址是否属于指定来源
 *
 * @param url 待判断地址
 * @param origin 允许的来源
 */
export function isSameOrigin(url: string, origin: string): boolean {
  try {
    return httpUrl(url.split('#')[0]).origin === origin
  } catch {
    return false
  }
}

/**
 * 地址是否指向指定来源的同一路径
 *
 * @param url 待判断地址
 * @param target 目标地址
 */
export function isSameOriginPath(url: string, target: string): boolean {
  const actual = httpUrl(url)
  const expected = httpUrl(target)

  return actual.origin === expected.origin && actual.path === expected.path
}

/**
 * 从直连重定向地址提取 OAuth code，只信真实 Location / XHR 最终 URL
 *
 * @param value 重定向地址
 * @param redirect 注册的 redirect_uri
 */
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

/**
 * 校验 OAuth token 响应
 *
 * @param value 接口返回数据
 */
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
