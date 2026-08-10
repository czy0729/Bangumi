/*
 * @Author: czy0729
 * @Date: 2026-08-11 00:50:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-11 05:59:14
 */
/** 是否使用 Reanimated 驱动扫光动画, false 时使用 RN Animated (原生驱动, 性能更优) */
export const USE_REANIMATED = false

/** 渐变起止点与颜色停止位置 */
export const GRADIENT = {
  start: { x: -1, y: 0.5 },
  end: { x: 2, y: 0.5 },
  locations: [0.3, 0.5, 0.7]
} as const
