/*
 * @Author: czy0729
 * @Date: 2023-04-23 14:20:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 10:25:42
 */
import { StyleSheet } from 'react-native'
import { computed } from 'mobx'
import { IOS, ORIENTATION_LANDSCAPE, PAD, WEB, WSA } from '@constants'
import _, { fontSize } from '@styles'
import { SelectFn, StoreConstructor } from '@types'
import systemStore from '../system'
import { DEFAULT_TINYGRAIL_MODE, STATE } from './init'
import State from './state'
import { Color, FontStyle, Mode, Orientation, TinygrailMode } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 主题选择, 黑暗模式使用第二个值 */
  select: SelectFn = (lightValue, darkValue) => (this.isDark ? darkValue : lightValue)

  /** -------------------- 设备 -------------------- */
  /** 是否平板 */
  readonly isPad = _.isPad

  /** 平板放大比例 */
  // readonly ratio = _.ratio

  /** 小设备 */
  readonly isSmallDevice = _.isSmallDevice

  /** -------------------- 统一布局单位 -------------------- */
  /** 超小 */
  readonly xs = _.xs

  /** 小 */
  readonly sm = _.sm

  /** 中 */
  readonly md = _.md

  /** 大 */
  readonly lg = _.lg

  /** 底部留空 */
  readonly bottom = _.bottom

  /** 圆角超小 */
  readonly radiusXs = _.radiusXs

  /** 圆角小 */
  readonly radiusSm = _.radiusSm

  /** 圆角中 */
  readonly radiusMd = _.radiusMd

  /** 圆角大 */
  readonly radiusLg = _.radiusLg

  /** 垂直窗口两翼宽度 (最小固定值) */
  readonly _wind = _._wind

  /** -------------------- 组件高度 -------------------- */
  /** 状态栏高度 */
  readonly statusBarHeight = _.statusBarHeight

  /** 底部 bottomTab 高度 */
  readonly tabBarHeight = _.tabBarHeight

  /** 带标签栏的头部高度 */
  readonly tabsHeaderHeight = _.tabsHeaderHeight

  /** @deprecated */
  readonly header = _.header

  /** @tofixed 头部高度 (顶部 Tab) */
  readonly appBarHeight = _.appBarHeight

  /** @tofixed 整个头部高度 (状态栏高度 + 头部高度) */
  readonly headerHeight = _.headerHeight

  /** 标签页的标签栏高度 */
  readonly tabsHeight = _.tabsHeight

  /** 文字行高自动放大比例 */
  readonly lineHeightRatio = _.lineHeightRatio

  /** -------------------- 颜色 -------------------- */
  /** 黑 */
  readonly colorDark = _.colorDark

  /** 蓝 (最浅) */
  readonly colorPrimaryLight = _.colorPrimaryLight

  /** 橙 (最浅带透明通道) */
  readonly colorWarningLight = _.colorWarningLight

  /** 绿 (最浅带透明通道) */
  readonly colorSuccessLight = _.colorSuccessLight

  /** 粉 (边框) */
  readonly colorMainBorder = _.colorMainBorder

  /** 粉 (最浅边框) */
  readonly colorMainLightBorder = _.colorMainLightBorder

  /** 蓝 (边框) */
  readonly colorPrimaryBorder = _.colorPrimaryBorder

  /** 橙 (边框) */
  readonly colorWarningBorder = _.colorWarningBorder

  /** 绿 (边框) */
  readonly colorSuccessBorder = _.colorSuccessBorder

  /** @deprecated 阴影 */
  readonly colorShadow = _.colorShadow

  /** 边框 (dark) */
  readonly _colorBorder = _._colorBorder

  /** 次要文字 (dark) */
  readonly _colorSub = _._colorSub

  /** 强制白天白色 */
  readonly __colorPlain__ = _.colorPlain

  /** 强制白天背景色 */
  readonly __colorBg__ = _.colorBg

  /** -------------------- 工具类 -------------------- */
  /** margin-top (工具类) */
  readonly mt = _.mt

  /** margin-right (工具类) */
  readonly mr = _.mr

  /** margin-bottom (工具类) */
  readonly mb = _.mb

  /** margin-left (工具类) */
  readonly ml = _.ml

  /** margin-vertical (工具类) */
  readonly mv = _.mv

  /** margin-horizontal (工具类) */
  readonly mh = _.mh

  /** 阴影 (工具类) */
  readonly shadow = _.shadow

  /** 垂直缩小 (工具类) */
  readonly short = _.short

  /** -------------------- 缩短引用 -------------------- */
  readonly absoluteFill = StyleSheet.absoluteFill
  readonly create = StyleSheet.create
  readonly flatten = StyleSheet.flatten
  readonly hairlineWidth = StyleSheet.hairlineWidth

  /** -------------------- get -------------------- */
  /**
   * WSA 子系统窗口可以随意改变, 每次改变这个值会自动 +1
   * 配合 memoStyles 会因为 hash 改变了, 从而重新生成新的 styles
   * 最终所有受到布局变动而影响到样式的组件会重新渲染
   * */
  @computed get wsaLayoutChanged() {
    return WSA ? this.state.wsaLayoutChanged : 0
  }

  /** 是否不使用字体 */
  @computed get customFontFamily() {
    return systemStore.setting.customFontFamily
  }

  /** 字体 */
  @computed get fontFamily() {
    return this.customFontFamily ? undefined : 'rhrm'
  }

  /** 字体 (粗) */
  @computed get fontBoldFamily() {
    return this.customFontFamily ? undefined : 'rhrb'
  }

  /** 字体样式 */
  @computed get fontStyle() {
    let style: FontStyle = {
      fontFamily: this.fontFamily,
      fontWeight: 'normal'
    }

    if (this.customFontFamily && IOS) {
      style = {
        fontWeight: 'normal'
      }
    }

    if (WEB) style.fontVariationSettings = '"wght" 400, "BEVL" 100'

    return style
  }

  /** 字体样式 (粗)  */
  @computed get fontBoldStyle() {
    let style: FontStyle = {
      fontFamily: this.fontBoldFamily,
      fontWeight: 'normal'
    }

    if (this.customFontFamily) {
      if (IOS) {
        style = {
          fontWeight: 'bold'
        }
      } else {
        style = {
          fontFamily: this.fontBoldFamily,
          fontWeight: 'bold'
        }
      }
    }

    if (WEB) style.fontVariationSettings = '"wght" 700, "BEVL" 100'

    return style
  }

  /** 当前设备方向 */
  @computed get orientation() {
    return this.state.orientation as Orientation
  }

  /** 水平窗口布局常用值 */
  @computed get landscapeWindow() {
    return this.state.landscapeWindow
  }

  /** 水平窗口 (窄) 布局常用值 */
  @computed get landscapeWindowSm() {
    return this.state.landscapeWindowSm
  }

  /** 水平窗口两翼宽度 (平板的两翼宽度会放大) */
  @computed get landscapeWind() {
    return this.state.landscapeWind
  }

  /** 水平窗口 (窄) 两翼宽度 */
  @computed get landscapeWindSm() {
    return this.state.landscapeWindSm
  }

  /** 主题模式 */
  @computed get mode() {
    return this.state.mode as Mode
  }

  /** 主题模式 (小圣杯) */
  @computed get tinygrailMode() {
    return this.state.tinygrailMode as TinygrailMode
  }

  /** 主题颜色 (小圣杯) */
  @computed get tinygrailThemeMode() {
    // return this.state.tinygrailThemeMode
    return this.state.mode
  }

  /** 粉 (主题色) */
  @computed get colorMain(): Color<'colorMain'> {
    return this.state.colorMain
  }

  /** 粉 (最浅) */
  @computed get colorMainLight(): Color<'colorMainLight'> {
    return this.state.colorMainLight
  }

  /** 蓝 */
  @computed get colorPrimary(): Color<'colorPrimary'> {
    return this.state.colorPrimary
  }

  /** 绿 */
  @computed get colorSuccess(): Color<'colorSuccess'> {
    return this.state.colorSuccess
  }

  /** 黄 */
  @computed get colorYellow(): Color<'colorYellow'> {
    return this.state.colorYellow
  }

  /** 橙 */
  @computed get colorWarning(): Color<'colorWarning'> {
    return this.state.colorWarning
  }

  /** 白 */
  @computed get colorPlain(): Color<'colorPlain'> {
    return this.state.colorPlain
  }

  /** 白 (RGB) */
  @computed get colorPlainRaw(): Color<'colorPlainRaw'> {
    return this.state.colorPlainRaw
  }

  /** 次要 */
  @computed get colorWait(): Color<'colorWait'> {
    return this.state.colorWait
  }

  /** 红 */
  @computed get colorDanger(): Color<'colorDanger'> {
    return this.state.colorDanger
  }

  /** @deprecated 头像旁边的文字 */
  @computed get colorAvatar(): Color<'colorAvatar'> {
    return this.state.colorAvatar
  }

  /** 背景 */
  @computed get colorBg(): Color<'colorBg'> {
    return this.state.colorBg
  }

  /** 背景 (RGB) */
  @computed get colorBgRaw(): Color<'colorBgRaw'> {
    return this.state.colorBgRaw
  }

  /** 边框 */
  @computed get colorBorder(): Color<'colorBorder'> {
    return this.state.colorBorder
  }

  /** 最深 (文字) */
  @computed get colorTitle(): Color<'colorTitle'> {
    return this.state.colorTitle
  }

  /** 最深 (文字, RGB) */
  @computed get colorTitleRaw(): Color<'colorTitleRaw'> {
    return this.state.colorTitleRaw
  }

  /** 主要 (文字) */
  @computed get colorDesc(): Color<'colorDesc'> {
    return this.state.colorDesc
  }

  /** 次要 (文字) */
  @computed get colorSub(): Color<'colorSub'> {
    return this.state.colorSub
  }

  /** 禁用 (文字) */
  @computed get colorDisabled(): Color<'colorDisabled'> {
    return this.state.colorDisabled
  }

  /** 图标 (文字) */
  @computed get colorIcon(): Color<'colorIcon'> {
    return this.state.colorIcon
  }

  /** @deprecated 高亮 */
  @computed get colorHighLight(): Color<'colorHighLight'> {
    return this.state.colorHighLight
  }

  @computed get colorDarkModeLevel1(): Color<'colorDarkModeLevel1'> {
    return this.state.colorDarkModeLevel1
  }

  @computed get colorDarkModeLevel1Raw(): Color<'colorDarkModeLevel1Raw'> {
    return this.state.colorDarkModeLevel1Raw
  }

  @computed get colorDarkModeLevel1Hex(): Color<'colorDarkModeLevel1Hex'> {
    return this.state.colorDarkModeLevel1Hex
  }

  @computed get colorDarkModeLevel2(): Color<'colorDarkModeLevel2'> {
    return this.state.colorDarkModeLevel2
  }

  @computed get colorPlainHex(): Color<'colorPlainHex'> {
    return this.state.colorPlainHex
  }

  /** 设置里动态调整的文字单位 */
  @computed get fontSizeAdjust() {
    return Number(this.state.fontSizeAdjust)
  }

  /** -------------------- computed -------------------- */
  /** 是否水平方向 */
  @computed get isLandscape() {
    return this.orientation === ORIENTATION_LANDSCAPE
  }

  /** 垂直窗口布局常用值 */
  @computed get window() {
    return this.isLandscape ? this.landscapeWindow : this.state.window
  }

  /** 垂直窗口两翼宽度 (平板的两翼宽度会放大) */
  @computed get wind() {
    return this.isLandscape ? this.landscapeWind : this.state.wind
  }

  /** 是否手机水平 */
  @computed get isMobileLanscape() {
    return !this.isPad && this.isLandscape
  }

  /** 垂直窗口 (窄) 布局常用值 */
  @computed get windowSm() {
    return this.isMobileLanscape ? this.landscapeWindowSm : this.window
  }

  /** 垂直窗口 (窄) 两翼宽度 */
  @computed get windSm() {
    return this.isMobileLanscape ? this.landscapeWindSm : this.wind
  }

  /** 是否黑暗模式 */
  @computed get isDark() {
    return this.mode === 'dark'
  }

  /** 是否黑暗模式跟随系统 */
  @computed get autoColorScheme() {
    return systemStore.setting.autoColorScheme
  }

  /** 是否纯黑 */
  @computed get deepDark() {
    return systemStore.setting.deepDark
  }

  /** 一层 (dark) */
  @computed get _colorDarkModeLevel1() {
    return this.deepDark ? _._colorThemeDeepDark.colorDarkModeLevel1 : _._colorDarkModeLevel1
  }

  /**  一层 Hex (dark) */
  @computed get _colorDarkModeLevel1Hex() {
    return this.deepDark ? _._colorThemeDeepDark.colorDarkModeLevel1Hex : _._colorDarkModeLevel1Hex
  }

  /** 二层 (dark) */
  @computed get _colorDarkModeLevel2() {
    return this.deepDark ? _._colorThemeDeepDark.colorDarkModeLevel2 : _._colorDarkModeLevel2
  }

  /** 白 (dark) */
  @computed get _colorPlain() {
    return this.deepDark ? _._colorThemeDeepDark.colorPlain : _._colorPlain
  }

  /** 白 Hex (dark) */
  @computed get _colorPlainHex() {
    return this.deepDark ? _._colorThemeDeepDark.colorPlainHex : _._colorPlainHex
  }

  /** 次要 (dark) */
  @computed get _colorWait() {
    return this.deepDark ? _._colorThemeDeepDark.colorWait : _._colorWait
  }

  /** 背景 (dark) */
  @computed get _colorBg() {
    return this.deepDark ? _._colorThemeDeepDark.colorBg : _._colorBg
  }

  /** 一层 (dark, RGB) */
  @computed get _colorDarkModeLevel1Raw() {
    return this.deepDark ? _._colorThemeDeepDark.colorDarkModeLevel1Raw : _._colorDarkModeLevel1Raw
  }

  /** 白 (dark, RGB) */
  @computed get _colorPlainRaw() {
    return this.deepDark ? _._colorThemeDeepDark.colorPlainRaw : _._colorPlainRaw
  }

  /** @deprecated 是否黑暗模式 (小圣杯) */
  @computed get isTinygrailDark() {
    return this.isDark
  }

  /** 是否主题绿色模式 (小圣杯) */
  @computed get isGreen() {
    return this.tinygrailMode === DEFAULT_TINYGRAIL_MODE
  }

  /** 是否主题网页模式 (小圣杯) */
  @computed get isWeb() {
    return this.tinygrailMode === 'web'
  }

  /** 买入 */
  @computed get colorBid() {
    if (this.isWeb) return _.colorBidWeb
    if (this.isGreen) return this.isDark ? _._colorBid : _.colorBid
    return this.isDark ? _._colorAsk : _.colorAsk
  }

  /** 买入深度 */
  @computed get colorDepthBid() {
    if (this.isWeb) return _.colorDepthBidWeb
    if (this.isGreen) return this.isDark ? _._colorDepthBid : _.colorDepthBid
    return this.isDark ? _._colorDepthAsk : _.colorDepthAsk
  }

  /** 卖出 */
  @computed get colorAsk() {
    if (this.isWeb) return _.colorAskWeb
    if (this.isGreen) return this.isDark ? _._colorAsk : _.colorAsk
    return this.isDark ? _._colorBid : _.colorBid
  }

  /** 卖出深度 */
  @computed get colorDepthAsk() {
    if (this.isWeb) return _.colorDepthAskWeb
    if (this.isGreen) return this.isDark ? _._colorDepthAsk : _.colorDepthAsk
    return this.isDark ? _._colorDepthBid : _.colorDepthBid
  }

  /** 白 (小圣杯) */
  @computed get colorTinygrailPlain() {
    return this.isDark ? _._colorTinygrailPlain : _.colorTinygrailPlain
  }

  /** 蓝 (小圣杯) */
  @computed get colorTinygrailPrimary() {
    return this.isDark ? _._colorTinygrailPrimary : _.colorTinygrailPrimary
  }

  /** 背景 (小圣杯) */
  @computed get colorTinygrailBg() {
    return this.isDark ? _._colorTinygrailBg : _.colorTinygrailBg
  }

  /** 容器 (小圣杯) */
  @computed get colorTinygrailContainer() {
    return this.isDark ? _._colorTinygrailContainer : _.colorTinygrailContainer
  }

  /** 容器 Hex (小圣杯) */
  @computed get colorTinygrailContainerHex() {
    return this.isDark ? _._colorTinygrailContainerHex : _.colorTinygrailContainerHex
  }

  /** 边框 (小圣杯) */
  @computed get colorTinygrailBorder() {
    return this.isDark ? _._colorTinygrailBorder : _.colorTinygrailBorder
  }

  /** 图标 (小圣杯) */
  @computed get colorTinygrailIcon() {
    return this.isDark ? _._colorTinygrailIcon : _.colorTinygrailIcon
  }

  /** 文字 (小圣杯) */
  @computed get colorTinygrailText() {
    return this.isDark ? _._colorTinygrailText : _.colorTinygrailText
  }

  /** 激活 (小圣杯) */
  @computed get colorTinygrailActive() {
    return this.isDark ? _._colorTinygrailActive : _.colorTinygrailActive
  }

  /** User 和 Zone 页面上方用的可变高度块的高度限制属性 */
  @computed get parallaxImageHeight() {
    if (WSA || PAD) return 336
    if (this.isMobileLanscape) return 240
    return Math.floor(this.window.contentWidth * 0.88)
  }

  /** 容器 (工具类) */
  @computed get container() {
    return StyleSheet.create({
      /** 带头部间隔布局 */
      header: {
        paddingTop: _.headerHeight
      },

      /** 带底部间隔布局 */
      bottom: {
        paddingBottom: _.bottom
      },

      /** 带头部和底部间隔布局 */
      page: {
        paddingTop: _.headerHeight,
        paddingBottom: _.bottom
      },

      /** 背景色布局 */
      bg: {
        flex: 1,
        backgroundColor: this.colorBg
      },

      /** 白色布局 */
      plain: {
        flex: 1,
        backgroundColor: this.colorPlain
      },

      /** 项布局 */
      item: {
        width: '100%',
        backgroundColor: this.colorPlain
      },

      /** 弹性布局 */
      flex: {
        flex: 1
      },

      /** 白色弹性布局 */
      content: {
        flex: 1,
        backgroundColor: this.colorPlain
      },

      /** 背景色弹性布局 */
      screen: {
        flex: 1,
        backgroundColor: this.colorBg
      },

      /** 小圣杯主题弹性布局 */
      tinygrail: {
        flex: 1,
        backgroundColor: this.colorTinygrailContainer
      },

      /** 水平居中弹性布局 */
      column: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },

      /** 垂直居中弹性布局 */
      row: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },

      /** @deprecated */
      outer: {
        paddingHorizontal: this.wind,
        paddingTop: _.space,
        paddingBottom: _.bottom
      },

      /** @deprecated */
      inner: {
        paddingVertical: _.space,
        paddingHorizontal: this.wind
      },

      /** 带两翼间隔布局 */
      wind: {
        paddingHorizontal: this.wind
      },

      /** @deprecated */
      windMtSm: {
        paddingHorizontal: this.wind,
        marginTop: _.md
      },

      /** @deprecated */
      windMtMd: {
        paddingHorizontal: this.wind,
        marginTop: _.md
      },

      /** @deprecated */
      sm: {
        padding: _.sm
      },

      /** 点击容器布局 */
      touch: {
        borderRadius: _.radiusSm,
        overflow: 'hidden'
      },

      /** @deprecated */
      left: {
        marginLeft: this.wind
      },

      /** 块布局 */
      block: {
        width: '100%'
      },

      /** @deprecated 请使用 block 代替 */
      w100: {
        width: '100%'
      },

      /** @deprecated */
      h100: {
        height: '100%'
      },

      /** @deprecated */
      layout: {
        width: '100%',
        height: 1
      }
    } as const)
  }

  /** 计算动态文字大小 */
  fontSize(pt: number) {
    return computed(() => fontSize(pt, this.fontSizeAdjust)).get()
  }

  /** 6 号字 */
  @computed get fontSize6() {
    return this.fontSize(6)
  }

  /** 7 号字 */
  @computed get fontSize7() {
    return this.fontSize(7)
  }

  /** 8 号字 */
  @computed get fontSize8() {
    return this.fontSize(8)
  }

  /** 9 号字 */
  @computed get fontSize9() {
    return this.fontSize(9)
  }

  /** 10 号字 */
  @computed get fontSize10() {
    return this.fontSize(10)
  }

  /** 11 号字 */
  @computed get fontSize11() {
    return this.fontSize(11)
  }

  /** 12 号字 */
  @computed get fontSize12() {
    return this.fontSize(12)
  }

  /** 13 号字 */
  @computed get fontSize13() {
    return this.fontSize(13)
  }

  /** 14 号字 */
  @computed get fontSize14() {
    return this.fontSize(14)
  }

  /** 15 号字 */
  @computed get fontSize15() {
    return this.fontSize(15)
  }

  /** 16 号字 */
  @computed get fontSize16() {
    return this.fontSize(16)
  }

  /** 17 号字 */
  @computed get fontSize17() {
    return this.fontSize(17)
  }

  /** 18 号字 */
  @computed get fontSize18() {
    return this.fontSize(18)
  }

  /** 19 号字 */
  @computed get fontSize19() {
    return this.fontSize(19)
  }

  /** 20 号字 */
  @computed get fontSize20() {
    return this.fontSize(20)
  }

  /** 21 号字 */
  @computed get fontSize21() {
    return this.fontSize(21)
  }

  /** 22 号字 */
  @computed get fontSize22() {
    return this.fontSize(22)
  }

  /** 23 号字 */
  @computed get fontSize23() {
    return this.fontSize(23)
  }

  /** 24 号字 */
  @computed get fontSize24() {
    return this.fontSize(24)
  }

  /** 25 号字 */
  @computed get fontSize25() {
    return this.fontSize(25)
  }

  /** 26 号字 */
  @computed get fontSize26() {
    return this.fontSize(26)
  }

  /** 27 号字 */
  @computed get fontSize27() {
    return this.fontSize(27)
  }

  /** 28 号字 */
  @computed get fontSize28() {
    return this.fontSize(28)
  }

  /** 29 号字 */
  @computed get fontSize29() {
    return this.fontSize(29)
  }

  /** 30 号字 */
  @computed get fontSize30() {
    return this.fontSize(30)
  }

  /** 31 号字 */
  @computed get fontSize31() {
    return this.fontSize(31)
  }

  /** 32 号字 */
  @computed get fontSize32() {
    return this.fontSize(32)
  }

  /** <RenderHTML> baseFontStyle 通用封装 */
  @computed get baseFontStyle() {
    return computed(() => ({
      xs: {
        fontSize: 11 + this.fontSizeAdjust,
        lineHeight: 18
      },
      sm: {
        fontSize: 12 + this.fontSizeAdjust,
        lineHeight: 20
      },
      md: {
        fontSize: 14 + this.fontSizeAdjust,
        lineHeight: 22
      }
    })).get()
  }

  /** @deprecated 是否扁平模式 */
  @computed get flat() {
    return true
  }
}
