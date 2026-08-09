/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:27:23
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-09 07:27:23
 */
/** 菜单打开/关闭动画时长 (ms) */
export const MENU_ANIMATION_DURATION = 120

/** 弹簧参数 (菜单缩放) */
export const SPRING_CONFIGURATION_MENU = {
  damping: 39,
  mass: 1.09,
  stiffness: 500,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001
}

/** 弹簧参数 (菜单与 item 位移, 两者共用保持一致) */
export const SPRING_CONFIGURATION = {
  damping: 33,
  mass: 1.03,
  stiffness: 500,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001
}

/** 按下缩放时长 (ms) */
export const HOLD_ITEM_SCALE_DOWN_DURATION = 180

/** 按下缩放比例 */
export const HOLD_ITEM_SCALE_DOWN_VALUE = 0.95

/** 菜单与锚点的间距 */
export const MENU_GAP = 8

/** 菜单与屏幕边缘的最小间距 */
export const MENU_MARGIN = 12

/** 菜单圆角 */
export const MENU_RADIUS = 12

/** 菜单宽占屏比例 */
export const MENU_WIDTH_RATIO = 0.6

/** 菜单最大宽度 */
export const MENU_MAX_WIDTH = 228

/** 菜单高度占屏比例上限 */
export const MENU_MAX_HEIGHT_RATIO = 9 / 16

/** 菜单项过多时启用滚动的数量 */
export const MENU_SCROLL_THRESHOLD = 6

/** 菜单项垂直内边距 */
export const MENU_ITEM_PADDING_VERTICAL = 10

/** 分隔线高度 */
export const MENU_SEPARATOR_HEIGHT = 8

/** 菜单文本颜色 */
export const MENU_TEXT_LIGHT_COLOR = 'rgba(0, 0, 0, 1)'
export const MENU_TEXT_DARK_COLOR = 'rgb(255, 255, 255)'

/** 菜单标题颜色 */
export const MENU_TITLE_COLOR = 'gray'

/** 破坏性操作文本颜色 */
export const MENU_TEXT_DESTRUCTIVE_LIGHT_COLOR = 'rgb(255, 59, 48)'
export const MENU_TEXT_DESTRUCTIVE_DARK_COLOR = 'rgb(255, 69, 58)'

/** 菜单边框颜色 */
export const MENU_BORDER_LIGHT_COLOR = 'rgba(0, 0, 0, 0.1)'
export const MENU_BORDER_DARK_COLOR = 'rgba(255, 255, 255, 0.1)'

/** 毛玻璃浅色背景透出 */
export const MENU_BLUR_LIGHT_BACKGROUND_COLOR = 'rgba(255, 255, 255, 0.56)'
