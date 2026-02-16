/*
 * @Author: czy0729
 * @Date: 2024-03-04 18:16:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-13 15:58:46
 */
import { PropsWithChildren } from 'react'
import { ScrollViewProps } from '@components'
import { Fn, ViewStyle } from '@types'

export type Props = PropsWithChildren<{
  forwardRef?: ScrollViewProps['forwardRef']
  style?: ViewStyle
  contentContainerStyle?: ViewStyle
  onRefresh?: Fn
}>
