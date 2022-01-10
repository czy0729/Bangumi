/*
 * @Author: czy0729
 * @Date: 2019-11-30 10:30:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-10 11:43:42
 */
import { StyleSheet, InteractionManager, Appearance } from 'react-native'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { androidDayNightToggle } from '@utils/ui'
import { IOS, ORIENTATION_PORTRAIT, ORIENTATION_LANDSCAPE } from '@constants'
import _ from '@styles'
import systemStore from '../system'
import {
  memoStyles,
  NAMESPACE,
  DEFAULT_MODE,
  DEFAULT_TINYGRAIL_MODE,
  DEFAULT_TINYGRAIL_THEME_MODE,
  STYLES_LIGHT,
  STYLES_DARK,
  getMemoStylesId
} from './init'

class Theme extends store {
  constructor() {
    super()

    Object.keys(_).forEach(key => {
      if (!(key in this)) this[key] = _[key]
    })
  }

  state = observable({
    mode: DEFAULT_MODE,

    // orientation
    orientation: ORIENTATION_PORTRAIT,
    window: _.window,
    wind: _.wind,
    landscapeWindow: _.landscapeWindow,
    landscapeWind: _.landscapeWind,
    landscapeWindowSm: _.landscapeWindowSm,
    landscapeWindSm: _.landscapeWindSm,

    // font
    fontSizeAdjust: 0,

    // colors
    ...STYLES_LIGHT,

    // tinygrail
    tinygrailMode: DEFAULT_TINYGRAIL_MODE,
    tinygrailThemeMode: DEFAULT_TINYGRAIL_THEME_MODE
  })

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

  create = style => StyleSheet.create(style)

  // -------------------- layout styles --------------------
  @computed get isPad() {
    return _.isPad
  }

  @computed get orientation() {
    return this.state.orientation
  }

  @computed get isLandscape() {
    return this.orientation === ORIENTATION_LANDSCAPE
  }

  @computed get window() {
    return this.isLandscape ? this.state.landscapeWindow : this.state.window
  }

  @computed get wind() {
    return this.isLandscape ? this.state.landscapeWind : this.state.wind
  }

  @computed get isMobileLanscape() {
    return !this.isPad && this.isLandscape
  }

  @computed get windowSm() {
    return this.isMobileLanscape ? this.state.landscapeWindowSm : this.window
  }

  @computed get windSm() {
    return this.isMobileLanscape ? this.state.landscapeWindSm : this.wind
  }

  // -------------------- mode styles --------------------
  @computed get mode() {
    return this.state.mode
  }

  @computed get isDark() {
    return this.mode === 'dark'
  }

  @computed get autoColorScheme() {
    return systemStore.setting.autoColorScheme
  }

  @computed get colorMain() {
    return this.state.colorMain
  }

  @computed get colorMainLight() {
    return this.state.colorMainLight
  }

  @computed get colorPrimary() {
    return this.state.colorPrimary
  }

  @computed get colorSuccess() {
    return this.state.colorSuccess
  }

  @computed get colorYellow() {
    return this.state.colorYellow
  }

  @computed get colorWarning() {
    return this.state.colorWarning
  }

  @computed get colorPlainRaw() {
    return this.state.colorPlainRaw
  }

  @computed get colorPlain() {
    return this.state.colorPlain
  }

  @computed get __colorPlain__() {
    return _.colorPlain
  }

  @computed get __colorBg__() {
    return _.colorBg
  }

  @computed get colorWait() {
    return this.state.colorWait
  }

  @computed get colorBg() {
    return this.state.colorBg
  }

  @computed get colorBorder() {
    return this.state.colorBorder
  }

  @computed get colorTitleRaw() {
    return this.state.colorTitleRaw
  }

  @computed get colorTitle() {
    return this.state.colorTitle
  }

  @computed get colorDesc() {
    return this.state.colorDesc
  }

  @computed get colorSub() {
    return this.state.colorSub
  }

  @computed get colorDisabled() {
    return this.state.colorDisabled
  }

  @computed get colorIcon() {
    return this.state.colorIcon
  }

  @computed get colorHighLight() {
    return this.state.colorHighLight
  }

  @computed get deepDark() {
    return systemStore.setting.deepDark
  }

  @computed get _colorDarkModeLevel1() {
    return this.deepDark
      ? _._colorThemeDeepDark.colorDarkModeLevel1
      : _._colorDarkModeLevel1
  }

  @computed get _colorDarkModeLevel1Hex() {
    return this.deepDark
      ? _._colorThemeDeepDark.colorDarkModeLevel1Hex
      : _._colorDarkModeLevel1Hex
  }

  @computed get _colorDarkModeLevel2() {
    return this.deepDark
      ? _._colorThemeDeepDark.colorDarkModeLevel2
      : _._colorDarkModeLevel2
  }

  @computed get _colorPlain() {
    return this.deepDark ? _._colorThemeDeepDark.colorPlain : _._colorPlain
  }

  @computed get _colorPlainHex() {
    return this.deepDark ? _._colorThemeDeepDark.colorPlainHex : _._colorPlainHex
  }

  @computed get _colorWait() {
    return this.deepDark ? _._colorThemeDeepDark.colorWait : _._colorWait
  }

  @computed get _colorBg() {
    return this.deepDark ? _._colorThemeDeepDark.colorBg : _._colorBg
  }

  @computed get _colorDarkModeLevel1Raw() {
    return this.deepDark
      ? _._colorThemeDeepDark.colorDarkModeLevel1Raw
      : _._colorDarkModeLevel1Raw
  }

  @computed get _colorPlainRaw() {
    return this.deepDark ? _._colorThemeDeepDark.colorPlainRaw : _._colorPlainRaw
  }

  // -------------------- tinygrail --------------------
  @computed get tinygrailThemeMode() {
    return this.state.tinygrailThemeMode
  }

  @computed get isTinygrailDark() {
    return this.tinygrailThemeMode === 'dark'
  }

  @computed get isGreen() {
    return this.state.tinygrailMode === DEFAULT_TINYGRAIL_MODE
  }

  @computed get isWeb() {
    return this.state.tinygrailMode === 'web'
  }

  @computed get colorBid() {
    if (this.isWeb) return _.colorBidWeb
    if (this.isGreen) return this.isTinygrailDark ? _.colorBid : _._colorBid
    return this.isTinygrailDark ? _.colorAsk : _._colorAsk
  }

  @computed get colorDepthBid() {
    if (this.isWeb) return _.colorDepthBidWeb
    if (this.isGreen) return this.isTinygrailDark ? _.colorDepthBid : _._colorDepthBid
    return this.isTinygrailDark ? _.colorDepthAsk : _._colorDepthAsk
  }

  @computed get colorAsk() {
    if (this.isWeb) return _.colorAskWeb
    if (this.isGreen) return this.isTinygrailDark ? _.colorAsk : _._colorAsk
    return this.isTinygrailDark ? _.colorBid : _._colorBid
  }

  @computed get colorDepthAsk() {
    if (this.isWeb) return _.colorDepthAskWeb
    if (this.isGreen) return this.isTinygrailDark ? _.colorDepthAsk : _._colorDepthAsk
    return this.isTinygrailDark ? _.colorDepthBid : _._colorDepthBid
  }

  @computed get colorTinygrailPlain() {
    return this.isTinygrailDark ? _.colorTinygrailPlain : _._colorTinygrailPlain
  }

  @computed get colorTinygrailPrimary() {
    return this.isTinygrailDark ? _.colorTinygrailPrimary : _._colorTinygrailPrimary
  }

  @computed get colorTinygrailBg() {
    return this.isTinygrailDark ? _.colorTinygrailBg : _._colorTinygrailBg
  }

  @computed get colorTinygrailContainer() {
    return this.isTinygrailDark ? _.colorTinygrailContainer : _._colorTinygrailContainer
  }

  @computed get colorTinygrailContainerHex() {
    return this.isTinygrailDark
      ? _.colorTinygrailContainerHex
      : _._colorTinygrailContainerHex
  }

  @computed get colorTinygrailBorder() {
    return this.isTinygrailDark ? _.colorTinygrailBorder : _._colorTinygrailBorder
  }

  @computed get colorTinygrailIcon() {
    return this.isTinygrailDark ? _.colorTinygrailIcon : _._colorTinygrailIcon
  }

  @computed get colorTinygrailText() {
    return this.isTinygrailDark ? _.colorTinygrailText : _._colorTinygrailText
  }

  @computed get colorTinygrailActive() {
    return this.isTinygrailDark ? _.colorTinygrailActive : _._colorTinygrailActive
  }

  /**
   * User和Zone页面上方用的可变高度块的高度限制属性
   */
  @computed get parallaxImageHeight() {
    if (this.isMobileLanscape) return 200
    return Math.min(parseInt(this.window.width * 0.68), this.device(288, 380))
  }

  // -------------------- tool styles --------------------
  @computed get container() {
    return this.create({
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
        backgroundColor: this.colorPlain
      },
      _item: {
        backgroundColor: IOS
          ? this.colorPlain
          : this.select('transparent', this.colorPlain)
      },

      /**
       * 普通布局
       */
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
    })
  }

  @computed get fontSizeAdjust() {
    return this.state.fontSizeAdjust
  }

  fontSize(pt) {
    return computed(() => _.fontSize(pt, this.fontSizeAdjust)).get()
  }

  @computed get fontSize6() {
    return this.fontSize(6)
  }

  @computed get fontSize7() {
    return this.fontSize(7)
  }

  @computed get fontSize8() {
    return this.fontSize(8)
  }

  @computed get fontSize9() {
    return this.fontSize(9)
  }

  @computed get fontSize10() {
    return this.fontSize(10)
  }

  @computed get fontSize11() {
    return this.fontSize(11)
  }

  @computed get fontSize12() {
    return this.fontSize(12)
  }

  @computed get fontSize13() {
    return this.fontSize(13)
  }

  @computed get fontSize14() {
    return this.fontSize(14)
  }

  @computed get fontSize15() {
    return this.fontSize(15)
  }

  @computed get fontSize16() {
    return this.fontSize(16)
  }

  @computed get fontSize17() {
    return this.fontSize(17)
  }

  @computed get fontSize18() {
    return this.fontSize(18)
  }

  @computed get fontSize19() {
    return this.fontSize(19)
  }

  @computed get fontSize20() {
    return this.fontSize(20)
  }

  @computed get fontSize21() {
    return this.fontSize(21)
  }

  @computed get fontSize22() {
    return this.fontSize(22)
  }

  @computed get fontSize23() {
    return this.fontSize(23)
  }

  @computed get fontSize24() {
    return this.fontSize(24)
  }

  @computed get fontSize25() {
    return this.fontSize(25)
  }

  @computed get fontSize26() {
    return this.fontSize(26)
  }

  @computed get fontSize27() {
    return this.fontSize(27)
  }

  @computed get fontSize28() {
    return this.fontSize(28)
  }

  @computed get fontSize29() {
    return this.fontSize(29)
  }

  @computed get fontSize30() {
    return this.fontSize(30)
  }

  /**
   * RenderHTML 的 baseFontStyle 通用封装
   */
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

  /**
   * 已废弃
   */
  @computed get flat() {
    return true
  }

  // -------------------- page --------------------
  /**
   * 设备选择
   * 平板设备使用第二个值
   */
  device = (mobileValue, padValue) => {
    return this.isPad ? padValue : mobileValue
  }

  /**
   * 平台选择
   * 安卓平台使用第二个值
   */
  ios = (iosValue, androidValue) => (IOS ? iosValue : androidValue)

  /**
   * 主题选择
   * 黑暗模式使用第二个值
   */
  select = (lightValue, darkValue) => (this.isDark ? darkValue : lightValue)

  /**
   * 方向选择
   * 水平方向使用第二个值
   */
  portrait = (portaitValue, landscapeValue) =>
    this.isLandscape ? landscapeValue : portaitValue

  /**
   * 自适应计数
   * 只支持number, 手机垂直布局使用原始值, 横屏+1, 平板再+1
   */
  num = (num = 0) => {
    if (this.isLandscape) num += 1
    if (this.isPad) num += 1
    return num
  }

  /**
   * 手机 * 1, 平板 * ratio
   * @param {*} px
   */
  r = (px = 0) => this.ratio * px

  /**
   * 黑暗模式下
   * 非深黑模式使用第二个值
   */
  deep = (deepDarkValue, darkValue) => (this.deepDark ? deepDarkValue : darkValue)

  /**
   * 小圣杯主题选择
   * 白天模式使用第二个值
   */
  tSelect = (lightValue, darkValue) => (this.isTinygrailDark ? lightValue : darkValue)

  /**
   * 切换模式
   */
  toggleMode = mode => {
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

    this.setStorage(key, undefined, NAMESPACE)
    this.changeNavigationBarColor()
    androidDayNightToggle(this.isDark)
  }

  /**
   * 切换方向
   */
  toggleOrientation = orientation => {
    this.setState({
      orientation,
      ..._.getAppLayout()
    })
  }

  /**
   * 格子布局分拆工具函数
   */
  grid = (num = 3) => {
    const marginLeft = this.device(16, 24)
    const width = parseInt((this.window.contentWidth - (num - 1) * marginLeft) / num)
    return {
      width,
      height: width * 1.4,
      marginLeft
    }
  }

  /**
   * 切换小圣杯主题模式
   */
  toggleTinygrailThemeMode = () => {
    const key = 'tinygrailThemeMode'
    this.setState({
      [key]: this.tSelect('light', 'dark')
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 切换小圣杯涨跌颜色
   */
  toggleTinygrailMode = type => {
    const { tinygrailMode } = this.state
    const key = 'tinygrailMode'
    this.setState({
      [key]: type === 'web' ? 'web' : tinygrailMode === 'green' ? 'red' : 'green'
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 改变整体字号
   */
  changeFontSizeAdjust = (fontSizeAdjust = 0) => {
    const key = 'fontSizeAdjust'
    this.setState({
      [key]: parseInt(fontSizeAdjust)
    })
    this.setStorage(key, undefined, NAMESPACE)
  }

  /**
   * 安卓改变底部菜单颜色
   */
  changeNavigationBarColor = () => {
    if (IOS) return

    try {
      InteractionManager.runAfterInteractions(() => {
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
      console.warn('[ThemeStore] changeNavigationBarColor', error)
    }
  }

  /**
   * 小圣杯模块, 安卓改变底部菜单颜色
   */
  changeNavigationBarColorTinygrail = () => {
    if (IOS) return

    try {
      InteractionManager.runAfterInteractions(() => {
        changeNavigationBarColor(this.colorTinygrailContainerHex, !this.isTinygrailDark)
        androidDayNightToggle(this.isTinygrailDark)
      })
    } catch (error) {
      console.warn('[ThemeStore] changeNavigationBarColorTinygrail', error)
    }
  }

  /**
   * 生成记忆styles函数
   * 原理: 通过闭包使每一个组件里面的StyleSheet.create都被记忆
   * 只有全局影响样式的设置改变了, 才会重新StyleSheet.create, 配合mobx的observer触发重新渲染
   *
   *  - 支持key名为current的对象懒计算
   */
  memoStyles: memoStyles = (styles: () => {}, dev: boolean = false) => {
    const item = getMemoStylesId()
    return () => {
      if (
        !item._mode ||
        !item._styles ||
        item._mode !== this.mode ||
        item._tMode !== this.tinygrailThemeMode ||
        // item._flat !== this.flat ||
        item._deepDark !== this.deepDark ||
        item._orientation !== this.orientation
      ) {
        item._mode = this.mode
        item._tMode = this.tinygrailThemeMode
        // item._flat = this.flat
        item._deepDark = this.deepDark
        item._orientation = this.orientation

        const computedStyles = styles(this)
        if (computedStyles.current) {
          const { current, ...otherStyles } = computedStyles
          item._styles = this.create(otherStyles)
          item._styles.current = current
        } else {
          item._styles = this.create(computedStyles)
        }

        if (dev) log(item)
      }
      return item._styles
    }
  }
}

const Store = new Theme()

// setTimeout(() => {
//   if (DEV && typeof INIT_DEV_DARK === 'boolean') {
//     if ((INIT_DEV_DARK && !Store.isDark) || (!INIT_DEV_DARK && Store.isDark)) {
//       Store.toggleMode()
//       console.info('Store.toggleMode')
//     }

//     if (
//       (INIT_DEV_DARK && !Store.isTinygrailDark) ||
//       (!INIT_DEV_DARK && Store.isTinygrailDark)
//     ) {
//       Store.toggleTinygrailThemeMode()
//       console.info('Store.toggleTinygrailThemeMode')
//     }
//   }
// }, 1000)

export default Store
