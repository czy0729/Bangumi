/*
 * @Author: czy0729
 * @Date: 2022-06-14 11:32:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-04 08:10:36
 */
import { TextType } from '@components'
import { ViewStyle } from '@types'

export type Props = {
  /** 容器样式 */
  style?: ViewStyle

  /** 强制使用的文字颜色 */
  type?: TextType

  /** 标签值 */
  value?: string | number

  /** 文字大小 */
  size?: number

  /** 文字对齐 */
  align?: 'left' | 'center' | 'right'

  children?: any
}
