/*
 * @Author: czy0729
 * @Date: 2024-04-05 13:18:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:19:13
 */
import type { PropsWithChildren } from 'react'
import type { WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    current: number
    total: number
  }>
>
