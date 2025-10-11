/*
 * @Author: czy0729
 * @Date: 2023-06-10 14:18:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-20 15:54:02
 */
import { Fn, TextStyle, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle

  textStyle?: TextStyle

  /** 评分 */
  value: string | number

  /** 对齐方向 */
  position?: 'top' | 'bottom'

  /** 文字点击 */
  onPress?: Fn
}
