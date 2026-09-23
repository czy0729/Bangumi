/*
 * @Author: czy0729
 * @Date: 2026-09-22 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-22 10:00:00
 * */
import type { ParallaxValues } from '../types'

export type SensorDriverProps = Pick<
  ParallaxValues,
  'rotateEnabled' | 'translateX' | 'translateY' | 'rotateX' | 'rotateY'
> & {
  /** 重力敏感度 (影响偏移像素大小) */
  sensitivity: number

  /** 是否反转动画 */
  reverse: boolean
}
