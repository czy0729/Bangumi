/*
 * @Author: czy0729
 * @Date: 2024-03-04 18:16:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-09 09:26:45
 */
import type { PropsWithChildren } from 'react'
import type { ScrollViewProps } from '@components'
import type { Fn, ViewStyle, WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    forwardRef?: ScrollViewProps['forwardRef']
    contentContainerStyle?: ViewStyle
    onRefresh?: Fn
  }>
>
