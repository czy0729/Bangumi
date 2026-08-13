/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import { getWidth, normalPercent } from '../utils'

describe('normalPercent', () => {
  it('undefined 返回 0', () => {
    expect(normalPercent()).toBe(0)
  })

  it('负数返回 0', () => {
    expect(normalPercent(-10)).toBe(0)
  })

  it('0 返回 0', () => {
    expect(normalPercent(0)).toBe(0)
  })

  it('小于 100 返回原值', () => {
    expect(normalPercent(44)).toBe(44)
  })

  it('超过 100 截断到 100', () => {
    expect(normalPercent(120)).toBe(100)
  })

  it('[问题] 非数字输入不做 NaN 校验', () => {
    const result = normalPercent(NaN)
    expect(Number.isNaN(result)).toBe(false)
  })
})

describe('getWidth', () => {
  it('按容器宽度与百分比计算', () => {
    expect(getWidth(200, 50)).toBe(100)
  })

  it('100% 等于容器宽度', () => {
    expect(getWidth(300, 100)).toBe(300)
  })

  it('超过 100% 截断', () => {
    expect(getWidth(300, 150)).toBe(300)
  })

  it('percent 空时宽度为 0', () => {
    expect(getWidth(300)).toBe(0)
  })
})
