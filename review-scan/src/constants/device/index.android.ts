/*
 * @Author: czy0729
 * @Date: 2021-12-25 22:07:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-14 14:35:46
 */
import { Dimensions, Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

/** 是否 WSA 子系统 */
// @ts-expect-error
export const WSA = String(Platform?.constants?.Model).toLocaleLowerCase().includes('subsystem')

/** 平板小 */
export const PAD_LEVEL_1 = WSA ? 440 : 528

/** 平板大 */
export const PAD_LEVEL_2 = WSA ? 640 : 880

const { width, height } = Dimensions.get('window')
const minSide = Math.min(width, height)
const maxSide = Math.max(width, height)
let isPad = 0

if (WSA) {
  // 子系统能随意改变窗口大小，算作平板来计算布局
  isPad = minSide >= PAD_LEVEL_2 ? 2 : 1
} else if ((maxSide <= minSide * 1.6 && minSide >= PAD_LEVEL_1) || DeviceInfo.isTablet()) {
  // 暂时认为长边 <= 短边 * 1.6, 且短边 >= PAD_LEVEL_1, 是平板
  isPad = minSide >= PAD_LEVEL_2 ? 2 : 1
}

/** 是否平板 */
export const PAD = isPad

/** @deprecated 是否 Storybook 环境, 也就是是否 Web SPA */
export const STORYBOOK = false

/** 是否 Storybook 环境, 也就是是否 Web SPA */
export const WEB = false

/** 平板放大比例 */
export const RATIO = PAD === 2 ? (WSA ? 1.44 : 1.64) : PAD === 1 ? (WSA ? 1.16 : 1.44) : 1

/** 是否 Storybook iframe.html 中 */
export const STORYBOOK_IFRAME = false

/** 是否需要使用边框 UI */
export const STORYBOOK_GRID = false

/** Storybook 窗口宽度 */
export const STORYBOOK_WIDTH = 440

/** Storybook 窗口高度 */
export const STORYBOOK_HEIGHT = 640
