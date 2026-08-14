/*
 * @Author: czy0729
 * @Date: 2026-08-14 17:39:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-14 17:40:53
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

import * as colors from '@styles/colors'
import * as layout from '@styles/layout'
import * as tools from '@styles/tools'
import * as utils from '@styles/utils'
import _, { APP_BAR_HEIGHT, HEADER_HEIGHT, STATUS_BAR_HEIGHT, TABS_HEADER_HEIGHT } from '../index'

/**
 * theme store 通过 Object.keys(_) 把所有样式键复制进 store, 缺任何一个键都会静默丢值。
 * 这里保证默认导出 _ 覆盖四个模块的全部命名导出, 以及过渡别名与 layout 保持同步。
 */
describe('styles 默认导出完整性', () => {
  const modules = { layout, colors, tools, utils }

  it('默认导出 _ 覆盖全部命名导出', () => {
    for (const [, mod] of Object.entries(modules)) {
      for (const key of Object.keys(mod)) {
        expect(key in _).toBe(true)
      }
    }
  })

  it('过渡别名与 layout 保持同步', () => {
    expect(STATUS_BAR_HEIGHT).toBe(layout.statusBarHeight)
    expect(APP_BAR_HEIGHT).toBe(layout.appBarHeight)
    expect(HEADER_HEIGHT).toBe(layout.headerHeight)
    expect(TABS_HEADER_HEIGHT).toBe(layout.tabsHeaderHeight)
  })
})
