/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import type { ReactNode } from 'react'

export type Props = {
  /** 首次出现时是否播放进入动画, 默认 false */
  animateAppear?: boolean

  /** 动画类型 */
  animationType?: 'none' | 'slide-up' | 'slide-down' | 'fade'

  /** 动画时长 (ms), 默认 300 */
  animationDuration?: number

  children?: ReactNode

  /** 聚焦输入时整体上移 */
  focus?: boolean

  /** 点击遮罩是否关闭, 默认 true */
  maskClosable?: boolean

  /** 遮罩样式 */
  maskStyle?: object

  /** 动画结束回调 */
  onAnimationEnd?: (visible: boolean) => void

  /** 关闭回调 */
  onClose?: () => void

  /** 内容区样式 */
  style?: object

  /** 是否显示, 默认 false */
  visible?: boolean

  /** 外层容器样式 */
  wrapStyle?: object
}