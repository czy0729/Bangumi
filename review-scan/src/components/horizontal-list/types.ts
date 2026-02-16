/*
 * @Author: czy0729
 * @Date: 2022-08-28 15:45:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-24 20:55:12
 */
import { Fn, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  contentContainerStyle?: ViewStyle
  data: any[]

  /** 未滑动的情况下，最多显示多少项 */
  initialRenderNums?: number
  renderItem?: Fn
  renderNums?: Fn

  /** 水平滑动到侧 */
  onEndReachedOnce?: Fn
}
