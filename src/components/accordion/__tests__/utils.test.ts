/*
 * @Author: czy0729
 * @Date: 2026-08-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 10:00:00
 */
import {
  getExpandTarget,
  getHiddenTranslateY,
  getMeasuredHeight,
  HIDDEN_SCALE,
  INITIAL_HIDDEN_TRANSLATE_Y,
  shouldUpdateHeight
} from '../utils'

describe('getMeasuredHeight', () => {
  it('低于下限收敛到 MIN_HEIGHT', () => {
    expect(getMeasuredHeight(0)).toBe(48)
    expect(getMeasuredHeight(20)).toBe(48)
  })

  it('等于或高于下限返回原值', () => {
    expect(getMeasuredHeight(48)).toBe(48)
    expect(getMeasuredHeight(120)).toBe(120)
  })
})

describe('shouldUpdateHeight', () => {
  it('差值小于 1px 视为抖动忽略', () => {
    expect(shouldUpdateHeight(100, 100)).toBe(false)
    expect(shouldUpdateHeight(100, 100.5)).toBe(false)
  })

  it('差值大于等于 1px 时更新', () => {
    expect(shouldUpdateHeight(100, 101)).toBe(true)
    expect(shouldUpdateHeight(100, 90)).toBe(true)
  })
})

describe('getHiddenTranslateY', () => {
  it('收起位移 = 自身高度 + 底部安全区', () => {
    expect(getHiddenTranslateY(120, 34)).toBe(154)
  })

  it('高度为 0 时仅剩底部安全区', () => {
    expect(getHiddenTranslateY(0, 34)).toBe(34)
  })
})

describe('getExpandTarget', () => {
  it('展开态: 位移 0, 缩放 1, 透明度 1', () => {
    expect(getExpandTarget(true, 0)).toMatchObject({ translateY: 0, scale: 1, opacity: 1 })
  })

  it('收起态: 位移为隐藏值, 缩放 0.9, 透明度 0', () => {
    expect(getExpandTarget(false, 154)).toMatchObject({
      translateY: 154,
      scale: HIDDEN_SCALE,
      opacity: 0
    })
  })

  it('动画对称: 隐藏位移即传入的隐藏值本身', () => {
    expect(getExpandTarget(false, 200).translateY).toBe(200)
    expect(INITIAL_HIDDEN_TRANSLATE_Y).toBeGreaterThan(0)
  })
})