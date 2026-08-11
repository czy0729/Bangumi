/*
 * @Author: czy0729
 * @Date: 2024-07-09 07:33:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
export interface ToastProps {
  content: string
  duration?: number
  onClose?: () => void
  mask?: boolean
  type?: string
  /** 动画结束 / 点击触发 */
  onAnimationEnd?: () => void
}