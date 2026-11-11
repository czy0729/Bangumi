/*
 * @Author: Q16KBreak
 * @Date: 2026-11-01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-11 21:15:25
 *
 * Passkey 协议类型、登录参数与控制器视图
 */
import type { Navigation } from '@types'

/** 主站允许本次使用的凭据描述符 */
export type PasskeyAllowedCredential = {
  /** 固定为公钥凭据，不允许密码或注册请求 */
  type: 'public-key'

  /** 无填充的 base64url 凭据标识 */
  id: string

  /** 服务端可选的认证器传输提示 */
  transports?: string[]
}

/** 主站返回给 Credential Manager 的裸 publicKey 请求选项 */
export type PasskeyRequestOptions = {
  /** 本次会话的服务端挑战，无填充的 base64url */
  challenge: string

  /** 首版只接受官方主站的 RP 标识 */
  rpId: 'bgm.tv'

  /** 为空或省略时由认证器发现可用凭据 */
  allowCredentials?: PasskeyAllowedCredential[]

  /** 服务端建议的超时时间，单位毫秒 */
  timeout?: number

  /** 服务端的用户验证要求，不由客户端降级 */
  userVerification?: 'required' | 'preferred' | 'discouraged'

  /** 保留服务端其余标准扩展选项 */
  [key: string]: unknown
}

/** 认证器返回的标准 PublicKeyCredential，只用于验证，不含私钥 */
export type PasskeyAssertion = {
  /** 凭据标识，必须与 rawId 对应同一字节串 */
  id: string

  /** 原始凭据标识的无填充 base64url 编码 */
  rawId: string

  /** 固定为公钥凭据 */
  type: 'public-key'

  /** 认证器生成的签名响应，交由主站最终验签 */
  response: {
    /** 参与签名的客户端数据字节，不重新序列化或修改来源 */
    clientDataJSON: string

    /** 包含 RP 哈希、标志与计数器的认证器数据 */
    authenticatorData: string

    /** 签名的无填充 base64url 编码 */
    signature: string

    /** 可选用户句柄，未返回时规范为 null */
    userHandle: string | null
  }

  /** 认证器返回的标准客户端扩展结果 */
  clientExtensionResults: Record<string, unknown>
}

/** 登录入口控制器参数 */
export type PasskeyLoginParams = {
  /** 密码登录正在进行，禁止开启另一条认证链路 */
  blocked: boolean

  /** 密码、游客与 Passkey 共用的同步登录锁 */
  loginLock: { current: boolean }

  /** 页面导航 */
  navigation: Navigation

  /** 沿用登录页的云端设置同步选项 */
  isSyncSetting: boolean
}

/** 单次登录管线参数 */
export type PasskeyRunParams = {
  /** 每次 await 后检查本次登录是否仍有效 */
  assertActive: () => void

  /** 延迟读取导航和同步选项，避免异步闭包过期 */
  getContext: () => Pick<PasskeyLoginParams, 'navigation' | 'isSyncSetting'>

  /** 更新不包含敏感数据的流程提示 */
  onProgress: (message: string) => void

  /** 通知控制器原生凭据 UI 是否尚未结束 */
  onNativeRequest: (pending: boolean) => void

  /** 登录成功、写入用户状态之前通知控制器 */
  onSuccess: () => void
}

/** 登录入口控制器视图 */
export type PasskeyLoginView = {
  /** 当前环境是否展示该入口 */
  visible: boolean

  /** 当前 Passkey 登录流程是否占用中 */
  loading: boolean

  /** 不包含服务器原始响应和凭据的流程提示 */
  message: string

  /** 发起一次登录，用户取消后不会自动重试 */
  onLogin: () => Promise<void>

  /** 作废本次登录并取消正在显示的凭据请求 */
  onCancel: () => void
}
