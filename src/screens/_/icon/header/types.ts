/*
 * @Author: czy0729
 * @Date: 2022-10-18 15:34:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 21:49:08
 */
import type { ColorValue, IconfontNames, WithViewStyles } from '@types'
import type { PropsWithChildren } from 'react'

export type Props = PropsWithChildren<
  WithViewStyles<{
    size?: number
    name?: IconfontNames
    color?: ColorValue
    shadow?: boolean
    onPress?: (event?: any) => any
  }>
>
