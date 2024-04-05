/*
 * @Author: czy0729
 * @Date: 2024-04-05 13:18:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-05 13:19:19
 */
import { PropsWithChildren } from 'react'
import { ViewStyle } from '@types'

export type Props = PropsWithChildren<{
  style?: ViewStyle
  current: number
  total: number
}>
