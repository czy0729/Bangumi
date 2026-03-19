/*
 * @Author: czy0729
 * @Date: 2022-06-13 20:45:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:25:16
 */
import type { PropsWithChildren } from 'react'
import type { Fn, ReactNode, WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    icon?: any
    left?: ReactNode
    right?: ReactNode
    splitStyles?: boolean
    onPress?: Fn
  }>
>
