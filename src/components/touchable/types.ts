/*
 * @Author: czy0729
 * @Date: 2022-05-28 07:50:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-15 13:39:30
 */
import { Insets } from 'react-native'
import { ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle

  /** 是否无反馈效果 */
  withoutFeedback?: boolean

  /** 是否高亮反馈效果 */
  highlight?: boolean

  /** 是否防止快速多次点击 */
  delay?: boolean

  /** 设置元素能够检测到按压动作的额外距离 */
  hitSlop?: Insets

  /** 在 onPressOut 和 onPress 之前的时间 */
  delayPressIn?: number

  /** 松开手后的时间 */
  delayPressOut?: number

  /**
   * iOS 端此值无变化
   * 安卓端 <Touchable> 都使用了 react-native-gesture-handler 提供的封装
   * 有比 RN 提供的更快的反馈效果，若设置为 true 强制使用 RN 提供的 <Touchable>
   */
  useRN?: boolean

  /** 涟漪状的背景（安卓 only） */
  ripple?: boolean

  /** onPressOut 之后调用 */
  onPress?: (event?: any) => any

  onLongPress?: (event?: any) => any

  children?: any
}
