/*
 * @Author: czy0729
 * @Date: 2023-04-11 10:32:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 10:40:34
 */
import { Fn, ReactNode, ViewStyle } from '@types'

export type StorybookPageProps = {
  style?: ViewStyle
  container?: boolean
  wind?: boolean
  space?: boolean
  radius?: boolean
  children: ReactNode
}

export type StorybookListProps = {
  style?: ViewStyle
  wind?: boolean
  space?: boolean
  children: ReactNode
}

export type StorybookGridProps = {
  style?: ViewStyle
  wind?: boolean
  space?: boolean
  children: ReactNode
}

export type StorybookScrollProps = {
  style?: ViewStyle
  contentContainerStyle?: ViewStyle
  onFooterRefresh?: Fn
  children: ReactNode
}
