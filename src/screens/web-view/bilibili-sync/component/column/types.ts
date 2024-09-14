/*
 * @Author: czy0729
 * @Date: 2024-09-14 18:04:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 18:06:07
 */
import { TextType } from '@components'
import { Fn, ReactNode, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  type?: TextType
  text?: string | number
  right?: ReactNode
  onPress?: Fn
}
