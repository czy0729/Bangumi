/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 22:12:21
 */
import { AMBIENT_SPREAD_RATIO, BLUR_HEIGHT_RATIO } from '../ds'
import { getCoverBlurLayout, isBlurAvailable } from '../utils'

describe('getCoverBlurLayout', () => {
  it('按注入比例算出三层高度', () => {
    // height 100: 色场 50% = 50, 黑罩跟随色场, 氛围层 +10% = 60
    expect(getCoverBlurLayout({ height: 100, blurRatio: 0.5, ambientSpreadRatio: 0.1 })).toEqual({
      blur: 50,
      scrim: 50,
      ambient: 60
    })
  })

  it('不传比例时使用 ds 里的默认值 (断言公式, 不受调参影响)', () => {
    const layout = getCoverBlurLayout({ height: 100 })

    expect(layout.blur).toBe(Math.round(100 * BLUR_HEIGHT_RATIO))
    expect(layout.scrim).toBe(layout.blur)
    expect(layout.ambient).toBe(layout.blur + Math.round(100 * AMBIENT_SPREAD_RATIO))
  })

  it('调用方传入的高度优先于比例默认值', () => {
    expect(getCoverBlurLayout({ height: 100, blurHeight: 30, scrimHeight: 90 })).toEqual({
      blur: 30,
      scrim: 90,
      ambient: 102
    })
  })

  it('只传色场高度时黑罩跟随色场', () => {
    expect(getCoverBlurLayout({ height: 200, blurHeight: 40 })).toEqual({
      blur: 40,
      scrim: 40,
      ambient: 64
    })
  })

  it('黑罩高于色场时 (小卡历史值偏大) 氛围层要盖过黑罩, 否则会被压住', () => {
    // 小卡: 卡高 103, 历史黑罩 64 > 色场 50% = 52
    expect(
      getCoverBlurLayout({
        height: 103,
        scrimHeight: 64,
        blurRatio: 0.5,
        ambientSpreadRatio: 0.1
      })
    ).toEqual({ blur: 52, scrim: 64, ambient: 74 })
  })

  it('任何尺寸下氛围层都不低于色场与黑罩', () => {
    const sizes = [68, 79, 98, 138, 166, 331, 494]
    sizes.forEach(height => {
      ;[undefined, 64, 96].forEach(scrimHeight => {
        const layout = getCoverBlurLayout({ height, scrimHeight })
        expect(layout.ambient).toBeGreaterThanOrEqual(Math.max(layout.blur, layout.scrim))
      })
    })
  })

  it('极小卡上氛围层可以超过卡片高度 (由外层 Squircle 裁剪, 不会溢出卡片)', () => {
    const layout = getCoverBlurLayout({ height: 68, scrimHeight: 64 })
    expect(layout.ambient).toBeGreaterThan(68)
  })

  it('比例可注入, 便于按平台/观感调参', () => {
    expect(getCoverBlurLayout({ height: 100, blurRatio: 0.5, ambientSpreadRatio: 0.1 })).toEqual({
      blur: 50,
      scrim: 50,
      ambient: 60
    })
  })
})

describe('isBlurAvailable', () => {
  it('封面与缩略图地址齐备时可用', () => {
    expect(isBlurAvailable('https://lain.bgm.tv/pic/cover/l/1.jpg', 'r/100.jpg', false)).toBe(true)
  })

  it('无封面时不可用', () => {
    expect(isBlurAvailable('', 'r/100.jpg', false)).toBe(false)
  })

  it('缩略图不是远端字符串 (本地 require 图) 时不可用', () => {
    expect(isBlurAvailable('https://lain.bgm.tv/pic/cover/l/1.jpg', 123, false)).toBe(false)
  })

  it('图片加载失败后不可用', () => {
    expect(isBlurAvailable('https://lain.bgm.tv/pic/cover/l/1.jpg', 'r/100.jpg', true)).toBe(false)
  })
})
