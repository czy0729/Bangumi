/*
 * @Date: 2026-11-01
 *
 * Passkey 登录控制器与页面共享的展示类型
 */
import type { Navigation } from '@types'

export type PasskeyLoginParams = {
  /** 密码登录正在进行, 禁止开启另一条认证链路 */
  blocked: boolean

  /** 密码、游客与 Passkey 共用的同步登录锁 */
  loginLock: { current: boolean }

  /** 页面导航 */
  navigation: Navigation

  /** 沿用登录页的云端设置同步选项 */
  isSyncSetting: boolean
}

export type PasskeyRunParams = {
  /** 每次 await 后检查本次登录是否仍有效 */
  assertActive: () => void

  /** 延迟读取导航和同步选项, 避免异步闭包过期 */
  getContext: () => Pick<PasskeyLoginParams, 'navigation' | 'isSyncSetting'>

  /** 更新不包含敏感数据的流程提示 */
  onProgress: (message: string) => void

  /** 通知控制器原生凭据 UI 是否尚未结束 */
  onNativeRequest: (pending: boolean) => void
}

export type PasskeyLoginView = {
  /** 仅 Android 14+ 展示该入口 */
  visible: boolean

  /** 当前 Passkey 登录流程是否占用中 */
  loading: boolean

  /** 不包含服务器原始响应和凭据的流程提示 */
  message: string

  /** 发起一次登录, 用户取消后不会自动重试 */
  onLogin: () => Promise<void>

  /** 作废本次登录并取消正在显示的凭据请求 */
  onCancel: () => void
}
