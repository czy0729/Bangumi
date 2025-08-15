/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:08:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-07 07:09:23
 */
import { SliderProps } from '@react-native-community/slider'

export type Props = SliderProps & {
  /** SliderProps.value */
  defaultValue?: number

  /** SliderProps.minimumValue */
  min?: number

  /** SliderProps.maximumValue */
  max?: number

  /** SliderProps.onValueChange */
  onChange?: SliderProps['onValueChange']

  /** SliderProps.onSlidingComplete */
  onAfterChange?: (value?: any) => any
}
