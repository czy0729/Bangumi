/*
 * @Author: czy0729
 * @Date: 2022-09-03 03:41:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 04:10:44
 */
import type { Navigation } from '@types'

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
  networkFailed: boolean
  forwardRef: (ref: unknown) => void
  onGetCaptcha: () => void
  onFocus: () => void
  onBlur: () => void
  onChange: (evt: { nativeEvent: { text: string } }, type: string) => void
  onLogin: () => void
  onSelect: (title?: string) => void
  onUAChange: () => void
  onSyncSettingChange: () => void
}
