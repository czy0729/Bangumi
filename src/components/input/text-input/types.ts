/*
 * @Author: czy0729
 * @Date: 2024-05-31 16:10:55
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-05-31 16:10:55
 */
import type { TextInput as RNTextInput, TextInputProps } from 'react-native'

export type Props = TextInputProps & {
  forwardRef: (ref: RNTextInput) => void
}
