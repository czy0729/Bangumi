/*
 * @Author: czy0729
 * @Date: 2025-06-19 14:59:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 09:26:21
 */
import type { WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  size?: 'md' | 'sm' | 'xs'
  assets: number
  sacrifices: number
  refine?: number
  star?: boolean
}>
