/*
 * @Author: czy0729
 * @Date: 2022-09-03 03:41:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 10:00:00
 *
 * 登录表单 Props
 */
import type { InputInstance } from '@components'
import type { Navigation } from '@types'
import type { ChangeField } from '../../types'

export type Props = {
  /** 导航 */
  navigation: Navigation

  /** 当前流程提示文案 */
  info: string

  /** 邮箱 */
  email: string

  /** 密码 */
  password: string

  /** 验证码 */
  captcha: string

  /** 验证码图片 data URI */
  base64: string

  /** 是否使用固定 UA 登录 */
  isCommonUA: boolean

  /** 是否登录后同步云端设置 */
  isSyncSetting: boolean

  /** 当前登录域名 */
  host: string

  /** 请求中 */
  loading: boolean

  /** 登录是否已最终失败 */
  failed: boolean

  /** 是否因网络问题失败 */
  networkFailed: boolean

  /** 注册验证码输入框实例 */
  forwardRef: (ref: InputInstance) => void

  /** 刷新验证码 */
  onGetCaptcha: () => void

  /** 输入框聚焦 */
  onFocus: () => void

  /** 输入框失焦 */
  onBlur: () => void

  /** 输入框变化 */
  onChange: (evt: { nativeEvent: { text: string } }, type: ChangeField) => void

  /** 提交登录 */
  onLogin: () => void

  /** 切换登录域名 */
  onSelect: (title?: string) => void

  /** 切换是否使用固定 UA */
  onUAChange: () => void

  /** 切换是否同步云端设置 */
  onSyncSettingChange: () => void
}
