/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-24 13:53:21
 */

/** 还原 GitHub 深色图表配色 */
export const COLOR = {
  card: '#0d1117',
  border: '#30363d',
  bar: '#4a72f5',
  barActive: '#8ab4ff',
  grid: '#30363d',
  text: '#e6edf3',
  sub: '#8b949e',
  add: '#3fb950',
  del: '#f85149',
  miniBg: '#17233d',
  miniArea: 'rgba(74, 114, 245, 0.32)',
  miniLine: '#6f9bff',
  miniSelect: '#8ab4ff',
  handle: '#e6edf3'
} as const

/** 左侧刻度区域宽度 */
export const AXIS_WIDTH = 26

/** 右侧竖排说明宽度 */
export const SIDE_WIDTH = 14

/** 卡片内间距 */
export const CARD_WIND = 10

/** 刻度候选步长 */
export const TICK_STEPS = [5, 10, 25, 50, 100, 200, 500, 1000]

/** 刻度最多显示个数 (含 0) */
export const TICK_MAX_COUNT = 4

/** 刻度文字底部最小偏移, 0 刻度上移避免压底边线 */
export const TICK_TEXT_MIN_BOTTOM = 6

/** 年份刻度相邻最小间距 */
export const YEAR_MIN_GAP = 44

/** 柱状图上下预留, 避免最高柱子贴边 */
export const BAR_INSET = 2

/** 柱状图底部留白, 0 刻度与柱子底边抬离图表下缘 */
export const BAR_BOTTOM = 2

/** 柱子最小高度 / 最小宽度 */
export const BAR_MIN_HEIGHT = 1

export const BAR_MIN_WIDTH = 0.6

/** 柱子间最小间隙, 保证密集时有可见分割 */
export const BAR_GAP = 1

/** 触摸探查 badge 高度 */
export const BADGE_HEIGHT = 36

/** 缩略图上下留白 */
export const MINI_PADDING_TOP = 3

export const MINI_PADDING_BOTTOM = 5

/** 缩略图选择框把手宽度与内缩 */
export const MINI_HANDLE_WIDTH = 3

export const MINI_HANDLE_INSET = 5

/** 默认显示周数 (与 GitHub 图表一致, 一年) */
export const WEEKS_DEFAULT_COUNT = 52

/** 作者卡片显示周数 (约 3 个月) */
export const WEEKS_RECENT_COUNT = 13

/** 头像边长 */
export const AVATAR_SIZE = 26
