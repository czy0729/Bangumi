/*
 * @Author: czy0729
 * @Date: 2019-03-14 06:02:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-24 22:59:12
 */
import * as colors from './colors'
import * as layout from './layout'
import * as tools from './tools'
import * as utils from './utils'

export * from './layout'
export * from './colors'
export * from './utils'
export * from './tools'

export default {
  ...layout,
  ...colors,
  ...utils,
  ...tools
}

/** 暂用于方案过渡 */
export const STATUS_BAR_HEIGHT = layout.statusBarHeight

/** 暂用于方案过渡 */
export const APP_BAR_HEIGHT = layout.appBarHeight

/** 暂用于方案过渡 */
export const HEADER_HEIGHT = layout.headerHeight

/** 暂用于方案过渡 */
export const TABS_HEADER_HEIGHT = layout.tabsHeaderHeight
