/*
 * @Author: czy0729
 * @Date: 2019-11-30 10:30:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-01 22:47:21
 */
import { StyleSheet } from 'react-native'
import { observable, computed } from 'mobx'
import store from '@utils/store'
import _ from '@styles'

const NAMESPACE = 'Theme'
const DEFAULT_MODE = 'light'
const lightStyles = {
  colorMain: _.colorMain,
  colorPrimary: _.colorPrimary,
  colorSuccess: _.colorSuccess,
  colorYellow: _.colorYellow,
  colorWarning: _.colorWarning,
  colorDanger: _.colorDanger,
  colorPlain: _.colorPlain,
  colorBg: _.colorBg,
  colorBorder: _.colorBorder,

  colorTitle: _.colorTitle,
  colorDesc: _.colorDesc,
  colorSub: _.colorSub,
  colorDisabled: _.colorDisabled,
  colorIcon: _.colorIcon
}
const darkStyles = {
  colorMain: _._colorMain,
  colorPrimary: _._colorPrimary,
  colorSuccess: _._colorSuccess,
  colorYellow: _._colorYellow,
  colorWarning: _._colorWarning,
  colorDanger: _._colorDanger,
  colorPlain: _._colorPlain,
  colorBg: _._colorBg,
  colorBorder: _._colorBorder,

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
    ...lightStyles
  })

  init = async () => {
    const res = this.getStorage('mode', NAMESPACE)
    const mode = await res
    if (mode !== DEFAULT_MODE) {
      this.toggleMode(mode)
    }
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

  @computed get colorDanger() {
    return this.state.colorDanger
  }

  @computed get colorPlain() {
    return this.state.colorPlain
  }

  @computed get __colorPlain__() {
    return _.colorPlain
  }

  @computed get colorBg() {
    return this.state.colorBg
  }

  @computed get colorBorder() {
    return this.state.colorBorder
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

  // -------------------- tool styles --------------------
  @computed get container() {
    return StyleSheet.create({
      flex: {
        flex: 1
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
          console.log(memoId)
        }
      }
      return memoId._styles
    }
  }
}

export default new Theme()
