/*
 * @Author: czy0729
 * @Date: 2023-12-04 14:36:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 14:36:37
 */
import { Navigation, ColorValue, Fn } from '@types'

export type Props = {
  navigation: Navigation

  /** 箭头颜色 */
  color?: ColorValue

  /** 点击回调 */
  onPress?: Fn
}
