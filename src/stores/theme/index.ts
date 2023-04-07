/*
 * 样式
 * @Author: czy0729
 * @Date: 2019-11-30 10:30:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-06 11:18:18
 */
import { StyleSheet, Appearance } from 'react-native'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { observable, computed } from 'mobx'
import { androidDayNightToggle, runAfter } from '@utils'
import store from '@utils/store'
import { IOS, ORIENTATION_LANDSCAPE, WSA, PAD } from '@constants'
import _, { fontSize, IS_IOS_5_6_7_8 } from '@styles'
import { AnyObject, SelectFn, SettingFontsizeadjust, StoreConstructor } from '@types'
import systemStore from '../system'
import {
  NAMESPACE,
  DEFAULT_MODE,
  DEFAULT_TINYGRAIL_MODE,
  STYLES_LIGHT,
  STYLES_DARK,
  STATE,
  LOADED
} from './init'
import { getMemoStyles, getMemoStylesHash } from './utils'
import { Color, Mode, Orientation, TinygrailMode } from './types'

type CacheKey = keyof typeof LOADED

class ThemeStore extends store implements StoreConstructor<typeof STATE> {
  constructor() {
    super()

    /** @deprecated 让 _ 上的所有属性都能通过 ThemeStore 访问到 */
    Object.keys(_).forEach(key => {
      if (!(key in this)) this[key] = _[key]
    })
  }

  /** -------------------- store -------------------- */
  state = observable(STATE)

  private _loaded = LOADED

  init = async () => {
    // 遗漏问题, 版本前有部分用户安卓9启用了跟随系统设置, 需要排除掉
    if (this.autoColorScheme) {
      this.toggleMode(Appearance.getColorScheme())
    } else {
      const mode = await this.getStorage('mode', NAMESPACE, DEFAULT_MODE)
      this.toggleMode(mode)
    }

    this.setState({
      tinygrailMode: await this.getStorage(
        'tinygrailMode',
        NAMESPACE,
        DEFAULT_TINYGRAIL_MODE
      ),
      tinygrailThemeMode: await this.getStorage(
        'tinygrailThemeMode',
        NAMESPACE,
        DEFAULT_TINYGRAIL_MODE
      ),
      fontSizeAdjust: await this.getStorage('fontSizeAdjust', NAMESPACE, 0)
    })

    return true
  }

  save = (key: CacheKey) => {
    return this.setStorage(key, undefined, NAMESPACE)
  }

  /** -------------------- 设备 -------------------- */
  /** 是否平板 */
  readonly isPad = _.isPad

  /** 平板放大比例 */
  // readonly ratio = _.ratio

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

  /** 底部 <bottomTab> 高度 */
  readonly tabBarHeight = _.tabBarHeight

  /** 带标签栏的头部高度 */
  readonly tabsHeaderHeight = _.tabsHeaderHeight

  /** @deprecated */
  readonly header = _.header

  /** @tofixed 头部高度 (顶部<Tab>) */
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

  /** 阴影 (工具类) */
  readonly shadow = _.shadow

  /** @deprecated 垂直缩小 (工具类) */
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
    if (!WSA) return 0
    return this.state.wsaLayoutChanged
  }

  /** 是否不使用字体 */
  @computed get customFontFamily() {
    return systemStore.setting.customFontFamily
  }

  /** 字体 */
  @computed get fontFamily() {
    if (this.customFontFamily) return
    return 'rhrm'
  }

  /** 字体 (粗) */
  @computed get fontBoldFamily() {
    if (this.customFontFamily) return
    return 'rhrb'
  }

  /** 字体样式 */
  @computed get fontStyle() {
    if (this.customFontFamily) {
      if (IOS) {
        return {
          fontWeight: 'normal'
        } as const
      }

      return {
        fontFamily: this.fontFamily,
        fontWeight: 'normal'
      } as const
    }

    return {
      fontFamily: this.fontFamily,
      fontWeight: 'normal'
    } as const
  }

  /** 字体样式 (粗)  */
  @computed get fontBoldStyle() {
    if (this.customFontFamily) {
      if (IOS) {
        return {
          fontWeight: 'bold'
        } as const
      }

      return {
        fontFamily: this.fontBoldFamily,
        fontWeight: 'bold'
      } as const
    }

    return {
      fontFamily: this.fontBoldFamily,
      fontWeight: 'normal'
    } as const
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
    return this.state.tinygrailThemeMode
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
    return this.deepDark
      ? _._colorThemeDeepDark.colorDarkModeLevel1
      : _._colorDarkModeLevel1
  }

  /**  一层 Hex (dark) */
  @computed get _colorDarkModeLevel1Hex() {
    return this.deepDark
      ? _._colorThemeDeepDark.colorDarkModeLevel1Hex
      : _._colorDarkModeLevel1Hex
  }

  /** 二层 (dark) */
  @computed get _colorDarkModeLevel2() {
    return this.deepDark
      ? _._colorThemeDeepDark.colorDarkModeLevel2
      : _._colorDarkModeLevel2
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
    return this.deepDark
      ? _._colorThemeDeepDark.colorDarkModeLevel1Raw
      : _._colorDarkModeLevel1Raw
  }

  /** 白 (dark, RGB) */
  @computed get _colorPlainRaw() {
    return this.deepDark ? _._colorThemeDeepDark.colorPlainRaw : _._colorPlainRaw
  }

  /** 是否黑暗模式 (小圣杯) */
  @computed get isTinygrailDark() {
    return this.tinygrailThemeMode === 'dark'
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
    if (this.isGreen) return this.isTinygrailDark ? _.colorBid : _._colorBid
    return this.isTinygrailDark ? _.colorAsk : _._colorAsk
  }

  /** 买入深度 */
  @computed get colorDepthBid() {
    if (this.isWeb) return _.colorDepthBidWeb
    if (this.isGreen) return this.isTinygrailDark ? _.colorDepthBid : _._colorDepthBid
    return this.isTinygrailDark ? _.colorDepthAsk : _._colorDepthAsk
  }

  /** 卖出 */
  @computed get colorAsk() {
    if (this.isWeb) return _.colorAskWeb
    if (this.isGreen) return this.isTinygrailDark ? _.colorAsk : _._colorAsk
    return this.isTinygrailDark ? _.colorBid : _._colorBid
  }

  /** 卖出深度 */
  @computed get colorDepthAsk() {
    if (this.isWeb) return _.colorDepthAskWeb
    if (this.isGreen) return this.isTinygrailDark ? _.colorDepthAsk : _._colorDepthAsk
    return this.isTinygrailDark ? _.colorDepthBid : _._colorDepthBid
  }

  /** 白 (小圣杯) */
  @computed get colorTinygrailPlain() {
    return this.isTinygrailDark ? _.colorTinygrailPlain : _._colorTinygrailPlain
  }

  /** 蓝 (小圣杯) */
  @computed get colorTinygrailPrimary() {
    return this.isTinygrailDark ? _.colorTinygrailPrimary : _._colorTinygrailPrimary
  }

  /** 背景 (小圣杯) */
  @computed get colorTinygrailBg() {
    return this.isTinygrailDark ? _.colorTinygrailBg : _._colorTinygrailBg
  }

  /** 容器 (小圣杯) */
  @computed get colorTinygrailContainer() {
    return this.isTinygrailDark ? _.colorTinygrailContainer : _._colorTinygrailContainer
  }

  /** 容器 Hex (小圣杯) */
  @computed get colorTinygrailContainerHex() {
    return this.isTinygrailDark
      ? _.colorTinygrailContainerHex
      : _._colorTinygrailContainerHex
  }

  /** 边框 (小圣杯) */
  @computed get colorTinygrailBorder() {
    return this.isTinygrailDark ? _.colorTinygrailBorder : _._colorTinygrailBorder
  }

  /** 图标 (小圣杯) */
  @computed get colorTinygrailIcon() {
    return this.isTinygrailDark ? _.colorTinygrailIcon : _._colorTinygrailIcon
  }

  /** 文字 (小圣杯) */
  @computed get colorTinygrailText() {
    return this.isTinygrailDark ? _.colorTinygrailText : _._colorTinygrailText
  }

  /** 激活 (小圣杯) */
  @computed get colorTinygrailActive() {
    return this.isTinygrailDark ? _.colorTinygrailActive : _._colorTinygrailActive
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
      /**
       * 特殊布局, background与item应配合使用
       * 安卓为了防止过渡绘制, 全局底色为白色, 所以Item为白色时可以使用透明
       * iOS因为有弹簧, 所以不设置成灰色时, 列表下拉会很奇怪, Item相应也要设置成白色
       *
       * iOS: 灰
       * android: 透明
       */
      bg: {
        flex: 1,
        backgroundColor: this.colorBg
      },
      _bg: {
        flex: 1,
        backgroundColor: IOS ? this.colorBg : this.select('transparent', this._colorBg)
      },
      plain: {
        flex: 1,
        backgroundColor: this.colorPlain
      },
      _plain: {
        flex: 1,
        backgroundColor: IOS
          ? this.colorPlain
          : this.select('transparent', this._colorPlain)
      },
      item: {
        width: '100%',
        backgroundColor: this.colorPlain
      },
      _item: {
        backgroundColor: IOS
          ? this.colorPlain
          : this.select('transparent', this.colorPlain)
      },

      /** 普通布局 */
      flex: {
        flex: 1
      },
      content: {
        flex: 1,
        backgroundColor: this.colorPlain
      },
      screen: {
        flex: 1,
        backgroundColor: this.colorBg
      },
      tinygrail: {
        flex: 1,
        backgroundColor: this.colorTinygrailContainer
      },
      column: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      row: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      },
      outer: {
        paddingHorizontal: this.wind,
        paddingTop: _.space,
        paddingBottom: _.bottom
      },
      inner: {
        paddingVertical: _.space,
        paddingHorizontal: this.wind
      },
      wind: {
        paddingHorizontal: this.wind
      },
      windMtSm: {
        paddingHorizontal: this.wind,
        marginTop: _.sm
      },
      windMtMd: {
        paddingHorizontal: this.wind,
        marginTop: _.md
      },
      bottom: {
        paddingBottom: _.bottom
      },
      sm: {
        padding: _.sm
      },
      touch: {
        borderRadius: _.radiusSm,
        overflow: 'hidden'
      },
      left: {
        marginLeft: this.wind
      },
      block: {
        width: '100%'
      },
      w100: {
        width: '100%'
      },
      h100: {
        height: '100%'
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

  /** <RenderHTML> baseFontStyle 通用封装 */
  @computed get baseFontStyle() {
    return computed(() => ({
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

  // -------------------- page --------------------
  /** 设备选择, 平板设备使用第二个值 */
  device: SelectFn = (mobileValue, padValue) => (this.isPad ? padValue : mobileValue)

  /** 平台选择, 安卓平台使用第二个值 */
  ios: SelectFn = (iosValue, androidValue) => (IOS ? iosValue : androidValue)

  /** 主题选择, 黑暗模式使用第二个值 */
  select: SelectFn = (lightValue, darkValue) => (this.isDark ? darkValue : lightValue)

  /** 目前支持的所有平台选择 */
  platforms = (ios: any, ios_5678: any, android: any, wsa: any) => {
    if (IOS) {
      if (IS_IOS_5_6_7_8) return ios_5678
      return ios
    } else if (WSA) {
      return wsa
    }
    return android
  }

  /** 方向选择, 水平方向使用第二个值 */
  portrait: SelectFn = (portaitValue, landscapeValue) =>
    this.isLandscape ? landscapeValue : portaitValue

  /** 自适应计数, 只支持 number, 手机垂直布局使用原始值, 横屏 +1, 平板再 +1 */
  num = (num = 0) => {
    if (this.isLandscape) num += 1
    if (this.isPad) num += 1
    return num
  }

  /** 手机 * 1, 平板 * ratio */
  r = (px: number = 0) => {
    // @ts-expect-error
    return this.ratio * px
  }

  /** 黑暗模式下, 深黑使用第一个值, 非深黑模式使用第二个值 */
  deep: SelectFn = (deepDarkValue, darkValue) =>
    this.deepDark ? deepDarkValue : darkValue

  /** 小圣杯主题选择, 白天模式使用第二个值 */
  tSelect: SelectFn = (lightValue, darkValue) =>
    this.isTinygrailDark ? lightValue : darkValue

  /** 切换主题模式 */
  toggleMode = (mode?: Mode) => {
    const key = 'mode'
    if (mode === 'light') {
      this.setState({
        [key]: 'light',
        ...STYLES_LIGHT
      })
    } else if (mode === 'dark') {
      this.setState(
        this.deepDark
          ? {
              [key]: 'dark',
              ...STYLES_DARK,
              ..._._colorThemeDeepDark
            }
          : {
              [key]: 'dark',
              ...STYLES_DARK
            }
      )
    } else {
      this.setState({
        [key]: this.select('dark', 'light'),
        ...this.select(
          this.deepDark
            ? {
                ...STYLES_DARK,
                ..._._colorThemeDeepDark
              }
            : STYLES_DARK,
          STYLES_LIGHT
        )
      })
    }

    this.save(key)
    this.changeNavigationBarColor()
    androidDayNightToggle(this.isDark)
  }

  /** 切换方向 */
  toggleOrientation = (orientation: Orientation) => {
    this.setState({
      orientation,
      ..._.getAppLayout()
    })
  }

  /** 主动更新 window layout */
  updateLayout() {
    const state: AnyObject = {
      ..._.getAppLayout()
    }
    if (WSA) state.wsaLayoutChanged = this.wsaLayoutChanged + 1
    this.setState(state)
  }

  /** 格子布局分拆工具函数 */
  grid = (num: number = 3) => {
    const marginLeft = this.device(14, 24)
    const width = Math.floor((this.window.contentWidth - (num - 1) * marginLeft) / num)
    return {
      width,
      height: width * 1.4,
      marginLeft
    }
  }

  /** 切换小圣杯主题模式 */
  toggleTinygrailThemeMode = () => {
    const key = 'tinygrailThemeMode'
    this.setState({
      [key]: this.tSelect('light', 'dark')
    })
    this.save(key)
  }

  /** 切换小圣杯涨跌颜色 */
  toggleTinygrailMode = (type?: TinygrailMode) => {
    const { tinygrailMode } = this.state
    const key = 'tinygrailMode'
    this.setState({
      [key]: type === 'web' ? 'web' : tinygrailMode === 'green' ? 'red' : 'green'
    })
    this.save(key)
  }

  /** 改变整体字号 */
  changeFontSizeAdjust = (fontSizeAdjust: SettingFontsizeadjust = '0') => {
    const key = 'fontSizeAdjust'
    this.setState({
      [key]: Number(fontSizeAdjust)
    })
    this.save(key)
  }

  /** 安卓改变底部菜单颜色 */
  changeNavigationBarColor = () => {
    if (IOS) return

    try {
      runAfter(() => {
        // @ts-expect-error
        changeNavigationBarColor(
          this.select(
            _.colorPlainHex,
            this.deepDark
              ? _._colorThemeDeepDark.colorPlainHex
              : _._colorDarkModeLevel1Hex
          ),
          !this.isDark
        )
        androidDayNightToggle(this.isDark)
      })
    } catch (error) {
      console.error('[ThemeStore] changeNavigationBarColor', error)
    }
  }

  /** 小圣杯模块, 安卓改变底部菜单颜色 */
  changeNavigationBarColorTinygrail = () => {
    if (IOS) return

    try {
      runAfter(() => {
        // @ts-expect-error
        changeNavigationBarColor(this.colorTinygrailContainerHex, !this.isTinygrailDark)
        androidDayNightToggle(this.isTinygrailDark)
      })
    } catch (error) {
      console.error('[ThemeStore] changeNavigationBarColorTinygrail', error)
    }
  }

  /**
   * 生成 APP 内能动态切换主题的, 记忆 styles 的核心函数
   *  - 所有需要动态切换的样式都应通过此函数包裹样式后导出到组件里面使用
   *  - @deprecated 支持 key 名为 current (指 useRef) 的对象懒计算
   */
  memoStyles = <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
    styles: (currentThemeStore?: any) => T,
    dev: boolean = false
  ): (() => T) => {
    const item = getMemoStyles()
    return () => {
      /**
       * 通过闭包使每一个组件里面的 StyleSheet.create 都被缓存
       * 当会影响到全局样式的设置 (mode | tMode | deepDark | orientation | customFontFamily) 改变了
       * 会重新调用 StyleSheet.create, 配合 mobx -> observer 触发重新渲染
       * */
      const hash = getMemoStylesHash([
        this.mode,
        this.tinygrailThemeMode,
        this.deepDark,
        this.orientation,
        this.customFontFamily,
        this.wsaLayoutChanged
      ])
      if (!item._styles || !item._hash || item._hash !== hash) {
        item._hash = hash

        const computedStyles: any = styles(this)

        /** @deprecated current 逻辑复杂用不上, 请勿再使用此特性 */
        if (computedStyles.current) {
          const { current, ...otherStyles } = computedStyles
          item._styles = StyleSheet.create(otherStyles)
          item._styles.current = current
        } else {
          item._styles = StyleSheet.create(computedStyles)
        }

        if (dev) console.info(item)
      }

      return item._styles as T
    }
  }
}

const themeStore = new ThemeStore()

export type ThemeStoreType = typeof themeStore

export default themeStore
