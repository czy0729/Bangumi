/*
 * @Author: czy0729
 * @Date: 2022-11-07 15:32:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-07 16:40:24
 */
import { Fn, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  data: any[] | readonly any[]
  sort?: any
  level?: any
  levelMap?: Record<string, number>
  direction?: '' | 'up' | 'down'
  renderLeft?: any
  onSortPress?: Fn
  onLevelSelect?: Fn
}
