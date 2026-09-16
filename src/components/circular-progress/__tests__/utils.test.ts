/*
 * @Author: czy0729
 * @Date: 2026-09-16 22:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 23:15:18
 */
import { clampPercent, getCircularMetrics, getDashOffset, getProgressPercent } from '../utils'

describe('getProgressPercent', () => {
  it('正常进度取整 (向下)', () => {
    expect(getProgressPercent(1, 2)).toBe(50)
    expect(getProgressPercent(1, 3)).toBe(33)
    expect(getProgressPercent(999, 1000)).toBe(99)
    expect(getProgressPercent(100, 100)).toBe(100)
  })

  it('total 非法时返回 null (走不确定态)', () => {
    expect(getProgressPercent(100, 0)).toBeNull()
    expect(getProgressPercent(100, -1)).toBeNull()
    expect(getProgressPercent(100, NaN)).toBeNull()
    expect(getProgressPercent(100, Infinity)).toBeNull()
  })

  it('还没收到字节时返回 null, 不显示 0%', () => {
    expect(getProgressPercent(0, 100)).toBeNull()
    expect(getProgressPercent(-1, 100)).toBeNull()
  })

  it('不足 1% 也返回 null (引擎首个事件约 0.5%, 不该先闪一个 0%)', () => {
    expect(getProgressPercent(1, 200)).toBeNull()
    expect(getProgressPercent(1, 1000)).toBeNull()
    expect(getProgressPercent(4, 1000)).toBeNull()
    // 跨过 1% 立即给出 1
    expect(getProgressPercent(2, 200)).toBe(1)
  })

  it('loaded 非法时返回 null', () => {
    expect(getProgressPercent(NaN, 100)).toBeNull()
    expect(getProgressPercent(Infinity as unknown as number, Infinity)).toBeNull()
  })

  it('loaded 超过 total 时收敛到 100 (部分实现的字节口径含头部)', () => {
    expect(getProgressPercent(120, 100)).toBe(100)
  })
})

describe('clampPercent', () => {
  it('四舍五入并收敛到 0-100', () => {
    expect(clampPercent(120)).toBe(100)
    expect(clampPercent(-5)).toBe(0)
    expect(clampPercent(33.33)).toBe(33)
    expect(clampPercent(99.6)).toBe(100)
    expect(clampPercent(0)).toBe(0)
    expect(clampPercent(100)).toBe(100)
  })

  it('非有限数按 0 处理', () => {
    expect(clampPercent(NaN)).toBe(0)
    expect(clampPercent(Infinity)).toBe(0)
    expect(clampPercent(-Infinity)).toBe(0)
  })
})

describe('getCircularMetrics', () => {
  it('半径扣掉半个线宽, 周长为 2πr', () => {
    const { radius, circumference } = getCircularMetrics(40, 4)
    expect(radius).toBe(18)
    expect(circumference).toBeCloseTo(2 * Math.PI * 18, 6)
  })

  it('线宽大于尺寸时不出现负半径', () => {
    expect(getCircularMetrics(4, 8).radius).toBe(0)
    expect(getCircularMetrics(4, 8).circumference).toBe(0)
  })
})

describe('getDashOffset', () => {
  it('0% 完全隐藏, 100% 整圈显示', () => {
    expect(getDashOffset(0, 100)).toBe(100)
    expect(getDashOffset(100, 100)).toBe(0)
  })

  it('中间值按比例', () => {
    expect(getDashOffset(25, 100)).toBe(75)
    expect(getDashOffset(50, 100)).toBe(50)
  })

  it('越界输入被收敛', () => {
    expect(getDashOffset(-10, 100)).toBe(100)
    expect(getDashOffset(150, 100)).toBe(0)
  })
})
