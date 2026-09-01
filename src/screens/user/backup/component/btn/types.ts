/*
 * @Author: czy0729
 * @Date: 2026-07-02 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 20:52:52
 */
import type { ViewStyle, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  /** 按钮样式 */
  btnStyle?: ViewStyle

  /** 按钮文本 */
  text?: string

  /** 类型 (success 为绿色确认态) */
  type?: 'success'

  /** 文本大小 */
  size?: number

  /** 是否禁用 */
  disabled?: boolean

  /** 是否加载中 */
  loading?: boolean

  /** 点击回调 */
  onPress?: () => void
}>
