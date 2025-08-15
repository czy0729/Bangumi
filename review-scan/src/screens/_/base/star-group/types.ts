/*
 * @Author: czy0729
 * @Date: 2022-06-13 12:47:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-13 12:49:39
 */
import { ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle

  /** 分数默认值 */
  value: number

  /** 分数选择回调 */
  onChange: (value?: number) => any
}
