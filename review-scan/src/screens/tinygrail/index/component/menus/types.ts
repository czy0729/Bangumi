/*
 * @Author: czy0729
 * @Date: 2025-05-14 14:53:13
 * @Last Modified by:   czy0729
 * @Last Modified time: 2025-05-14 14:53:13
 */
import { IconfontNames, Paths, ReactNode, ViewStyle } from '@types'

export type MenuItems = {
  title: string
  pathname?: Paths
  icon?: IconfontNames
  config?: {
    type: string
  }
  style?: () => ViewStyle
  dynamicTitle?: (...arg: any) => ReactNode
}[]
