/*
 * @Author: czy0729
 * @Date: 2025-08-09 16:07:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-09 16:20:30
 */
import { PropsWithChildren } from 'react'
import { NavigationPushType, Paths, ViewStyle } from '@types'

type ExtractParams<P extends Paths> = NavigationPushType extends (
  path: P,
  params?: infer Params
) => any
  ? Params
  : never

export type Props<T extends Paths> = PropsWithChildren<{
  style?: ViewStyle
  path: T
  params?: ExtractParams<T>
  getParams?: () => ExtractParams<T>
}>
