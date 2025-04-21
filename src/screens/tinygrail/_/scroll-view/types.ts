/*
 * @Author: czy0729
 * @Date: 2024-03-04 18:16:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 04:21:43
 */
import { PropsWithChildren } from 'react'
import { Fn, ViewStyle } from '@types'

export type Props = PropsWithChildren<{
  style?: ViewStyle
  contentContainerStyle?: ViewStyle
  onRefresh?: Fn
}>
