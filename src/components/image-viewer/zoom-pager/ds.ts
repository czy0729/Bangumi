/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 10:00:00
 */
/** 滑动到下一页的 X 阈值 */
export const FLIP_THRESHOLD = 80

/** 甩动翻页的 X 速度阈值 */
export const VX_FLIP = 0.7

/** 当前页能滑到下一页的 X 位置最大值 */
export const MAX_OVERFLOW = 300

/** 翻页动画时间 (ms) */
export const PAGE_ANIMATE_TIME = 100

/** 内容淡入时长 (ms) */
export const FADE_DURATION = 200

/** 回到原位时长 (ms) */
export const RESET_DURATION = 150

/** 长按菜单文案 */
export const MENU_CONTEXT = {
  saveToLocal: 'save to the album',
  cancel: 'cancel'
} as const