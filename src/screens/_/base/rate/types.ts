/*
 * @Author: czy0729
 * @Date: 2023-06-10 14:18:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-15 12:39:55
 */
import type { TextProps } from '@components'
import type { Fn, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  /** 强制覆盖样式 */
  textStyle?: TextProps['overrideStyle']

  /** 评分 */
  value: string | number

  /** 对齐方向 */
  position?: 'top' | 'bottom'

  /** 文字点击 */
  onPress?: Fn
}>
