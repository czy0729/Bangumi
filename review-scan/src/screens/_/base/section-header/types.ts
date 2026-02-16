/*
 * @Author: czy0729
 * @Date: 2022-06-14 15:14:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-14 15:18:34
 */
import { TextType } from '@components'
import { ViewStyle, ReactNode } from '@types'

export type Props = {
  style?: ViewStyle
  type?: TextType
  size?: number
  right?: ReactNode
  children?: any
}
