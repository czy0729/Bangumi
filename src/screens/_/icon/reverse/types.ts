/*
 * @Author: czy0729
 * @Date: 2022-10-18 16:30:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 01:25:12
 */
import type { PropsWithChildren } from 'react'
import type { ColorValue, Fn, TextStyle, WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    iconStyle?: TextStyle
    color?: ColorValue
    size?: number
    onPress?: Fn
  }>
>
