/*
 * @Author: czy0729
 * @Date: 2026-08-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 10:00:00
 */
import { computeRomajiTop } from '../anchor.android'

import type { TextLayoutLine } from 'react-native'

const makeLine = (over: Partial<TextLayoutLine>): TextLayoutLine => ({
  x: 10,
  y: 20,
  width: 100,
  height: 23,
  text: 'アニメとゲーム',
  ascender: 14,
  capHeight: 9,
  descender: 4,
  xHeight: 0,
  ...over
})

describe('computeRomajiTop (Android)', () => {
  it('常规满行高态: 锚定行盒顶 line.y + ROMAJI_OVERLAP - size', () => {
    // 20 + 3 - 8 = 15
    expect(computeRomajiTop(makeLine({}), 8, 14, 0)).toBeCloseTo(15, 5)
  })

  it('满行高态与 line.height 一致时补偿为 0', () => {
    expect(computeRomajiTop(makeLine({ height: 23 }), 8, 14, 23)).toBeCloseTo(15, 5)
  })

  it('行高收敛后按行高差比例上移补偿', () => {
    // 收敛态行高 15 (满行高 22), 基底文字上移 comp = (asc/height) * (22-15)
    const converged = makeLine({
      height: 15,
      ascender: 10.64,
      descender: 4.36
    })
    const comp = (10.64 / 15) * (22 - 15)
    expect(computeRomajiTop(converged, 8, 12, 22)).toBeCloseTo(20 + 3 - 8 - comp, 5)
  })

  it('与 iOS 公式严格隔离: 不依赖 ascender/capHeight 缩放', () => {
    // 相同 line 数据下 Android 结果不受 ascender 变化影响
    const a = computeRomajiTop(makeLine({ ascender: 14 }), 8, 14, 0)
    const b = computeRomajiTop(makeLine({ ascender: 17 }), 8, 14, 0)
    expect(a).toBeCloseTo(b, 5)
  })
})