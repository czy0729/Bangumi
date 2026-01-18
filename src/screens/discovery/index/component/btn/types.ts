/*
 * @Author: czy0729
 * @Date: 2025-10-20 09:56:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-17 21:29:40
 */
import type { Fn, MenuItem, UserId } from '@types'

export type Props = {
  item: MenuItem
}

export type MainProps = {
  item: MenuItem
  userId: UserId
  showIcon?: boolean
  onPress: Fn
}
