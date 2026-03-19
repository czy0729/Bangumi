/*
 * @Author: czy0729
 * @Date: 2022-10-18 16:31:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 04:36:52
 */
import type { PropsWithChildren } from 'react'
import type { ColorValue, Fn, IconfontNames, WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    name?: IconfontNames
    text?: string
    size?: number
    color?: ColorValue
    position?: 'left' | 'right'
    onPress?: Fn
  }>
>
