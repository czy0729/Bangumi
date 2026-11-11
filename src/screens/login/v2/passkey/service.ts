/*
 * @Date: 2026-11-01
 *
 * Passkey 登录网络链路：会话准备、主站验签与复用 OAuth 授权，不写入用户状态。
 */
import { urlStringify } from '@utils'
import { LoginService } from '../service'
import {
  assertionResponse,
  objectResponse,
  PASSKEY_COOKIETIME,
  PASSKEY_ORIGIN,
  requestOptions
} from './protocol'
import { sanitizeServiceError, serviceError } from './service-errors'

import type { PasskeyRequestOptions } from './types'
import type { PasskeyServiceErrorCode } from './service-errors'

type Phase =
  | 'new'
  | 'preparing'
  | 'prepared'
  | 'verifying'
  | 'verified'
  | 'finishing'
  | 'finished'
  | 'failed'

/** 每个实例只保存一次登录会话，不访问用户 store，也不经过远程反代。 */
export class PasskeyLoginService extends LoginService {
  private options?: PasskeyRequestOptions
  private phase: Phase = 'new'

  constructor(assertActive?: () => void) {
    super(PASSKEY_ORIGIN, { direct: true, assertActive })
  }

  /** 获取裸 publicKey options JSON，交由原生桥执行 getCredential。 */
  async prepare(): Promise<string> {
    if (['preparing', 'verifying', 'finishing'].includes(this.phase)) {
      throw serviceError('E_PASSKEY_OPTIONS')
    }
    return this.step('E_PASSKEY_OPTIONS', async () => {
      this.reset()
      this.options = undefined
      this.phase = 'preparing'
      await this.fetchUserAgent(false)
      this.assertActive()
      if (typeof this.userAgent !== 'string' || !this.userAgent.trim()) {
        throw serviceError('E_PASSKEY_OPTIONS')
      }
      await this.fetchFormHash()
      this.assertActive()
      if (!this._formhash) throw serviceError('E_PASSKEY_INVALID_RESPONSE')
      const result = await this.post('options', {
        formhash: this._formhash,
        cookietime: PASSKEY_COOKIETIME
      })
      this.assertActive()
      if (result.ok !== true) throw serviceError('E_PASSKEY_OPTIONS')
      this.options = requestOptions(result.options)
      this.phase = 'prepared'
      return JSON.stringify(this.options)
    })
  }

  /** 校验绑定本次 challenge 的 assertion，再由主站完成最终验签。 */
  async verify(assertionJson: string): Promise<void> {
    if (this.phase !== 'prepared' || !this.options) throw serviceError('E_PASSKEY_VERIFY')
    const options = this.options
    return this.step('E_PASSKEY_VERIFY', async () => {
      this.phase = 'verifying'
      const credential = assertionResponse(assertionJson, options)
      const result = await this.post('verify', {
        formhash: this._formhash,
        cookietime: PASSKEY_COOKIETIME,
        challenge: options.challenge,
        credential
      })
      this.assertActive()
      if (result.ok !== true) throw serviceError('E_PASSKEY_VERIFY_REJECTED')
      if (!this.authorized) throw serviceError('E_PASSKEY_SESSION')
      this.options = undefined
      this.phase = 'verified'
    })
  }

  /** 复用密码登录的 OAuth 三步；成功前不向任何 store 写入状态。 */
  async finish(): Promise<void> {
    if (this.phase !== 'verified' || !this.authorized) throw serviceError('E_PASSKEY_OAUTH')
    return this.step('E_PASSKEY_OAUTH', async () => {
      this.phase = 'finishing'
      await this.fetchAuthorizeFormHash()
      this.assertActive()
      await this.authorize()
      this.assertActive()
      await this.fetchAccessToken()
      this.assertActive()
      this.phase = 'finished'
    })
  }

  private async post(path: 'options' | 'verify', payload: Record<string, unknown>) {
    this.assertActive()
    const response = await this.request<unknown>({
      method: 'post',
      url: `${PASSKEY_ORIGIN}/passkey/login/${path}`,
      headers: this.getHeaders(['Content-Type']),
      data: urlStringify({ payload: JSON.stringify(payload) })
    })
    this.assertActive()
    if (response.status !== 200)
      throw serviceError(path === 'options' ? 'E_PASSKEY_OPTIONS' : 'E_PASSKEY_VERIFY_HTTP')
    return objectResponse(response.data)
  }

  private async step<T>(fallback: PasskeyServiceErrorCode, action: () => Promise<T>): Promise<T> {
    try {
      this.assertActive()
      const result = await action()
      this.assertActive()
      return result
    } catch (error) {
      let safeError = sanitizeServiceError(error, fallback)
      try {
        this.assertActive()
      } catch {
        safeError = serviceError('E_PASSKEY_CANCELLED')
      }
      this.options = undefined
      this.phase = 'failed'
      this.reset()
      throw safeError
    }
  }
}
