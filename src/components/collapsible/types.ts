/*
 * @Author: czy0729
 * @Date: 2022-06-25 17:22:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-10 06:37:44
 */
import type { PropsWithChildren } from 'react'
import type { EasingFunction } from 'react-native'
import type { WithViewStyles } from '@types'

export type EasingMode =
  | 'linear'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'
  | 'easeInSine'
  | 'easeOutSine'
  | 'easeInOutSine'
  | 'easeInExpo'
  | 'easeOutExpo'
  | 'easeInOutExpo'
  | 'easeInCirc'
  | 'easeOutCirc'
  | 'easeInOutCirc'
  | 'easeInElastic'
  | 'easeOutElastic'
  | 'easeInOutElastic'
  | 'easeInBack'
  | 'easeOutBack'
  | 'easeInOutBack'
  | 'easeInBounce'
  | 'easeOutBounce'
  | 'easeInOutBounce'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 是否已折叠 */
    collapsed: boolean

    /** 折叠后的高度 */
    collapsedHeight?: number

    /** 动画时长（ms） */
    duration?: number

    /** 缓动函数，可为 Easing 名称或函数 */
    easing?: EasingMode | EasingFunction

    /** 折叠时是否允许指针事件 */
    enablePointerEvents?: boolean

    /** 动画结束回调 */
    onAnimationEnd?: () => void
  }>
>

/** useCollapsibleAnimation 选项 */
export type CollapsibleAnimationProps = Pick<
  Props,
  'collapsed' | 'collapsedHeight' | 'duration' | 'easing' | 'onAnimationEnd'
>
