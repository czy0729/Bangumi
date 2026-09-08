/*
 * @Author: czy0729
 * @Date: 2026-09-09 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 01:30:00
 */
import type { ModeProps } from '../types'

export type Props = Pick<
  ModeProps,
  | 'mode'
  | 'fixed'
  | 'title'
  | 'statusBarEventsType'
  | 'onBackPress'
  | 'headerLeft'
  | 'headerTitle'
  | 'color'
  | 'headerRight'
>
