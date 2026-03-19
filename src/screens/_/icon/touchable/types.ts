/*
 * @Author: czy0729
 * @Date: 2022-10-18 16:34:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 04:38:30
 */
import type { PropsWithChildren } from 'react'
import type { Insets } from 'react-native'
import type { ColorValue, Fn, IconfontNames, WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    name: IconfontNames
    size?: number
    color?: ColorValue
    shadow?: boolean
    count?: number | string
    withoutFeedback?: boolean
    hitSlop?: Insets
    onPress?: Fn
  }>
>
