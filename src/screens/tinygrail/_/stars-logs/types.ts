/*
 * @Author: czy0729
 * @Date: 2024-12-29 11:41:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 09:27:31
 */
import type { Fn, WithNavigation } from '@types'

export type Props = WithNavigation<{
  show: boolean
  onToggle: Fn
}>
