/*
 * @Author: czy0729
 * @Date: 2026-04-24 10:42:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-24 10:43:55
 */
import type { ScrollViewProps } from '@components'
import type { Override } from '@types'

export type Props = Override<
  ScrollViewProps,
  {
    value: string[]
    active?: string[]
    limit?: number
  }
>
