/*
 * @Author: czy0729
 * @Date: 2022-10-18 15:39:13
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-10-18 15:39:13
 */
import { Fn, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  list?: boolean
  size?: number
  onPress?: Fn
  children?: any
}
