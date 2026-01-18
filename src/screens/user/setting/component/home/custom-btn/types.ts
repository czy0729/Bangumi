/*
 * @Author: czy0729
 * @Date: 2026-01-18 13:09:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 20:56:40
 */
import type { Fn, MenuItem, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  item?: MenuItem
  active?: boolean
  onPress?: Fn
}>
