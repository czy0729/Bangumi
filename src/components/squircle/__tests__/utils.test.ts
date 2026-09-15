/*
 * @Author: czy0729
 * @Date: 2026-09-16 00:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 01:17:04
 *
 * 说明: squircle/utils 在模块加载期就会读 _.web 与 _.radiusXs / Sm / Md / Lg,
 * 而 jest/setup.js 的全局 @stores mock 不含这些字段, 所以这里必须局部覆盖
 */
jest.mock('@stores', () => ({
  _: {
    // 与 src/stores/theme/action.ts 的 web(webValue, otherValue) 语义一致: 非 web 环境取第二个值
    web: (_webValue: number, otherValue: number) => otherValue,
    radiusXs: 6,
    radiusSm: 8,
    radiusMd: 12,
    radiusLg: 16
  }
}))

import {
  DEFAULT_ROUNDNESS,
  getMaskPath,
  getRadius,
  getRoundness,
  getSquirclePath,
  getSquircleShape,
  getTierRadius,
  ROUND_ROUNDNESS
} from '../utils'

describe('getTierRadius', () => {
  it('按尺寸档位取圆角, 边界包含等于', () => {
    expect(getTierRadius(120, 6)).toBe(12)
    expect(getTierRadius(80, 6)).toBe(12)
    expect(getTierRadius(79, 6)).toBe(8)
    expect(getTierRadius(40, 6)).toBe(8)
    expect(getTierRadius(39, 6)).toBe(6)
    expect(getTierRadius(0, 6)).toBe(6)
  })

  it('小于 40 时返回调用方给的小值 (getRadius 传 MIN_RADIUS, Radius 降级实现传 radiusXs)', () => {
    expect(getTierRadius(20, 4)).toBe(4)
    expect(getTierRadius(20, 6)).toBe(6)
  })
})

describe('getRadius', () => {
  it('按 radius 档位提比例: 低于最小档用 0.12/0.16/0.2, 达到 radiusLg 用 0.24', () => {
    expect(getRadius(100, 16)).toBe(24)
    expect(getRadius(100, 20)).toBe(24)
    expect(getRadius(100, 14)).toBe(20)
  })

  it('不传 radius 时按尺寸取默认档位', () => {
    expect(getRadius(100)).toBe(20)
    expect(getRadius(50)).toBe(16)
    expect(getRadius(20)).toBe(8)
  })

  it('小卡有最小圆角兜底, 大卡有上限', () => {
    expect(getRadius(20, 8)).toBe(8)
    expect(getRadius(1000, 20)).toBe(40)
  })

  it('长宽相等且 radius 大于等于 size 时认为是圆', () => {
    expect(getRadius(20, 20)).toBe(20)
    expect(getRadius(20, 999)).toBe(999)
  })

  it('radius 为 true 且 size 为 1 时也返回数值, 不把布尔透传给原生 float 属性', () => {
    const value = getRadius(1, true)

    expect(typeof value).toBe('number')
    expect(value).toBe(1)
  })

  it('size 为 0 时回退到档位值', () => {
    expect(getRadius(0, 14)).toBe(14)
    expect(getRadius(0)).toBe(8)
  })

  it('同参数重复调用结果稳定 (命中缓存)', () => {
    expect(getRadius(100, 14)).toBe(getRadius(100, 14))
  })
})

describe('getRoundness', () => {
  it('圆形特例用 ROUND_ROUNDNESS', () => {
    expect(getRoundness(20, 20)).toBe(ROUND_ROUNDNESS)
    expect(getRoundness(20, 999)).toBe(ROUND_ROUNDNESS)
  })

  it('其余情况用 DEFAULT_ROUNDNESS', () => {
    expect(getRoundness(100, 14)).toBe(DEFAULT_ROUNDNESS)
    expect(getRoundness(100)).toBe(DEFAULT_ROUNDNESS)
    expect(getRoundness(0, 100)).toBe(DEFAULT_ROUNDNESS)
  })
})

describe('getSquircleShape', () => {
  it('尺寸取宽高里有效的一个, 圆角与圆润度与单独调用一致', () => {
    expect(getSquircleShape({ width: 100, height: 50, radius: 14 })).toEqual({
      size: 100,
      radius: getRadius(100, 14),
      roundness: getRoundness(100, 14)
    })
  })

  it('width 为 0 时退回 height', () => {
    expect(getSquircleShape({ width: 0, height: 80, radius: 14 }).size).toBe(80)
  })

  it('不传 radius 时按尺寸取默认档位', () => {
    expect(getSquircleShape({ width: 100, height: 100 }).radius).toBe(20)
  })
})

describe('getSquirclePath', () => {
  it('四段三次贝塞尔围成超椭圆轨迹, 且已压成单行', () => {
    const path = getSquirclePath(10, 20, 3, 6)

    expect(path).toContain('M 0,6')
    expect(path).toContain('L 4,0')
    expect(path).toContain('L 10,14')
    expect(path).toContain('L 6,20')
    expect(path.match(/C /g)).toHaveLength(4)
    expect(path.includes('\n')).toBe(false)
  })

  it('r1 大于 r2 时被夹到 r2', () => {
    expect(getSquirclePath(10, 20, 9, 6)).toBe(getSquirclePath(10, 20, 6, 6))
  })

  it('同参数返回同一引用 (命中缓存)', () => {
    expect(getSquirclePath(11, 21, 3, 6)).toBe(getSquirclePath(11, 21, 3, 6))
  })
})

describe('getMaskPath', () => {
  it('正方形且 radius 足够大时按圆处理: 半径夹到一半边长并改用 ROUND_ROUNDNESS', () => {
    const path = getMaskPath({ width: 100, height: 100, radius: 100 })

    // 半径被夹到 min(w, h) / 2 = 50, 圆特例的控制点偏移 = 50 * 0.35 = 17.5
    expect(path).toContain('M 0,50')
    expect(path).toContain('C 0,17.5 17.5,0 50,0')
  })

  it('radius 超过 min(w, h) / 2 时被夹', () => {
    expect(getMaskPath({ width: 100, height: 50, radius: 999 })).toContain('M 0,25')
  })

  it('可显式传入圆润度 (两个平台入口共用同一份曲线定义)', () => {
    const path = getMaskPath({ width: 100, height: 100, radius: 20, roundness: 0.5 })

    expect(path).toContain('C 0,10 10,0 20,0')
  })

  it('radius 被误传字符串时按最大圆角处理 (防御分支)', () => {
    const path = getMaskPath({ width: 100, height: 100, radius: '30' as unknown as number })

    expect(path).toContain('M 0,50')
  })

  it('同参数返回同一引用 (命中缓存)', () => {
    expect(getMaskPath({ width: 33, height: 33, radius: 10 })).toBe(
      getMaskPath({ width: 33, height: 33, radius: 10 })
    )
  })
})
