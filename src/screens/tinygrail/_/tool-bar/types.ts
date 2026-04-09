/*
 * @Author: czy0729
 * @Date: 2022-11-07 15:32:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 09:28:11
 */
import type { Fn, WithViewStyles } from '@types'

type Item = {
  label: string
  value: string
}

export type Props = WithViewStyles<{
  data?: readonly Item[]
  sort?: any
  level?: any
  levelMap?: Record<string, number>
  direction?: '' | 'up' | 'down'
  renderLeft?: any
  onSortPress?: Fn
  onSortLongPress?: Fn
  onLevelSelect?: Fn
}>
