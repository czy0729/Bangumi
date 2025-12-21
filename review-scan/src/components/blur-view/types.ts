/*
 * @Author: czy0729
 * @Date: 2022-08-31 19:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-06 21:56:04
 */
import { Expand, ViewStyle } from '@types'

export type Props = Expand<{
  style?: ViewStyle

  /** 图片地址 */
  src?: string

  /** iOS only */
  tint?: 'default' | 'extraLight' | 'light' | 'dark'

  /** 高斯模糊度, 各端之间具体效果不一, 请自行确定具体值 (iOS only) */
  intensity?: number

  /** 图片模糊度 (android | web only) */
  blurRadius?: number

  /** 图片高度 */
  height?: number

  /** 图片是否允许 CDN */
  cdn?: boolean

  children?: any
}>
