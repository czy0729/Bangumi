/*
 * @Author: czy0729
 * @Date: 2022-06-14 11:44:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-14 11:48:00
 */
import { ViewStyle } from '@types'

type Direction = 'top' | 'bottom' | 'left' | 'right' | 'vertical' | 'horizontal'
type ForceInset = 'always' | 'never'

export type Props = {
  style?: ViewStyle
  forceInset?: {
    [K in Direction]?: ForceInset
  }
  children?: any
}
