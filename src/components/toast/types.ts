/*
 * @Author: czy0729
 * @Date: 2026-08-12 08:40:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 08:50:00
 */

/** 提示类型 */
export type ToastType = '' | 'info' | 'loading'

export type Props = {
  content: string

  /** 停留时长 (s), 默认 3 */
  duration?: number

  /** 关闭回调 */
  onClose?: () => void

  /** 是否拦截点击, 默认 true */
  mask?: boolean

  /** 提示类型 */
  type?: ToastType

  /** 动画结束 / 点击触发 */
  onAnimationEnd?: () => void
}
