/*
 * @Author: czy0729
 * @Date: 2026-08-12 07:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 07:00:00
 */
import { shouldCloseOnDragEnd, shouldShowDragHint } from '../utils'

const DRAG_THRESHOLD = 72

describe('shouldShowDragHint', () => {
  it('从顶部开始下拉超过阈值返回 true', () => {
    expect(shouldShowDragHint(0, -80, DRAG_THRESHOLD)).toBe(true)
  })

  it('从顶部开始但未超过阈值返回 false', () => {
    expect(shouldShowDragHint(0, -50, DRAG_THRESHOLD)).toBe(false)
  })

  it('从顶部开始向上滑 (正距离) 返回 false', () => {
    expect(shouldShowDragHint(0, 30, DRAG_THRESHOLD)).toBe(false)
  })

  it('从非顶部 (已滚动) 开始下拉返回 false', () => {
    expect(shouldShowDragHint(100, -100, DRAG_THRESHOLD)).toBe(false)
  })

  it('dragStartY 为负值视为顶部, 下拉超过阈值返回 true', () => {
    expect(shouldShowDragHint(-10, -80, DRAG_THRESHOLD)).toBe(true)
  })

  it('恰好等于阈值不触发 (严格大于)', () => {
    expect(shouldShowDragHint(0, -DRAG_THRESHOLD, DRAG_THRESHOLD)).toBe(false)
  })
})

describe('shouldCloseOnDragEnd', () => {
  it('仍处于顶部且下拉超过阈值返回 true', () => {
    expect(shouldCloseOnDragEnd(0, -80, DRAG_THRESHOLD)).toBe(true)
  })

  it('已向下滚动过则不下拉收起返回 false', () => {
    expect(shouldCloseOnDragEnd(120, -80, DRAG_THRESHOLD)).toBe(false)
  })

  it('下拉未超过阈值返回 false', () => {
    expect(shouldCloseOnDragEnd(0, -60, DRAG_THRESHOLD)).toBe(false)
  })

  it('向上滑 (正距离) 返回 false', () => {
    expect(shouldCloseOnDragEnd(0, 40, DRAG_THRESHOLD)).toBe(false)
  })

  it('恰好等于阈值不触发 (严格大于)', () => {
    expect(shouldCloseOnDragEnd(0, -DRAG_THRESHOLD, DRAG_THRESHOLD)).toBe(false)
  })

  it('[问题] 下拉过程中滚动位置回到 0 以下时仍可收起', () => {
    expect(shouldCloseOnDragEnd(-10, -90, DRAG_THRESHOLD)).toBe(true)
  })
})
