/*
 * @Author: czy0729
 * @Date: 2019-11-30 10:30:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-29 15:02:03
 */
import { StyleSheet, InteractionManager, Appearance } from 'react-native'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { DEV, IOS, IS_BEFORE_ANDROID_10 } from '@constants'
import _ from '@styles'
import { initialDevDark } from '@/config'
import systemStore from '../system'

const NAMESPACE = 'Theme'
const DEFAULT_MODE = 'light'
const DEFAULT_TINYGRAIL_MODE = 'green' // green: 绿涨红跌 | red: 红涨绿跌 | web: 网页一致
const DEFAULT_TINYGRAIL_THEME_MODE = 'dark'
const lightStyles = {
  // theme
  colorMain: _.colorMain,
  colorMainLight: _.colorMainLight,
  colorPrimary: _.colorPrimary,
  colorSuccess: _.colorSuccess,
  colorYellow: _.colorYellow,
  colorWarning: _.colorWarning,
  colorPlainRaw: _.colorPlainRaw,
  colorPlain: _.colorPlain,
  colorWait: _.colorWait,
  colorBg: _.colorBg,
  colorBorder: _.colorBorder,

  // text
  colorTitleRaw: _.colorTitleRaw,
  colorTitle: _.colorTitle,
  colorDesc: _.colorDesc,
  colorSub: _.colorSub,
  colorDisabled: _.colorDisabled,
  colorIcon: _.colorIcon
}
const darkStyles = {
  // theme
  colorMain: _._colorMain,
  colorMainLight: _._colorMainLight,
  colorPrimary: _._colorPrimary,
  colorSuccess: _._colorSuccess,
  colorYellow: _._colorYellow,
  colorWarning: _._colorWarning,
  colorPlainRaw: _._colorPlainRaw,
  colorPlain: _._colorPlain,
  colorWait: _._colorWait,
  colorBg: _._colorBg,
  colorBorder: _._colorBorder,

  // text
  colorTitleRaw: _._colorTitleRaw,
  colorTitle: _._colorTitle,
  colorDesc: _._colorDesc,
  colorSub: _._colorSub,
  colorDisabled: _._colorDisabled,
  colorIcon: _._colorIcon
}

/**
 * 生成记忆styles的标识
 */
let _memoStylesId = 0
function getMemoStylesId() {
  _memoStylesId += 1
  return {
    _id: _memoStylesId,
    _mode: '',
    _tMode: '',
    _flat: '',
    _styles: ''
  }
}

class Theme extends store {
  constructor() {
    super()
    Object.keys(_).forEach(key => {
      if (!(key in this)) {
        this[key] = _[key]
      }
    })
  }

  state = observable({
    mode: DEFAULT_MODE,
    tinygrailThemeMode: DEFAULT_TINYGRAIL_THEME_MODE,
    tinygrailMode: DEFAULT_TINYGRAIL_MODE,
    fontSizeAdjust: 0,
    ...lightStyles
  })

  init = async () => {
    const mode = await this.getStorage('mode', NAMESPACE, DEFAULT_MODE)

    // 遗漏问题, 版本前有部分用户安卓9启用了跟随系统设置, 需要排除掉
    if (!IS_BEFORE_ANDROID_10 && this.autoColorScheme) {
      // 主题是否跟随系统
      const sysMode = Appearance.getColorScheme()
      if (sysMode !== mode) {
        this.toggleMode(sysMode)
      }
    } else if (mode !== DEFAULT_MODE) {
      // 默认是白天模式, 若初始化不是白天切换主题
      this.toggleMode(mode)
    }

    const tinygrailMode = await this.getStorage(
      'tinygrailMode',
      NAMESPACE,
      DEFAULT_TINYGRAIL_MODE
    )
    const tinygrailThemeMode = await this.getStorage(
      'tinygrailThemeMode',
      NAMESPACE,
      DEFAULT_TINYGRAIL_MODE
    )

    const fontSizeAdjust = await this.getStorage('fontSizeAdjust', NAMESPACE, 0)
    this.setState({
      tinygrailMode,
      tinygrailThemeMode,
      fontSizeAdjust
    })

    return true
  }

  create = style => StyleSheet.create(style)

  // -------------------- mode styles --------------------
  @computed get mode() {
    return this.state.mode
  }

  @computed get isDark() {
    return this.mode === 'dark'
  }

  @computed get autoColorScheme() {
    const { autoColorScheme } = systemStore.setting
    return autoColorScheme
  }

  @computed get flat() {
    const { flat } = systemStore.setting
    return flat
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

  // -------------------- tinygrail --------------------
  @computed get tinygrailThemeMode() {
    return this.state.tinygrailThemeMode
  }

  @computed get isTinygrailDark() {
    return this.tinygrailThemeMode === 'dark'
  }

  @computed get isGreen() {
    const { tinygrailMode } = this.state
    return tinygrailMode === DEFAULT_TINYGRAIL_MODE
  }

  @computed get isWeb() {
    const { tinygrailMode } = this.state
    return tinygrailMode === 'web'
  }

  @computed get colorBid() {
    if (this.isWeb) return _.colorBidWeb
    if (this.isGreen) return this.isTinygrailDark ? _.colorBid : _._colorBid
    return this.isTinygrailDark ? _.colorAsk : _._colorAsk
  }

  @computed get colorDepthBid() {
    if (this.isWeb) {
      return _.colorDepthBidWeb
    }
    if (this.isGreen) {
      return this.isTinygrailDark ? _.colorDepthBid : _._colorDepthBid
    }
    return this.isTinygrailDark ? _.colorDepthAsk : _._colorDepthAsk
  }

  @computed get colorAsk() {
    if (this.isWeb) return _.colorAskWeb
    if (this.isGreen) return this.isTinygrailDark ? _.colorAsk : _._colorAsk
    return this.isTinygrailDark ? _.colorBid : _._colorBid
  }

  @computed get colorDepthAsk() {
    if (this.isWeb) return _.colorDepthAskWeb
    if (this.isGreen) {
      return this.isTinygrailDark ? _.colorDepthAsk : _._colorDepthAsk
    }
    return this.isTinygrailDark ? _.colorDepthBid : _._colorDepthBid
  }

  @computed get colorTinygrailPlain() {
    return this.isTinygrailDark ? _.colorTinygrailPlain : _._colorTinygrailPlain
  }

  @computed get colorTinygrailPrimary() {
    return this.isTinygrailDark
      ? _.colorTinygrailPrimary
      : _._colorTinygrailPrimary
  }

  @computed get colorTinygrailBg() {
    return this.isTinygrailDark ? _.colorTinygrailBg : _._colorTinygrailBg
  }

  @computed get colorTinygrailContainer() {
    return this.isTinygrailDark
      ? _.colorTinygrailContainer
      : _._colorTinygrailContainer
  }

  @computed get colorTinygrailContainerHex() {
    return this.isTinygrailDark
      ? _.colorTinygrailContainerHex
      : _._colorTinygrailContainerHex
  }

  @computed get colorTinygrailBorder() {
    return this.isTinygrailDark
      ? _.colorTinygrailBorder
      : _._colorTinygrailBorder
  }

  @computed get colorTinygrailIcon() {
    return this.isTinygrailDark ? _.colorTinygrailIcon : _._colorTinygrailIcon
  }

  @computed get colorTinygrailText() {
    return this.isTinygrailDark ? _.colorTinygrailText : _._colorTinygrailText
  }

  @computed get colorTinygrailActive() {
    return this.isTinygrailDark
      ? _.colorTinygrailActive
      : _._colorTinygrailActive
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
        backgroundColor: IOS
          ? this.colorBg
          : this.select('transparent', _._colorBg)
      },
      plain: {
        flex: 1,
        backgroundColor: this.colorPlain
      },
      _plain: {
        flex: 1,
        backgroundColor: IOS
          ? this.colorPlain
          : this.select('transparent', _._colorPlain)
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
        paddingHorizontal: _.wind,
        paddingTop: _.space,
        paddingBottom: _.bottom
      },
      inner: {
        paddingVertical: _.space,
        paddingHorizontal: _.wind
      },
      wind: {
        paddingHorizontal: _.wind
      },
      bottom: {
        paddingBottom: _.bottom
      },
      sm: {
        padding: _.sm
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

  // -------------------- page --------------------
  /**
   * 主题选择
   * 黑暗模式使用第二个值
   */
  select = (lightValue, darkValue) => (this.isDark ? darkValue : lightValue)

  /**
   * 小圣杯主题选择
   * 白天模式使用第二个值
   */
  tSelect = (lightValue, darkValue) =>
    this.isTinygrailDark ? lightValue : darkValue

  /**
   * 切换模式
   */
  toggleMode = mode => {
    const key = 'mode'
    if (mode === 'light') {
      this.setState({
        [key]: 'light',
        ...lightStyles
      })
    } else if (mode === 'dark') {
      this.setState({
        [key]: 'dark',
        ...darkStyles
      })
    } else {
      this.setState({
        [key]: this.select('dark', 'light'),
        ...this.select(darkStyles, lightStyles)
      })
    }

    this.setStorage(key, undefined, NAMESPACE)
    this.changeNavigationBarColor()
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
      [key]:
        type === 'web' ? 'web' : tinygrailMode === 'green' ? 'red' : 'green'
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
    if (IOS) {
      return
    }

    try {
      InteractionManager.runAfterInteractions(() => {
        changeNavigationBarColor(
          this.select(_.colorPlainHex, _._colorDarkModeLevel1Hex),
          !this.isDark
        )
      })
    } catch (error) {
      console.warn('[ThemeStore] changeNavigationBarColor', error)
    }
  }

  /**
   * 小圣杯模块, 安卓改变底部菜单颜色
   */
  changeNavigationBarColorTinygrail = () => {
    if (IOS) {
      return
    }

    try {
      InteractionManager.runAfterInteractions(() => {
        changeNavigationBarColor(
          this.colorTinygrailContainerHex,
          !this.isTinygrailDark
        )
      })
    } catch (error) {
      console.warn('[ThemeStore] changeNavigationBarColorTinygrail', error)
    }
  }

  /**
   * 生成记忆styles函数
   * 原理: 通过闭包使每一个组件里面的StyleSheet.create都被记忆
   * 只有mode改变了, 才会重新StyleSheet.create, 配合mobx的observer触发重新渲染
   *
   *  - 支持key名为current的对象懒计算
   */
  memoStyles = (styles, dev) => {
    const memoId = getMemoStylesId()
    return () => {
      if (
        !memoId._mode ||
        !memoId._styles ||
        memoId._mode !== this.mode ||
        memoId._tMode !== this.tinygrailThemeMode ||
        memoId._flat !== this.flat
      ) {
        memoId._mode = this.mode
        memoId._tMode = this.tinygrailThemeMode
        memoId._flat = this.flat

        const computedStyles = styles(this)
        if (computedStyles.current) {
          const { current, ...otherStyles } = computedStyles
          memoId._styles = this.create(otherStyles)
          memoId._styles.current = current
        } else {
          memoId._styles = this.create(computedStyles)
        }

        if (dev) {
          log(memoId)
        }
      }
      return memoId._styles
    }
  }
}

const Store = new Theme()

setTimeout(() => {
  if (DEV && typeof initialDevDark === 'boolean') {
    if (
      (initialDevDark && !Store.isDark) ||
      (!initialDevDark && Store.isDark)
    ) {
      Store.toggleMode()
      console.info('Store.toggleMode')
    }

    if (
      (initialDevDark && !Store.isTinygrailDark) ||
      (!initialDevDark && Store.isTinygrailDark)
    ) {
      Store.toggleTinygrailThemeMode()
      console.info('Store.toggleTinygrailThemeMode')
    }
  }
}, 1000)

export default Store
