/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 00:24:52
 */
import type { TouchableOpacityProps } from 'react-native'

export type Props = TouchableOpacityProps & {
  /**
   * @deprecated iOS 端此值无变化
   * 安卓端 Touchable 都使用了 react-native-gesture-handler 提供的封装
   * 有比 RN 提供的更快的反馈效果，若设置为 true 强制使用 RN 提供的 Touchable
   */
  useRN?: boolean
}
