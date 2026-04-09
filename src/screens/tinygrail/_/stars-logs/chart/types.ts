/*
 * @Author: czy0729
 * @Date: 2025-07-05 03:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 09:27:05
 */
import type { Id } from '@types'

export type Item = Record<
  string,
  {
    type: number
    monoId: Id
    name: string
    icon: string
    amount: number
  }
>
