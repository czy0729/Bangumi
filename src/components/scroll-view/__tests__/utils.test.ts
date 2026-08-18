/*
 * @Author: czy0729
 * @Date: 2026-08-18 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-18 10:00:00
 */
import { SCROLL_THRESHOLD } from '../ds'
import { getShowMaskValue, shouldLockScrolling } from '../utils'

describe('shouldLockScrolling', () => {
  it('未超过阈值不锁定', () => {
    expect(shouldLockScrolling(0, 0, SCROLL_THRESHOLD)).toBe(false)
    expect(shouldLockScrolling(15, 0, SCROLL_THRESHOLD)).toBe(false)
    expect(shouldLockScrolling(0, 15, SCROLL_THRESHOLD)).toBe(false)
  })

  it('恰等于阈值不锁定 (严格大于)', () => {
    expect(shouldLockScrolling(SCROLL_THRESHOLD, 0, SCROLL_THRESHOLD)).toBe(false)
  })

  it('超过阈值锁定', () => {
    expect(shouldLockScrolling(17, 0, SCROLL_THRESHOLD)).toBe(true)
    expect(shouldLockScrolling(16.5, 0, SCROLL_THRESHOLD)).toBe(true)
  })

  it('向上滚动差值取绝对值同样生效', () => {
    expect(shouldLockScrolling(0, 17, SCROLL_THRESHOLD)).toBe(true)
    expect(shouldLockScrolling(0, 16, SCROLL_THRESHOLD)).toBe(false)
  })

  it('未传阈值时使用默认 SCROLL_THRESHOLD', () => {
    expect(shouldLockScrolling(16, 0)).toBe(false)
    expect(shouldLockScrolling(17, 0)).toBe(true)
  })
})

describe('getShowMaskValue', () => {
  it('非水平模式永远返回 false', () => {
    expect(getShowMaskValue(false, true, true)).toBe(false)
    expect(getShowMaskValue(false, undefined, true)).toBe(false)
  })

  it('显式传入覆盖全局设置', () => {
    expect(getShowMaskValue(true, true, false)).toBe(true)
    expect(getShowMaskValue(true, false, true)).toBe(false)
  })

  it('未显式传入时读全局设置', () => {
    expect(getShowMaskValue(true, undefined, true)).toBe(true)
    expect(getShowMaskValue(true, undefined, false)).toBe(false)
  })
})
