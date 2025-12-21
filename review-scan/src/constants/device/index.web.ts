/*
 * @Author: czy0729
 * @Date: 2023-04-13 20:40:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-20 07:38:30
 */
import { isMobile } from '@utils/dom'

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

/** @deprecated 是否 Storybook 环境, 也就是是否 Web SPA */
export const STORYBOOK = true

/** 是否 Storybook 环境, 也就是是否 Web SPA */
export const WEB = true

const { clientWidth, clientHeight } = document.documentElement

/** 是否 Storybook iframe.html 中 */
export const STORYBOOK_IFRAME = window.self !== window.top

/** 是否需要使用边框 UI */
export const STORYBOOK_GRID = STORYBOOK_IFRAME || !isMobile()

/** Storybook 窗口宽度 */
export const STORYBOOK_WIDTH = STORYBOOK_GRID ? 480 : clientWidth

/** Storybook 窗口高度 */
export const STORYBOOK_HEIGHT = STORYBOOK_GRID ? 640 : clientHeight
