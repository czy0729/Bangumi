/*
 * @Author: czy0729
 * @Date: 2025-05-13 14:39:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-13 14:44:10
 */
import { PropsWithChildren } from 'react'
import { Fn, ViewStyle } from '@types'

export type Props = PropsWithChildren<{
  style?: ViewStyle
  show: boolean
  onToggle: Fn
}>
