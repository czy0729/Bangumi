/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 10:00:00
 *
 * 密码输入框 Props
 */
import type { InputInstance, InputProps } from '@components'

export type Props = {
  /** Input 容器样式 */
  style?: InputProps['style']

  /** 密码 */
  value: string

  /** 注册输入框实例 */
  forwardRef: (ref: InputInstance) => void

  /** 聚焦 */
  onFocus: () => void

  /** 失焦 */
  onBlur: () => void

  /** 变化 */
  onChange: (evt: { nativeEvent: { text: string } }) => void

  /** 键盘完成 */
  onSubmitEditing: () => void
}
