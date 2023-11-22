/*
 * @Author: czy0729
 * @Date: 2022-06-03 15:48:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-22 06:02:39
 */
import { ViewStyle, EventKeys, Fn } from '@types'

export type Props = {
  /** 样式 */
  style: ViewStyle

  /** Input 样式 */
  inputStyle?: ViewStyle

  /** Input 页码 */
  input: string

  /** 事件埋点 */
  heatmaps?: {
    prev?: EventKeys
    next?: EventKeys
    search?: EventKeys
  }

  /** 上一页回调 */
  onPrev?: Fn

  /** 下一页回调 */
  onNext?: Fn

  /** 输入框变化回调 */
  onChange?: Fn

  /** 输入框键盘提交回调 */
  onSearch?: Fn
}
