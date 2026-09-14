/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 */
import type { TextStyle } from 'react-native'
import type { InputInstance } from '@components'

export type Props = {
  forwardRef: (ref: InputInstance) => void
  style?: TextStyle
  value: string
  onFocus: () => void
  onBlur: () => void
  onChange: (evt: { nativeEvent: { text: string } }) => void
  onSubmitEditing: () => void
}
