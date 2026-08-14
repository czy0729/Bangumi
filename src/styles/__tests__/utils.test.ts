/*
 * @Author: czy0729
 * @Date: 2026-08-14 19:00:13
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-14 19:00:13
 */
import { lineHeightRatio } from '@styles/layout'
import { fontSize } from '@styles/utils'

/**
 * 只测派生关系 (静态断言没意义):
 *  - lineHeight 必须与 fontSize * lineHeightRatio 一致
 *  - fontSizeAdjust 同时作用到 font 与 lineHeight
 */
describe('fontSize 行高派生', () => {
  it('lineHeight = floor(fontSize * lineHeightRatio)', () => {
    for (const pt of [8, 10, 12, 13, 14, 16, 20, 32]) {
      const { fontSize: f, lineHeight } = fontSize(pt)
      expect(f).toBe(Math.floor(pt))
      expect(lineHeight).toBe(Math.floor(pt * lineHeightRatio))
    }
  })

  it('fontSizeAdjust 同时作用到 font 与 lineHeight', () => {
    const adjust = 3
    const { fontSize: f, lineHeight } = fontSize(14, adjust)
    expect(f).toBe(Math.floor(14 + adjust))
    expect(lineHeight).toBe(Math.floor((14 + adjust) * lineHeightRatio))
  })
})

/**
 * WEB 分支 (全局 mock WEB:false, 需隔离模块并覆盖 @constants/device):
 *  - <12px 非 transform 强制最小 12px, 计算用 ceil
 *  - transform 模式按比例缩放并给出 marginRight 补偿
 */
describe('fontSize WEB 分支', () => {
  let fontSizeWeb: typeof fontSize

  beforeAll(() => {
    jest.resetModules()
    jest.doMock('@constants/device', () => ({
      PAD: 0,
      PAD_LEVEL_1: 616,
      PAD_LEVEL_2: 900,
      RATIO: 1,
      STORYBOOK_HEIGHT: 812,
      STORYBOOK_WIDTH: 375,
      WEB: true,
      WSA: false
    }))
    fontSizeWeb = require('@styles/utils').fontSize
  })

  it('<12px 强制最小 12px 且行高用 ceil', () => {
    const { fontSize: f, lineHeight } = fontSizeWeb(10)
    expect(f).toBe(12)
    expect(lineHeight).toBe(Math.ceil(12 * lineHeightRatio))
  })

  it('transform 模式按比例缩放', () => {
    const result = fontSizeWeb(10, 0, true)
    expect(result.fontSize).toBe(12)
    expect(result.lineHeight).toBe(12)
    expect(result.transform).toEqual([{ scale: 10 / 11 }])
    expect(result.marginRight).toBeCloseTo(-((1 - 10 / 11) * 12))
  })

  it('正常字号计算用 ceil', () => {
    expect(fontSizeWeb(14)).toEqual({ fontSize: 14, lineHeight: Math.ceil(14 * lineHeightRatio) })
  })
})
