/*
 * @Author: czy0729
 * @Date: 2026-08-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 10:00:00
 */
import { MIN_HEIGHT } from './ds'

/** 隐藏态缩放, 与展开态 1 对称 */
export const HIDDEN_SCALE = 0.9

/** 首屏展开前隐藏态的位移兜底值 (高度未知, 取足够大的值) */
export const INITIAL_HIDDEN_TRANSLATE_Y = 1000

/** 高度测量值下限收敛 */
export function getMeasuredHeight(height: number): number {
  return Math.max(height, MIN_HEIGHT)
}

/** 微小抖动 (< 1px) 是否忽略 */
export function shouldUpdateHeight(prev: number, next: number): boolean {
  return Math.abs(prev - next) >= 1
}

/** 收起时向下位移 = 自身高度 + 底部安全区 */
export function getHiddenTranslateY(height: number, bottom: number): number {
  return height + bottom
}

/** 对称进出场目标值, 展开/收起动画共用同一来源 */
export function getExpandTarget(expand: boolean, hiddenTranslateY: number) {
  return {
    translateY: expand ? 0 : hiddenTranslateY,
    scale: expand ? 1 : HIDDEN_SCALE,
    opacity: expand ? 1 : 0
  } as const
}