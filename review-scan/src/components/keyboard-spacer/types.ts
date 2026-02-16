/*
 * @Author: czy0729
 * @Date: 2022-08-31 19:54:13
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-31 19:54:13
 */
import { ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  topSpacing?: number
  animate?: boolean
  onToggle?: (toggle?: boolean, keyboardSpace?: number) => any
}
