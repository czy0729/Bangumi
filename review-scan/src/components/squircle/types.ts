/*
 * @Author: czy0729
 * @Date: 2023-12-09 13:54:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-11 17:05:45
 */
import { ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle

  /** 容器宽度 */
  width: number

  /** 容器高度 */
  height: number

  /** 圆角大小, 会根据容器宽度, 自动计算适合比例的大小 */
  radius: number | boolean

  /** 子组件 */
  children?: any
}

export type getMaskPathInput = {
  width: number
  height: number
  radius?: number
  roundness?: number
}
