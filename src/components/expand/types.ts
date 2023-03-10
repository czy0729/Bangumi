/*
 * @Author: czy0729
 * @Date: 2022-05-31 08:31:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-10 19:56:02
 */
import { ViewStyle, ReactNode, Fn } from '@types'

export type Props = {
  /** 容器样式 */
  style?: ViewStyle

  /** 展开箭头样式 */
  moreStyle?: ViewStyle

  /** 比例 */
  ratio?: number

  /** 是否显示渐变 */
  linearGradient?: boolean

  /** 展开回调 */
  onExpand?: Fn

  children: ReactNode
}
