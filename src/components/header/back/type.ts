/*
 * @Author: czy0729
 * @Date: 2023-12-04 14:36:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-09 03:15:27
 */
import type { ColorValue, Fn, WithNavigation, WithViewStyles } from '@types'

export type Props = WithNavigation<
  WithViewStyles<{
    /** 箭头颜色 */
    color?: ColorValue

    /** 点击回调 */
    onPress?: Fn
  }>
>
