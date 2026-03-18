/*
 * @Author: czy0729
 * @Date: 2022-06-13 08:05:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 03:15:19
 */
import type { WithViewStyles } from '@types'
import type { PropsWithChildren } from 'react'

export type Props = PropsWithChildren<
  WithViewStyles<{
    intensity?: number
  }>
>
