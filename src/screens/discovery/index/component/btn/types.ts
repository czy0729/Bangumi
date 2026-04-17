/*
 * @Author: czy0729
 * @Date: 2025-10-20 09:56:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 11:10:34
 */
import type { Fn, MenuItem, UserId, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  item: MenuItem
}>

export type MainProps = WithViewStyles<{
  item: MenuItem
  userId: UserId
  showIcon?: boolean
  onPress: Fn
}>
