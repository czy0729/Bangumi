/*
 * @Author: czy0729
 * @Date: 2022-05-24 16:03:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-24 16:25:13
 */
import { Dimensions, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { IOS, PAD, PAD_LEVEL_2, RATIO } from '@constants'

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

/** 平台 1px */
export const { hairlineWidth } = StyleSheet

/** 超小 */
export const xs = isPad ? 8 : 4

/** 小 */
export const sm = isPad ? 12 : 8

/** 中 */
export const md = isPad ? 24 : 16

/** 大 */
export const lg = isPad ? 48 : 32

/** 垂直 */
export const space = isPad ? 24 : 20

/** 文字行高自动放大比例 */
export const lineHeightRatio = 1.32

// -------------------- 圆角 --------------------
/** 圆角超小 */
export const radiusXs = 4

/** 圆角小 */
export const radiusSm = 6

/** 圆角中 */
export const radiusMd = 12

/** 圆角大 */
export const radiusLg = 16

// -------------------- 元素 --------------------
/** logo 宽度 */
export const logoWidth = 124 * ratio

/** 状态栏高度 */
export const statusBarHeight = Constants.statusBarHeight

/** [待重构] 头部高度 (顶部<Tab>) */
export const appBarHeight = IOS ? Constants.statusBarHeight : 56

/** [待重构] 整个头部高度 (状态栏高度 + 头部高度) */
export const headerHeight = PAD
  ? Math.max(appBarHeight + statusBarHeight, 80)
  : appBarHeight + statusBarHeight

/** 标签页的标签栏高度 */
export const tabsHeight = 42

/** 带标签栏的头部高度 */
export const tabsHeaderHeight = headerHeight + tabsHeight

/** 底部 <bottomTab> 高度 */
export const tabBarHeight = 50 // 标签栏高度

/** [待废弃] 底部留空 */
export const bottom = tabBarHeight + lg

/** 获取 App 布局参数 */
export function getAppLayout() {
  const { width, height } = Dimensions.get('window')
  const maxWidthPadLevel1 = 586
  const maxWidthPadLevel2 = 708
  const portraitMobileWind = 16

  // portrait
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
  const wind = isPad
    ? Math.floor((window.width - window.contentWidth) / 2)
    : portraitMobileWind // 两翼

  // landscape
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
  const landscapeWind = Math.floor(
    (landscapeWindow.width - landscapeWindow.contentWidth) / 2
  )

  // landscape small
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
  const landscapeWindSm = Math.floor(
    (landscapeWindowSm.width - landscapeWindowSm.contentWidth) / 2
  )

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
