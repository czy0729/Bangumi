/*
 * @Author: czy0729
 * @Date: 2026-08-18 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-18 10:00:00
 */

/** 渐变方向, 模块级常量避免每次渲染创建新对象 */
export const GRADIENT_DIRECTION = {
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 }
} as const
