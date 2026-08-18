/*
 * @Author: czy0729
 * @Date: 2026-08-18 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-18 10:00:00
 */
import { SCROLL_THRESHOLD } from './ds'

/** 滑动距离是否超过阈值, 超过才锁定全局点击 (防止小幅抖动/慢滑被误判为滚动) */
export function shouldLockScrolling(
  currentY: number,
  startY: number,
  threshold: number = SCROLL_THRESHOLD
): boolean {
  return Math.abs(currentY - startY) > threshold
}

/** 是否显示左右渐隐遮罩 (仅水平模式有效, 未显式传入时读全局设置) */
export function getShowMaskValue(
  horizontal: boolean,
  showMask: boolean | undefined,
  horizontalShowMask: boolean
): boolean {
  if (!horizontal) return false
  return showMask === undefined ? horizontalShowMask : showMask
}
