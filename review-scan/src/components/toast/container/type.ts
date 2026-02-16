/*
 * @Author: czy0729
 * @Date: 2024-07-09 07:33:32
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-07-09 07:33:32
 */
import { WithThemeStyles } from '@ant-design/react-native/lib/style'
import { ToastStyle } from '@ant-design/react-native/lib/toast/style/index'

export interface ToastProps extends WithThemeStyles<ToastStyle> {
  content: string
  duration?: number
  onClose?: () => void
  mask?: boolean
  type?: string
  onAnimationEnd?: () => void
}
