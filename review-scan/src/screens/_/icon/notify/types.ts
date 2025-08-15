/*
 * @Author: czy0729
 * @Date: 2022-06-15 13:43:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 13:45:06
 */
import { EventType, Navigation, ViewStyle } from '@types'

export type Props = {
  navigation?: Navigation
  style?: ViewStyle
  children?: any
  event?: EventType
}
