/*
 * @Author: czy0729
 * @Date: 2024-05-04 05:47:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-16 14:07:20
 */
import { Navigation, ViewStyle } from '@types'
import { ItemNew } from '../../types'

export type Props = {
  style?: ViewStyle
  navigation: Navigation
  title: string
  data: ItemNew[]
}
