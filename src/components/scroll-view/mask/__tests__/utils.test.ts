/*
 * @Author: czy0729
 * @Date: 2026-08-18 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 00:46:45
 */
import { DEFAULT_MASK_WIDTH } from '../ds'
import { getMaskColors, getMaskWidthValue } from '../utils'

const base = {
  isPad: false,
  wind: 12,
  contentWind: 12,
  padMultiplier: 1,
  isIOS: true
}

describe('getMaskWidthValue', () => {
  it('iPhone 上等于 maskWidth', () => {
    expect(getMaskWidthValue(DEFAULT_MASK_WIDTH, base)).toBe(DEFAULT_MASK_WIDTH)
    expect(getMaskWidthValue(32, base)).toBe(32)
  })

  it('Android 手机额外 +24', () => {
    expect(getMaskWidthValue(DEFAULT_MASK_WIDTH, { ...base, isIOS: false })).toBe(
      DEFAULT_MASK_WIDTH + 24
    )
  })

  it('iPad 且宽度达到 DEFAULT_MASK_WIDTH 时补偿倍率宽度', () => {
    const r = getMaskWidthValue(DEFAULT_MASK_WIDTH, {
      ...base,
      isPad: true,
      wind: 40,
      contentWind: 16
    })
    expect(r).toBe(DEFAULT_MASK_WIDTH + (40 - 16) * 2)
  })

  it('iPad 但宽度未达 DEFAULT_MASK_WIDTH 不补偿', () => {
    const r = getMaskWidthValue(32, { ...base, isPad: true, wind: 40, contentWind: 16 })
    expect(r).toBe(32)
  })

  it('平板补偿与 Android 补偿叠加', () => {
    const r = getMaskWidthValue(DEFAULT_MASK_WIDTH, {
      ...base,
      isPad: true,
      wind: 40,
      contentWind: 16,
      isIOS: false
    })
    expect(r).toBe(DEFAULT_MASK_WIDTH + (40 - 16) * 2 + 24)
  })
})

describe('getMaskColors', () => {
  it('按 RGB 原始值构造 3 色渐变 (实 → 过渡 → 全透明)', () => {
    expect(getMaskColors('255, 255, 255')).toEqual([
      'rgba(255, 255, 255, 1)',
      'rgba(255, 255, 255, 0.06)',
      'rgba(255, 255, 255, 0)'
    ])
  })

  it('不同主题色产出不同颜色 (主题切换能重算的前提)', () => {
    expect(getMaskColors('36, 36, 36')[0]).not.toBe(getMaskColors('255, 255, 255')[0])
  })

  it('相同入参产出相同结果 (可供 useMemo 稳定引用)', () => {
    expect(getMaskColors('255, 255, 255')).toEqual(getMaskColors('255, 255, 255'))
  })
})
