/*
 * @Author: czy0729
 * @Date: 2024-07-09 07:33:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 01:33:44
 */
import type { Animated } from 'react-native'
import type { WithThemeStyles } from '@ant-design/react-native/lib/style'
import type { ToastStyle } from '@ant-design/react-native/lib/toast/style/index'

export interface ToastProps extends WithThemeStyles<ToastStyle> {
  content: string
  duration?: number
  onClose?: () => void
  mask?: boolean
  type?: string
  onAnimationEnd?: () => void
}

export type State = {
  fadeAnim: Animated.Value
  showClose: boolean
}
