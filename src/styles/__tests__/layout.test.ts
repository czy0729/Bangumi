/*
 * @Author: czy0729
 * @Date: 2026-08-14 17:39:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-14 17:40:18
 */
jest.mock('@constants/device', () => ({
  PAD: 0,
  PAD_LEVEL_1: 616,
  PAD_LEVEL_2: 900,
  RATIO: 1,
  STORYBOOK_HEIGHT: 812,
  STORYBOOK_WIDTH: 375,
  WEB: false,
  WSA: false
}))
jest.mock('expo-constants', () => ({ __esModule: true, default: { statusBarHeight: 44 } }))
jest.mock('@constants/constants', () => ({ IOS: true }))

import * as layout from '@styles/layout'

/**
 * 静态断言没意义 (数值会随设备/窗口变化), 这里只测不变量与派生关系:
 *  - 窗口几何必须自洽: maxWidth >= contentWidth, 两翼 wind 恰好等于差值的一半
 *  - 尺寸阶梯必须单调递增
 *  - headerHeight 由 statusBar + appBar 派生
 *  - tabsHeaderHeight / bottom 由更基础的值派生
 */
describe('layout 窗口几何', () => {
  it('垂直窗口: contentWidth 不超 maxWidth, 两翼对称', () => {
    const { window, wind } = layout
    expect(window.contentWidth).toBeLessThanOrEqual(window.maxWidth)
    expect(wind).toBe(Math.floor((window.width - window.contentWidth) / 2))
  })

  it('手机垂直窗口: 两侧各留 16pt', () => {
    expect(layout.isPad).toBe(false)
    expect(layout.wind).toBe(16)
    expect(layout.window.contentWidth).toBe(layout.window.width - 32)
  })

  it('水平窗口几何自洽', () => {
    const { landscapeWindow, landscapeWind } = layout
    expect(landscapeWindow.contentWidth).toBeLessThanOrEqual(landscapeWindow.maxWidth)
    expect(landscapeWind).toBe(
      Math.floor((landscapeWindow.width - landscapeWindow.contentWidth) / 2)
    )
  })
})

describe('layout 尺寸阶梯单调', () => {
  it('间距阶梯递增', () => {
    expect(layout.xs).toBeLessThan(layout.sm)
    expect(layout.sm).toBeLessThan(layout.md)
    expect(layout.md).toBeLessThan(layout.lg)
  })

  it('圆角阶梯递增', () => {
    expect(layout.radiusXs).toBeLessThan(layout.radiusSm)
    expect(layout.radiusSm).toBeLessThan(layout.radiusMd)
    expect(layout.radiusMd).toBeLessThan(layout.radiusLg)
  })
})

describe('layout 高度派生', () => {
  it('headerHeight 由 appBar + statusBar 派生 (含老机型加成)', () => {
    expect(layout.appBarHeight).toBe(layout.statusBarHeight)
    const oldDeviceBonus = layout.IS_IOS_5_6_7_8 ? 28 : 0
    expect(layout.headerHeight).toBe(
      Math.max(80, layout.appBarHeight + layout.statusBarHeight + oldDeviceBonus)
    )
  })

  it('tabsHeaderHeight = headerHeight + tabsHeight', () => {
    expect(layout.tabsHeaderHeight).toBe(layout.headerHeight + layout.tabsHeight)
  })

  it('bottom = tabBarHeight + lg (非 WEB)', () => {
    expect(layout.bottom).toBe(layout.tabBarHeight + layout.lg)
  })

  it('tabBarHeight = 50 + 平台留白', () => {
    const platformGap = layout.IS_IOS_5_6_7_8 ? 4 : 20
    expect(layout.tabBarHeight).toBe(50 + platformGap)
  })
})
