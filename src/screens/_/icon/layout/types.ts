/*
 * @Author: czy0729
 * @Date: 2022-10-18 15:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 21:51:53
 */
import type { PropsWithChildren } from 'react'
import type { Fn, WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    list?: boolean
    size?: number
    onPress?: Fn
  }>
>
