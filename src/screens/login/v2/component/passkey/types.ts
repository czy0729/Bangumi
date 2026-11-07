/*
 * @Date: 2026-11-01
 *
 * 登录页 Passkey 按钮的共享 Props
 */
import type { PasskeyLoginView } from '../../passkey/ui-types'

export type Props = {
  /** 同一控制器用于预览页和密码表单 */
  passkey: PasskeyLoginView

  /** 密码认证期间禁止开始另一条认证链路 */
  blocked: boolean
}
