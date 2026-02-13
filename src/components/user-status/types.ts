/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:19:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-19 14:20:58
 */
import type { PropsWithChildren } from 'react'
import type { UserId, WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    last?: number
    userId?: UserId
    mini?: boolean
  }>
>
