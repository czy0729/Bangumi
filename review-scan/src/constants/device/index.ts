/*
 * @Author: czy0729
 * @Date: 2021-12-25 22:07:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 12:00:47
 */
import { Dimensions, Platform } from 'react-native'

/** 是否 WSA 子系统 */
export const WSA = false

/** 平板小 */
export const PAD_LEVEL_1 = 616

/** 平板大 */
export const PAD_LEVEL_2 = 900

const { width, height } = Dimensions.get('window')
const minSide = Math.min(width, height)
const maxSide = Math.max(width, height)
let isPad = 0

// 暂时认为长边 <= 短边 * 1.6, 且短边 >= PAD_LEVEL_1, 是平板
if (
  (maxSide <= minSide * 1.6 && minSide >= PAD_LEVEL_1) ||
  // @ts-expect-error
  Platform.isPad
) {
  isPad = minSide >= PAD_LEVEL_2 ? 2 : 1
}

/** 是否平板 */
export const PAD = process.env.STORYBOOK === 'true' ? 0 : isPad

/** @deprecated 使用 WEB 替代 */
export const STORYBOOK = false

/** 是否 Storybook 环境, 也就是是否 Web SPA */
export const WEB = false

/** 平板放大比例 */
export const RATIO = PAD === 2 ? 1.44 : PAD === 1 ? 1.28 : 1

/** 是否 Storybook iframe.html 中 */
export const STORYBOOK_IFRAME = false

/** 是否需要使用边框 UI */
export const STORYBOOK_GRID = false

/** Storybook 窗口宽度 */
export const STORYBOOK_WIDTH = 440

/** Storybook 窗口高度 */
export const STORYBOOK_HEIGHT = 640
