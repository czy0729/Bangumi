/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 01:15:12
 */
import type {
  TouchableHighlightProps as RNTouchableHighlightProps,
  TouchableNativeFeedbackProps as RNTouchableNativeFeedbackProps
} from 'react-native'
import type { GenericTouchableProps } from 'react-native-gesture-handler/src/components/touchables/GenericTouchableProps'
import type { Override, ViewStyle } from '@types'

/** TouchableAnimated Props */
export type TouchableAnimatedProps = GenericTouchableProps & {
  /** 容器样式 */
  style?: ViewStyle

  /**
   * @deprecated iOS 端此值无变化
   * 安卓端 Touchable 都使用了 react-native-gesture-handler 提供的封装
   * 有比 RN 提供的更快的反馈效果，若设置为 true 强制使用 RN 提供的 Touchable
   */
  useRN?: boolean

  /** 点击中动画缩放比例, 默认 0.95 */
  scale?: number
}

/** TouchableHighlight Props */
export type TouchableHighlightProps = Override<
  RNTouchableHighlightProps,
  {
    /**
     * @deprecated iOS 端此值无变化
     * 安卓端 Touchable 都使用了 react-native-gesture-handler 提供的封装
     * 有比 RN 提供的更快的反馈效果，若设置为 true 强制使用 RN 提供的 Touchable
     */
    useRN?: boolean
  }
>

/** TouchableNativeFeedback Props */
export type TouchableNativeFeedbackProps = Override<
  RNTouchableNativeFeedbackProps,
  {
    /** 容器样式 */
    style?: ViewStyle

    /**
     * @deprecated iOS 端此值无变化
     * 安卓端 Touchable 都使用了 react-native-gesture-handler 提供的封装
     * 有比 RN 提供的更快的反馈效果，若设置为 true 强制使用 RN 提供的 Touchable
     */
    useRN?: boolean
  }
>

/** TouchableReanimated Props */
export type TouchableReanimatedProps = Override<
  GenericTouchableProps,
  {
    /** 容器样式 */
    style?: ViewStyle

    /**
     * @deprecated iOS 端此值无变化
     * 安卓端 Touchable 都使用了 react-native-gesture-handler 提供的封装
     * 有比 RN 提供的更快的反馈效果，若设置为 true 强制使用 RN 提供的 Touchable
     */
    useRN?: boolean

    /** 点击中动画缩放比例, 默认 0.95 */
    scale?: number
  }
>
