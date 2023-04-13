/*
 * @Author: czy0729
 * @Date: 2023-04-13 20:40:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 21:24:12
 */
/** 是否 WSA 子系统 */
export const WSA = false

/** 平板小 */
export const PAD_LEVEL_1 = 616

/** 平板大 */
export const PAD_LEVEL_2 = 900

/** 是否平板 */
export const PAD = 0

/** 平板放大比例 */
export const RATIO = 1

/** 是否 Storybook iframe.html 中 */
export const STORYBOOK_IFRAME = window.self !== window.top

/** Storybook 窗口宽度 */
export const STORYBOOK_WIDTH = STORYBOOK_IFRAME
  ? 440
  : document.documentElement.clientWidth

/** Storybook 窗口高度 */
export const STORYBOOK_HEIGHT = STORYBOOK_IFRAME
  ? 640
  : document.documentElement.clientHeight
