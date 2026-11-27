/*
 * @Author: czy0729
 * @Date: 2026-11-27 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-27 00:00:00
 *
 * 密码登录对外接口: hooks 只依赖它, 不关心具体平台实现
 */
import type { AccessToken } from '@stores/user/types'

export interface PasswordLoginService {
  /** 登录使用的域名 */
  host: string

  /** 请求使用的 User-Agent */
  userAgent: string

  /** 是否已经拿到 chii_auth */
  readonly authorized: boolean

  /** 授权得到的 access_token */
  readonly accessToken: AccessToken

  /** 当前 cookie 串 */
  readonly cookieString: string

  /** 当前网络路径能否拿到 chii_auth */
  readonly canCaptureAuth: boolean

  /** 重建本次登录状态 */
  reset(): void

  /** 获取 User-Agent */
  fetchUserAgent(isCommonUA: boolean): Promise<void>

  /** 获取表单 hash (含建会话 / 清理旧登录态) */
  fetchFormHash(): Promise<void>

  /** 获取验证码 data URI */
  fetchCaptcha(): Promise<string>

  /** 密码登录 */
  login(email: string, password: string, captcha: string): Promise<string>

  /** 获取授权表单码 */
  fetchAuthorizeFormHash(): Promise<void>

  /** 授权拿 code */
  authorize(): Promise<void>

  /** code 换 token */
  fetchAccessToken(): Promise<void>

  /** 检查并清理系统 cookie 里的旧登录态 */
  probeHome(): Promise<void>

  /** 登录前的平台准备 */
  applySupporter(): boolean

  /** 还原平台准备阶段的改动 */
  restoreProxy(): void
}
