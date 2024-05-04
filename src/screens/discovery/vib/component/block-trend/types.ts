/*
 * @Author: czy0729
 * @Date: 2024-05-04 05:47:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 06:06:35
 */
import { Navigation, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  navigation: Navigation
  raw: {
    key: string
    value: string
  }
}
