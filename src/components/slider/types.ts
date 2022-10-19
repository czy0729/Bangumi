/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:08:43
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-19 14:08:43
 */
import { SliderProps } from 'react-native'

export type Props = SliderProps & {
  /** SliderProps.value */
  defaultValue?: number

  /** SliderProps.minimumValue */
  min?: number

  /** SliderProps.maximumValue */
  max?: number

  /** SliderProps.onValueChange */
  onChange?: (value?: any) => any

  /** SliderProps.onSlidingComplete */
  onAfterChange?: (value?: any) => any
}
