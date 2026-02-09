/*
 * @Author: czy0729
 * @Date: 2025-05-13 14:39:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-10 07:39:57
 */
import type { PropsWithChildren } from 'react'
import type { Fn, WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    show: boolean
    onToggle: Fn
  }>
>
