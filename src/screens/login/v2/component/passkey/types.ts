/*
 * @Author: Q16KBreak
 * @Date: 2026-11-01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 00:00:00
 *
 * Passkey 登录入口与说明入口的类型
 */
import type { PasskeyLoginView } from '../../passkey/types'

/** 登录入口 Props */
export type Props = {
  /** 同一控制器用于预览页和密码表单 */
  passkey: PasskeyLoginView

  /** 密码认证期间禁止开始另一条认证链路 */
  blocked: boolean
}

/** 说明入口 Props */
export type GuideProps = {
  /** 认证进行中不响应点击 */
  disabled: boolean
}
