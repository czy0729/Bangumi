/*
 * @Author: czy0729
 * @Date: 2022-09-03 03:41:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-22 19:10:18
 */
import { Fn, Navigation } from '@types'

export type Props = {
  navigation: Navigation
  info: string
  email: string
  password: string
  captcha: string
  base64: string
  isCommonUA: boolean
  isSyncSetting: boolean
  host: string
  loading: boolean
  failed: boolean
  forwardRef: Fn
  onGetCaptcha: Fn
  onFocus: Fn
  onBlur: Fn
  onChange: Fn
  onLogin: Fn
  onSelect: Fn
  onUAChange: Fn
  onSyncSettingChange: Fn
}
