/*
 * @Author: czy0729
 * @Date: 2025-08-09 16:07:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-09 16:20:30
 */
import { PropsWithChildren } from 'react'
import { Paths, ViewStyle } from '@types'

export type Props = PropsWithChildren<{
  style?: ViewStyle
  path: Paths
}>
