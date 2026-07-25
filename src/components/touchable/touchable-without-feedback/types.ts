/*
 * @Author: czy0729
 * @Date: 2026-07-26 00:22:09
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-07-26 00:22:09
 */
import type { TouchableWithoutFeedbackProps } from 'react-native'

export type Props = TouchableWithoutFeedbackProps & {
  /**
   * @deprecated iOS 端此值无变化
   * 安卓端 Touchable 都使用了 react-native-gesture-handler 提供的封装
   * 有比 RN 提供的更快的反馈效果，若设置为 true 强制使用 RN 提供的 Touchable
   */
  useRN?: boolean
}
