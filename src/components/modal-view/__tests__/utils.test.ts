/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 06:56:36
 */
import { getFocusMargin, getOpacity, getPosition, getScale } from '../utils'

const screenHeight = 800

describe('getPosition', () => {
  it('显示时归 0', () => {
    expect(getPosition('slide-up', true, screenHeight)).toBe(0)
  })

  it('slide-up 隐藏时从屏幕下方进入', () => {
    expect(getPosition('slide-up', false, screenHeight)).toBe(800)
  })

  it('slide-down 隐藏时从屏幕上方进入', () => {
    expect(getPosition('slide-down', false, screenHeight)).toBe(-800)
  })

  it('fade / none 恒为 0', () => {
    expect(getPosition('fade', false, screenHeight)).toBe(0)
    expect(getPosition('none', false, screenHeight)).toBe(0)
  })
})

describe('getScale', () => {
  it('显示缩放为 1', () => {
    expect(getScale(true)).toBe(1)
  })

  it('隐藏放大到 1.05 (正常到放大)', () => {
    expect(getScale(false)).toBe(1.05)
  })
})

describe('getOpacity', () => {
  it('显示为 1, 隐藏为 0', () => {
    expect(getOpacity(true)).toBe(1)
    expect(getOpacity(false)).toBe(0)
  })
})

describe('getFocusMargin', () => {
  it('向上取整偏移', () => {
    expect(getFocusMargin(800, 0.44)).toBe(-352)
  })

  it('Android 比例偏小', () => {
    expect(getFocusMargin(800, 0.24)).toBe(-192)
  })
})
