/*
 * @Author: czy0729
 * @Date: 2023-02-28 16:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 00:24:52
 */
import type { TouchableOpacityProps } from 'react-native'

export type Props = TouchableOpacityProps & {
  /**
   * 安卓端默认走轻量底座 (按下用 setValue 命令式变暗, 抬手用原生驱动恢复),
   * 设置为 true 强制使用 RN 原生 TouchableOpacity, 用于真机对照与回退
   */
  useRN?: boolean
}
