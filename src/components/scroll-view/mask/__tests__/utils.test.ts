/*
 * @Author: czy0729
 * @Date: 2026-08-18 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-18 10:00:00
 */
import { DEFAULT_MASK_WIDTH } from '../ds'
import { getMaskWidthValue } from '../utils'

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
