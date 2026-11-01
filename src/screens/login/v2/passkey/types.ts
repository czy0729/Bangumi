/*
 * @Date: 2026-11-01
 *
 * Passkey 登录 options 与标准 assertion 的协议类型，不含原生/UI状态。
 */

/** 主站允许本次使用的凭据描述符。 */
export type PasskeyAllowedCredential = {
  /** 固定为公钥凭据，不允许密码或注册请求。 */
  type: 'public-key'

  /** 无填充的 base64url 凭据标识。 */
  id: string

  /** 服务端可选的认证器传输提示。 */
  transports?: string[]
}

/** 主站返回给 Credential Manager 的裸 publicKey 请求选项。 */
export type PasskeyRequestOptions = {
  /** 本次会话的服务端挑战，无填充的 base64url。 */
  challenge: string

  /** 首版只接受官方主站的 RP 标识。 */
  rpId: 'bgm.tv'

  /** 为空或省略时由认证器发现可用凭据。 */
  allowCredentials?: PasskeyAllowedCredential[]

  /** 服务端建议的超时时间，单位毫秒。 */
  timeout?: number

  /** 服务端的用户验证要求，不由客户端降级。 */
  userVerification?: 'required' | 'preferred' | 'discouraged'

  /** 保留服务端其余标准扩展选项。 */
  [key: string]: unknown
}

/** 认证器返回的标准 PublicKeyCredential；只用于验证，不含私钥。 */
export type PasskeyAssertion = {
  /** 凭据标识，必须与 rawId 对应同一字节串。 */
  id: string

  /** 原始凭据标识的无填充 base64url 编码。 */
  rawId: string

  /** 固定为公钥凭据。 */
  type: 'public-key'

  /** 认证器生成的签名响应，交由主站最终验签。 */
  response: {
    /** 参与签名的客户端数据字节，不重新序列化或修改来源。 */
    clientDataJSON: string

    /** 包含 RP 哈希、标志与计数器的认证器数据。 */
    authenticatorData: string

    /** 签名的无填充 base64url 编码。 */
    signature: string

    /** 可选用户句柄；未返回时规范为 null。 */
    userHandle: string | null
  }

  /** 认证器返回的标准客户端扩展结果。 */
  clientExtensionResults: Record<string, unknown>
}
