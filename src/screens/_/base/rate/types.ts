/*
 * @Author: czy0729
 * @Date: 2023-06-10 14:18:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-12 04:00:45
 */
import { Fn } from '@types'

export type Props = {
  /** 评分 */
  value: string | number

  /** 对齐方向 */
  position?: 'top' | 'bottom'

  /** 文字点击 */
  onPress?: Fn
}
