/*
 * @Author: czy0729
 * @Date: 2022-05-24 16:25:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-27 05:23:17
 */
import { ColorRaw } from './types'

const regColor = /\d+/g

/** 粉 (主题色) */
export const colorMain = 'rgb(254, 138, 149)'

/** 粉 (边框) */
export const colorMainBorder = 'rgb(252, 128, 138)'

/** 蓝 */
export const colorPrimary = 'rgb(13, 183, 243)'

/** 蓝 (边框) */
export const colorPrimaryBorder = 'rgb(159, 230, 254)'

/** 蓝 (最浅) */
export const colorPrimaryLight = 'rgb(237, 250, 254)'

/** 绿 */
export const colorSuccess = 'rgb(50, 200, 64)'

/** 绿 (边框) */
export const colorSuccessBorder = 'rgb(115, 241, 115)'

/** 橙 */
export const colorWarning = 'rgb(254, 190, 88)'

/** 橙 (边框) */
export const colorWarningBorder = 'rgb(254, 190, 88)'

/** 红 */
export const colorDanger = 'rgb(232, 8, 13)'

/** 白 */
export const colorPlain = 'rgb(255, 255, 255)'

/** 底 */
export const colorPlaceholder = 'rgb(250, 250, 250)'

/** 黑 */
export const colorDark = 'rgb(0, 0, 0)'

/** [待废弃] 高亮 */
export const colorHighLight = 'rgba(0, 0, 0, 0.1)'

/** [待废弃] 阴影 */
export const colorShadow = 'rgb(0, 0, 0)'

/** [待废弃] 遮罩 */
export const colorMask = 'rgba(0, 0, 0, 0.5)'

/** 白 (Hex) */
export const colorPlainHex = '#ffffff'

/** 黄 */
export const colorYellow = 'rgb(255, 202, 40)'

/** 次要 */
export const colorWait = 'rgb(200, 200, 200)'

/** 背景 */
export const colorBg = 'rgb(238, 238, 240)'

/** 边框 */
export const colorBorder = 'rgb(228, 228, 236)'

/** 最深 (文字) */
export const colorTitle = 'rgb(0, 0, 0)'

/** 主要 (文字) */
export const colorDesc = 'rgb(12, 12, 12)'

/** 次要 (文字) */
export const colorSub = 'rgb(128, 128, 128)'

/** 禁用 (文字) */
export const colorDisabled = 'rgb(150, 150, 150)'

/** 图标 (文字) */
export const colorIcon = 'rgb(200, 200, 200)'

export const colorMainRaw = colorMain.match(regColor) as ColorRaw<typeof colorMain>

export const colorPrimaryRaw = colorPrimary.match(regColor) as ColorRaw<typeof colorPrimary>

export const colorSuccessRaw = colorSuccess.match(regColor) as ColorRaw<typeof colorSuccess>

export const colorWarningRaw = colorWarning.match(regColor) as ColorRaw<typeof colorWarning>

export const colorPlainRaw = colorPlain.match(regColor) as ColorRaw<typeof colorPlain>

export const colorTitleRaw = colorTitle.match(regColor) as ColorRaw<typeof colorTitle>

export const colorBgRaw = colorBg.match(regColor) as ColorRaw<typeof colorBg>

/** 粉 (最浅) */
export const colorMainLight = 'rgb(255, 244, 244)'

/** 粉 (最浅边框) */
export const colorMainLightBorder = 'rgb(255, 208, 214)'

/** 绿 (最浅带透明通道) */
export const colorSuccessLight = `rgba(${colorSuccessRaw.join()}, 0.1)`

/** 橙 (最浅带透明通道) */
export const colorWarningLight = `rgba(${colorWarningRaw.join()}, 0.1)`

// -------------------- dark --------------------
// 参考了架高层的概念, 详 https://www.zcool.com.cn/article/ZMTAwMzI4OA==.html

/** 一层 (dark) */
export const _colorDarkModeLevel1 = 'rgb(52, 52, 52)'

/**  一层 Hex (dark) */
export const _colorDarkModeLevel1Hex = '#343434'

/** 二层 (dark) */
export const _colorDarkModeLevel2 = 'rgb(64, 64, 64)'

/** 粉 (dark) */
export const _colorMain = 'rgb(254, 138, 149)'

/** 浅粉 (dark) */
export const _colorMainLight = 'rgb(59, 48 ,51)'

/** 蓝 (dark) */
export const _colorPrimary = 'rgb(35, 149, 233)'

/** 绿 (dark) */
export const _colorSuccess = 'rgb(50, 209, 96)'

/** 黄 (dark) */
export const _colorYellow = 'rgb(255, 214, 50)'

/** 橙 (dark) */
export const _colorWarning = 'rgb(255, 160, 12)'

/** 白 (dark) */
export const _colorPlain = 'rgb(36, 36, 36)'

/** 白 Hex (dark) */
export const _colorPlainHex = '#242424'

/** 次要 (dark) */
export const _colorWait = 'rgb(78, 78, 80)'

/** 背景 (dark) */
export const _colorBg = 'rgb(24, 24, 24)'

/** 边框 (dark) */
export const _colorBorder = 'rgba(255, 255, 255, 0.16)'

/** 高亮 (dark) */
export const _colorHighLight = 'rgba(255, 255, 255, 0.1)'

// 文字
/** 最深文字 (dark) */
export const _colorTitle = 'rgba(255, 255, 255, 0.92)'

/** 主要文字 (dark) */
export const _colorDesc = 'rgba(255, 255, 255, 0.8)'

/** 次要文字 (dark) */
export const _colorSub = 'rgba(255, 255, 255, 0.52)'

/** 禁用文字 (dark) */
export const _colorDisabled = 'rgba(255, 255, 255, 0.38)'

/** 图标文字 (dark) */
export const _colorIcon = 'rgba(255, 255, 255, 0.38)'

export const _colorDarkModeLevel1Raw = _colorDarkModeLevel1.match(regColor) as ColorRaw<
  typeof _colorDarkModeLevel1
>

export const _colorPlainRaw = _colorPlain.match(regColor) as ColorRaw<typeof _colorPlain>

export const _colorTitleRaw = [255, 255, 255] as const

export const _colorBgRaw = _colorBg.match(regColor) as ColorRaw<typeof _colorBg>

const __colorDarkModeLevel1 = 'rgb(32, 32, 32)'
const __colorPlain = 'rgb(0, 0, 0)'

/** 深黑模式复写黑暗模式的值 */
export const _colorThemeDeepDark = {
  colorDarkModeLevel1: __colorDarkModeLevel1,
  colorDarkModeLevel1Raw: __colorDarkModeLevel1.match(regColor) as ColorRaw<
    typeof __colorDarkModeLevel1
  >,
  colorDarkModeLevel1Hex: '#202020',
  colorDarkModeLevel2: 'rgb(48, 48, 48)',
  colorPlain: __colorPlain,
  colorPlainRaw: __colorPlain.match(regColor) as ColorRaw<typeof __colorPlain>,
  colorPlainHex: '#000000',
  colorWait: 'rgb(64, 64, 64)',
  colorBg: 'rgb(24, 24, 24)'
} as const

/** [待废弃] 头像旁边的文字 */
export const colorAvatar = 'rgb(116, 116, 116)'

/** [待废弃] */
export const colorIconPlain = `rgba(${colorPlainRaw.join()}, 0.88)`

// -------------------- 小圣杯 --------------------
/** 买入 */
export const colorBid = 'rgb(1, 173, 145)'

/** 买入深度 */
export const colorDepthBid = 'rgb(226, 241, 238)'

/** 卖出 */
export const colorAsk = 'rgb(206, 97, 117)'

/** 卖出深度 */
export const colorDepthAsk = 'rgb(243, 233, 234)'

/** 白 (小圣杯) */
export const colorTinygrailPlain = 'rgb(39, 43, 48)'

/** 蓝 (小圣杯) */
export const colorTinygrailPrimary = 'rgb(42, 114, 241)'

/** 背景 (小圣杯) */
export const colorTinygrailBg = 'rgb(240, 241, 243)'

/** 容器 (小圣杯) */
export const colorTinygrailContainer = 'rgb(255, 255, 255)'

/** 容器 Hex (小圣杯) */
export const colorTinygrailContainerHex = '#ffffff'

/** 边框 (小圣杯) */
export const colorTinygrailBorder = colorBorder

/** 图标 (小圣杯) */
export const colorTinygrailIcon = 'rgb(172, 182, 188)'

/** 文字 (小圣杯) */
export const colorTinygrailText = 'rgb(128, 128, 128)'

/** 激活 (小圣杯) */
export const colorTinygrailActive = 'rgb(247, 242, 232)'

/** 买入 (dark) */
export const _colorBid = 'rgb(0, 173, 146)'

/** 买入深度 (dark) */
export const _colorDepthBid = 'rgb(15, 61, 67)'

/** 卖出 (dark) */
export const _colorAsk = 'rgb(209, 77, 100)'

/** 卖出深度 (dark) */
export const _colorDepthAsk = 'rgb(39, 36, 52)'

/** 白 (dark) */
export const _colorTinygrailPlain = 'rgba(255, 255, 255, 0.8)'

/** 蓝 (dark) */
export const _colorTinygrailPrimary = 'rgb(9, 153, 223)'

/** 背景 (dark) */
export const _colorTinygrailBg = 'rgb(14, 25, 36)'

/** 容器 (dark) */
export const _colorTinygrailContainer = 'rgb(20, 30, 50)'

/** 容器 Hex (dark) */
export const _colorTinygrailContainerHex = '#141e32'

/** 边框 (dark) */
export const _colorTinygrailBorder = 'rgb(29, 42, 61)'

/** 图标 (dark) */
export const _colorTinygrailIcon = 'rgb(62, 84, 108)'

/** 文字 (dark) */
export const _colorTinygrailText = 'rgb(99, 117, 144)'

/** 激活 (dark) */
export const _colorTinygrailActive = 'rgb(39, 40, 46)'

/** [未使用] 买入 (web) */
export const colorBidWeb = 'rgb(228, 111, 161)'

/** [未使用] 买入深度 (web) */
export const colorDepthBidWeb = 'rgb(255, 208, 227)'

/** [未使用] 卖出 (web) */
export const colorAskWeb = 'rgb(34, 163, 222)'

/** [未使用] 卖出深度 (web) */
export const colorDepthAskWeb = 'rgb(183, 232, 254)'
