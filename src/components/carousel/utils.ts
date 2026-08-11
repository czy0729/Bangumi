/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import type { ReactNode } from 'react'
import { Children } from 'react'

/** 统计自动播放所需的数组子元素个数, 空数组时按 1 处理 (组件层无 children 会提前 return null, 不产生空页) */
export function getChildrenCount(children?: ReactNode): number {
  if (!children) return 0
  const count = Children.count(children)
  return count || 1
}

/** 归一化索引到 [0, count - 1] */
export function clampIndex(index: number, count: number): number {
  if (count <= 1) return 0
  return Math.min(Math.max(index, 0), count - 1)
}

/** 初始页 */
export function getInitialIndex(count: number, selectedIndex: number): number {
  return count > 1 ? clampIndex(selectedIndex, count) : 0
}

export type UpdateIndexResult = {
  index: number
  loopJump: boolean
  /** infinite 模式下回跳后的目标 offset */
  offsetTo: number
}

/** 根据偏移量差值计算滚动结束后的当前页 */
export function getUpdatedIndex(
  prevIndex: number,
  diff: number,
  step: number,
  count: number,
  infinite: boolean
): UpdateIndexResult {
  if (!diff || step <= 0) {
    return { index: prevIndex, loopJump: false, offsetTo: 0 }
  }
  let index = prevIndex + Math.round(diff / step)
  let loopJump = false
  let offsetTo = 0
  if (infinite) {
    if (index <= -1) {
      index = count - 1
      offsetTo = step * count
      loopJump = true
    } else if (index >= count) {
      index = 0
      offsetTo = step
      loopJump = true
    }
  } else {
    index = clampIndex(index, count)
  }
  return { index, loopJump, offsetTo }
}

/** 自动播放 / 下一页的滚动偏移 (infinite 模式整体右移一页) */
export function getNextOffset(currentIndex: number, count: number, infinite: boolean, step: number): number {
  const diff = (infinite ? 1 : 0) + currentIndex + 1
  return diff * step
}