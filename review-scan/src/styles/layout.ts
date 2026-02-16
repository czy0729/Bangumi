/*
 * @Author: czy0729
 * @Date: 2022-05-24 16:03:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 10:24:33
 */
import { Dimensions, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import * as Device from 'expo-device'
import { IOS } from '@constants/constants'
import {
  PAD,
  PAD_LEVEL_1,
  PAD_LEVEL_2,
  RATIO,
  STORYBOOK_HEIGHT,
  STORYBOOK_WIDTH,
  WEB,
  WSA
} from '@constants/device'

/** iPhone 非全面屏系列 */
export const IS_IOS_5_6_7_8 =
  !!String(Device.modelName).match(/iPhone (5|6|7|8|SE)/gi) ||
  !!(String(Device.modelName).match(/iPhone/gi) && Constants.statusBarHeight <= 24) ||
  (IOS && Constants.statusBarHeight === 20)

// -------------------- 设备 --------------------
/** 是否平板 */
export const isPad = !!PAD

/** 平板放大比例 */
export const ratio = RATIO

// -------------------- 统一布局单位 --------------------
export const {
  window,
  wind,
  landscapeWindow,
  landscapeWind,
  landscapeWindowSm,
  landscapeWindSm,
  _wind
} = getAppLayout()

/** 小设备 */
export const isSmallDevice = window.height <= 600

/** 平台 1px */
export const { hairlineWidth } = StyleSheet

/** 超小 */
export const xs = isPad ? 6 : 4

/** 小 */
export const sm = isPad ? 10 : 8

/** 中 */
export const md = isPad ? 20 : 16

/** 大 */
export const lg = isPad ? 40 : 32

/** 垂直 */
export const space = isPad ? 24 : 20

/** 文字行高自动放大比例 */
export const lineHeightRatio = 1.32

// -------------------- 圆角 --------------------
/** 圆角超小 */
export const radiusXs = 6

/** 圆角小 */
export const radiusSm = 8

/** 圆角中 */
export const radiusMd = 12

/** 圆角大 */
export const radiusLg = 16

// -------------------- 元素 --------------------
/** logo 宽度 */
export const logoWidth = 124 * ratio

/** 状态栏高度 */
export const statusBarHeight = WEB || WSA ? 0 : Constants.statusBarHeight

/** [待重构] 头部高度 (顶部 Tab) */
export const appBarHeight = IOS ? statusBarHeight : 56 - (WSA ? Constants.statusBarHeight : 0)

/** 最大头部高度 */
const MAX_HEADER_HEIGHT = WEB ? 48 : 80

/**
 * 整个头部高度 (状态栏高度 + 头部高度)
 *  - iOS 8 以前的设备 statusBarHeight 获取不好, 需要手动添加一个固定高度
 *  - Pad 固定最大 80
 *  - Web 固定最大 48
 *  - 安卓没影响
 * */
export const headerHeight = Math.max(
  MAX_HEADER_HEIGHT,
  (PAD
    ? Math.max(appBarHeight + statusBarHeight, MAX_HEADER_HEIGHT)
    : appBarHeight + statusBarHeight) + (IOS ? (IS_IOS_5_6_7_8 ? 28 : 0) : 0)
)

/** 标签页的标签栏高度 */
export const tabsHeight = WEB ? 64 : 42

/** 带标签栏的头部高度 */
export const tabsHeaderHeight = headerHeight + tabsHeight

/**
 * 底部 BottomTab 高度
 *  - iOS 8 以前的设备没有底部的黑横条 bar 高度, 需要减掉
 *  - 安卓没影响
 * */
export const tabBarHeight = 50 + (IOS ? (IS_IOS_5_6_7_8 ? 4 : 20) : 6)

/** 网页版底部留空 */
export const bottomWeb = 128

/** 底部留空 */
export const bottom = WEB ? bottomWeb : tabBarHeight + lg

/** 计算 App 布局参数 */
export function getAppLayout() {
  let { width, height } = Dimensions.get('window')
  if (WEB) {
    width = STORYBOOK_WIDTH
    height = STORYBOOK_HEIGHT
  }

  // WSA 子系统因在 window 上屏幕 ratio 都为 1, 并没有高清模式，所以用最小值就可以
  // 平板设备乘以一个小于 1 的值可以让中间区域两侧一定保留一定的距离
  const maxWidthPadLevel1 = WSA ? PAD_LEVEL_1 : PAD_LEVEL_1 * 0.88
  const maxWidthPadLevel2 = WSA ? PAD_LEVEL_2 : PAD_LEVEL_2 * 0.78

  // 手机垂直窗口 (比例最高的模式) 两侧固定留 16pt
  const portraitMobileWind = 16

  // 垂直窗口
  const portraitWidth = Math.min(width, height)
  const portraitHeight = Math.max(width, height)
  const portraitMaxWidth = isPad
    ? portraitWidth >= PAD_LEVEL_2
      ? maxWidthPadLevel2
      : maxWidthPadLevel1
    : portraitWidth
  const window = {
    width: portraitWidth,
    height: portraitHeight,
    maxWidth: portraitMaxWidth,
    contentWidth: isPad
      ? Math.min(portraitWidth, portraitMaxWidth)
      : portraitMaxWidth - 2 * portraitMobileWind
  }
  const wind = isPad ? Math.floor((window.width - window.contentWidth) / 2) : portraitMobileWind // 两翼

  // 水平窗口值
  const landscapeWidth = Math.max(width, height)
  const landscapeHeight = Math.min(width, height)
  const landscapeMaxWidth = isPad
    ? landscapeWidth >= PAD_LEVEL_2
      ? maxWidthPadLevel2
      : maxWidthPadLevel1
    : landscapeHeight * 1.64
  const landscapeWindow = {
    width: landscapeWidth,
    height: landscapeHeight,
    maxWidth: landscapeMaxWidth,
    contentWidth: Math.min(landscapeWidth, landscapeMaxWidth)
  }
  const landscapeWind = Math.floor((landscapeWindow.width - landscapeWindow.contentWidth) / 2)

  // 页面收窄的水平窗口值 (用于部分使用正常水平模式依然觉得布局很长的页面)
  const landscapeMaxWidthSm = isPad
    ? landscapeWidth >= PAD_LEVEL_2
      ? maxWidthPadLevel2
      : maxWidthPadLevel1
    : landscapeHeight * 1.1
  const landscapeWindowSm = {
    width: landscapeWidth,
    height: landscapeHeight,
    maxWidth: landscapeMaxWidthSm,
    contentWidth: Math.min(landscapeWidth, landscapeMaxWidthSm)
  }
  const landscapeWindSm = Math.floor((landscapeWindowSm.width - landscapeWindowSm.contentWidth) / 2)

  return {
    /** 垂直窗口布局常用值 */
    window,

    /** 垂直窗口两翼宽度 (平板的两翼宽度会放大) */
    wind,

    /** 水平窗口布局常用值 */
    landscapeWindow,

    /** 水平窗口两翼宽度 (平板的两翼宽度会放大) */
    landscapeWind,

    /** 水平窗口 (窄) 布局常用值 */
    landscapeWindowSm,

    /** 水平窗口 (窄) 两翼宽度 */
    landscapeWindSm,

    /** 垂直窗口两翼宽度 (最小固定值) */
    _wind: portraitMobileWind
  }
}
