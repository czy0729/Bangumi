/*
 * @Author: czy0729
 * @Date: 2026-08-14 17:40:44
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-14 17:40:44
 */
import { colorBorder, colorPlain, colorShadow } from '@styles/colors'
import { bottom, lg, md, radiusMd, radiusXs, sm, space, wind, xs } from '@styles/layout'
import { border, container, mb, mh, ml, mr, mt, mv, radius, shadow, short } from '@styles/tools'

/**
 * 静态断言没意义, 这里只测「工具类必须引用统一 token, 而非硬编码数值」:
 *  - 若某工具类把 sm 直接写成 8 而不是引用 sm, 改 token 时不会同步, 此测试失败
 *  - 若 shadow 色硬编码而不是引用 colorShadow, 深色模式下阴影色不会变, 此测试失败
 */
describe('container 引用布局 token', () => {
  it('content 背景引用 colorPlain', () => {
    expect(container.content.backgroundColor).toBe(colorPlain)
  })

  it('outer 内外边距引用 wind/space/bottom', () => {
    expect(container.outer.paddingHorizontal).toBe(wind)
    expect(container.outer.paddingTop).toBe(space)
    expect(container.outer.paddingBottom).toBe(bottom)
  })

  it('touch 圆角引用 radiusMd', () => {
    expect(container.touch.borderRadius).toBe(radiusMd)
  })
})

describe('margin 工具类引用尺寸 token', () => {
  it('mt 各档引用对应 token', () => {
    expect(mt.xs.marginTop).toBe(xs)
    expect(mt.sm.marginTop).toBe(sm)
    expect(mt.md.marginTop).toBe(md)
    expect(mt.lg.marginTop).toBe(lg)
  })

  it('mt 负值档为 token 取负', () => {
    expect(mt._xs.marginTop).toBe(-xs)
    expect(mt._sm.marginTop).toBe(-sm)
    expect(mt._md.marginTop).toBe(-md)
  })

  it('四个方向各档一致', () => {
    expect(mr.xs.marginRight).toBe(xs)
    expect(mb.xs.marginBottom).toBe(xs)
    expect(ml.xs.marginLeft).toBe(xs)
    expect(mv.xs.marginVertical).toBe(xs)
    expect(mh.xs.marginHorizontal).toBe(xs)
  })
})

describe('border / radius 引用 token', () => {
  it('border 颜色引用 colorBorder', () => {
    expect(border.vh.borderColor).toBe(colorBorder)
    expect(border.top.borderTopColor).toBe(colorBorder)
  })

  it('radius 圆角引用 radius token', () => {
    expect(radius.xs.borderRadius).toBe(radiusXs)
  })
})

describe('shadow 引用颜色 token', () => {
  it('阴影色引用 colorShadow', () => {
    expect(shadow.shadowColor).toBe(colorShadow)
  })
})

describe('legacy', () => {
  it('short 负 margin 引用 sm', () => {
    expect(short.marginBottom).toBe(-sm)
  })
})
