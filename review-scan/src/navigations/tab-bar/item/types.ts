/*
 * @Author: czy0729
 * @Date: 2025-03-06 17:43:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-06 17:43:42
 */
import { Navigation } from '@types'
import { RoutesConfig, State } from '../types'

export type Props = {
  navigation: Navigation
  route: State['routes'][number]
  length: number
  config: RoutesConfig[number]
  isFocused: boolean
}
