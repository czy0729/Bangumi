/*
 * @Author: czy0729
 * @Date: 2026-03-10 22:21:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-22 10:00:00
 */
import type { SharedValue } from 'react-native-reanimated'
import type { WithViewStyles } from '@types'
import type { PropsWithChildren } from 'react'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 重力敏感度 (影响偏移像素大小) */
    sensitivity?: number

    /** 是否响应 */
    enabled?: boolean

    /** 是否反转动画 */
    reverse?: boolean

    /** 是否产生旋转动画 */
    enableRotate?: boolean
  }>
>

/** 视差共享值 */
export type ParallaxValues = {
  /** 水平偏移 */
  translateX: SharedValue<number>

  /** 垂直偏移 */
  translateY: SharedValue<number>

  /** X 轴旋转角 */
  rotateX: SharedValue<number>

  /** Y 轴旋转角 */
  rotateY: SharedValue<number>

  /** 旋转是否生效 */
  rotateEnabled: SharedValue<boolean>
}

/** useParallax 参数 */
export type UseParallaxOptions = {
  /** 页面聚焦且应用在前台 */
  active: boolean

  /** 是否响应 */
  enabled: boolean

  /** 是否产生旋转动画 */
  enableRotate: boolean
}
