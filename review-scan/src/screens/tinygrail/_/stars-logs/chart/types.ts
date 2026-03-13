/*
 * @Author: czy0729
 * @Date: 2025-07-05 03:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-05 04:00:08
 */
import { Id } from '@types'

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
