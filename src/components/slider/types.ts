/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:08:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 03:10:00
 */
import type { SliderProps } from '@react-native-community/slider'

export type Props = SliderProps & {
  /** 初始值 */
  defaultValue?: number

  /** 最小值 */
  min?: number

  /** 最大值 */
  max?: number

  /** 滑动过程中回调 */
  onChange?: SliderProps['onValueChange']

  /** 滑动完成回调 */
  onAfterChange?: (value?: number) => void
}
