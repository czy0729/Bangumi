/*
 * @Author: czy0729
 * @Date: 2026-07-26 00:22:09
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-07-26 00:22:09
 */
import type { TouchableWithoutFeedbackProps } from 'react-native'

export type Props = TouchableWithoutFeedbackProps & {
  /**
   * withoutFeedback 路径没有按压视觉反馈, 不经过安卓轻量底座;
   * 设置为 true 强制使用 RN 原生 Touchable, 仅用于事件语义的对照与回退
   */
  useRN?: boolean
}
