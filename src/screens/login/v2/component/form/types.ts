/*
 * @Author: czy0729
 * @Date: 2022-09-03 03:41:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 */
import type { InputInstance } from '@components'
import type { Navigation } from '@types'
import type { ChangeField } from '../../ds'

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
  forwardRef: (ref: InputInstance) => void
  onGetCaptcha: () => void
  onFocus: () => void
  onBlur: () => void
  onChange: (evt: { nativeEvent: { text: string } }, type: ChangeField) => void
  onLogin: () => void
  onSelect: (title?: string) => void
  onUAChange: () => void
  onSyncSettingChange: () => void
}
