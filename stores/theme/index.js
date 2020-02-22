/*
 * @Author: czy0729
 * @Date: 2019-11-30 10:30:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-22 07:58:38
 */
import { StyleSheet } from 'react-native'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { observable, computed } from 'mobx'
import store from '@utils/store'
import { IOS } from '@constants'
import _ from '@styles'

const NAMESPACE = 'Theme'
const DEFAULT_MODE = 'light'
const DEFAULT_TINYGRAIL_MODE = 'green' // green: 绿涨红跌 | red: 红涨绿跌
const lightStyles = {
  colorMain: _.colorMain,
  colorPrimary: _.colorPrimary,
  colorSuccess: _.colorSuccess,
  colorYellow: _.colorYellow,
  colorWarning: _.colorWarning,
  colorPlainRaw: _.colorPlainRaw,
  colorPlain: _.colorPlain,
  colorWait: _.colorWait,

  colorBg: _.colorBg,
  colorBorder: _.colorBorder,

  colorTitleRaw: _.colorTitleRaw,
  colorTitle: _.colorTitle,
  colorDesc: _.colorDesc,
  colorSub: _.colorSub,
  colorDisabled: _.colorDisabled,
  colorIcon: _.colorIcon,

  colorBid: _.colorBid,
  colorDepthBid: _.colorDepthBid,
  colorAsk: _.colorAsk,
  colorDepthAsk: _.colorDepthAsk
}
const darkStyles = {
  colorMain: _._colorMain,
  colorPrimary: _._colorPrimary,
  colorSuccess: _._colorSuccess,
  colorYellow: _._colorYellow,
  colorWarning: _._colorWarning,
  colorPlainRaw: _._colorPlainRaw,
  colorPlain: _._colorPlain,
  colorWait: _._colorWait,

  colorBg: _._colorBg,
  colorBorder: _._colorBorder,

  colorTitleRaw: _._colorTitleRaw,
  colorTitle: _._colorTitle,
  colorDesc: _._colorDesc,
  colorSub: _._colorSub,
  colorDisabled: _._colorDisabled,
  colorIcon: _._colorIcon,

  colorBid: _.colorBid,
  colorDepthBid: _.colorDepthBid,
  colorAsk: _.colorAsk,
  colorDepthAsk: _.colorDepthAsk
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
    tinygrailMode: DEFAULT_TINYGRAIL_MODE,
    fontSizeAdjust: 0,
    ...lightStyles
  })

  init = async () => {
    const res = this.getStorage('mode', NAMESPACE, DEFAULT_MODE)
    const mode = await res
    if (mode !== DEFAULT_MODE) {
      this.toggleMode(mode)
    }

    const tinygrailMode = await this.getStorage(
      'tinygrailMode',
      NAMESPACE,
      DEFAULT_TINYGRAIL_MODE
    )
    const fontSizeAdjust = await this.getStorage('fontSizeAdjust', NAMESPACE, 0)
    this.setState({
      tinygrailMode,
      fontSizeAdjust
    })

    return res
  }

  // -------------------- mode styles --------------------
  @computed get mode() {
    return this.state.mode
  }

  @computed get isDark() {
    return this.mode === 'dark'
  }

  @computed get colorMain() {
    return this.state.colorMain
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
  @computed get isGreen() {
    const { tinygrailMode } = this.state
    return tinygrailMode === DEFAULT_TINYGRAIL_MODE
  }

  @computed get colorBid() {
    return this.isGreen ? this.state.colorBid : this.state.colorAsk
  }

  @computed get colorDepthBid() {
    return this.isGreen ? this.state.colorDepthBid : this.state.colorDepthAsk
  }

  @computed get colorAsk() {
    return this.isGreen ? this.state.colorAsk : this.state.colorBid
  }

  @computed get colorDepthAsk() {
    return this.isGreen ? this.state.colorDepthAsk : this.state.colorDepthBid
  }

  // -------------------- tool styles --------------------
  @computed get container() {
    return StyleSheet.create({
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

  // -------------------- page --------------------
  /**
   * 黑暗模式使用第二个值
   */
  select = (lightValue, darkValue) => (this.isDark ? darkValue : lightValue)

  /**
   * 切换模式
   */
  toggleMode = () => {
    const key = 'mode'
    this.setState({
      [key]: this.select('dark', 'light'),
      ...this.select(darkStyles, lightStyles)
    })
    this.setStorage(key, undefined, NAMESPACE)
    this.changeNavigationBarColor()
  }

  /**
   * 切换小圣杯主题模式
   */
  toggleTinygrailMode = () => {
    const { tinygrailMode } = this.state
    const key = 'tinygrailMode'
    this.setState({
      [key]: tinygrailMode === 'green' ? 'red' : 'green'
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
      changeNavigationBarColor(
        this.select(_.colorPlainHex, _._colorDarkModeLevel1Hex),
        !this.isDark
      )
    } catch (error) {
      console.warn('[ThemeStore] changeNavigationBarColor', error)
    }
  }

  /**
   * 生成记忆styles函数
   * 原理: 通过闭包使每一个组件里面的StyleSheet.create都被记忆
   * 只有mode改变了, 才会重新StyleSheet.create, 配合mobx的observer触发重新渲染
   */
  memoStyles = (styles, dev) => {
    const memoId = getMemoStylesId()
    return () => {
      if (!memoId._mode || !memoId._styles || memoId._mode !== this.mode) {
        // eslint-disable-next-line no-param-reassign
        memoId._mode = this.mode

        // eslint-disable-next-line no-param-reassign
        memoId._styles = StyleSheet.create(styles(this))

        if (dev) {
          console.info(memoId)
        }
      }
      return memoId._styles
    }
  }
}

export default new Theme()
