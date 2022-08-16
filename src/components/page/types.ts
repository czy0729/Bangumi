/*
 * @Author: czy0729
 * @Date: 2022-08-16 12:49:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 12:50:32
 */
import { ViewStyle, ColorValue } from '@types'

export type Props = {
  /** 样式 */
  style?: ViewStyle

  /** 是否加载中，通常传入 store._loaded */
  loaded?: boolean | string | number

  /** 加载指示器颜色 */
  loadingColor?: ColorValue

  /** 加载指示器背景颜色 */
  backgroundColor?: ColorValue

  /** 页面结构 */
  children?: any
}
