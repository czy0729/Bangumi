/*
 * @Author: czy0729
 * @Date: 2021-11-13 16:25:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-15 12:26:57
 */
import _ from '@styles'
import { MemoStylesItem } from './types'

export type themeWindowType = {
  width: number
  maxWidth: number
  contentWidth: number
  height: number
}

export const NAMESPACE = 'Theme'

export const DEFAULT_MODE = 'light'

export const DEFAULT_TINYGRAIL_MODE = 'green'

export const DEFAULT_TINYGRAIL_THEME_MODE = 'dark'

export const STYLES_LIGHT = {
  colorMain: _.colorMain,
  colorMainLight: _.colorMainLight,
  colorPrimary: _.colorPrimary,
  colorSuccess: _.colorSuccess,
  colorYellow: _.colorYellow,
  colorWarning: _.colorWarning,
  colorDanger: _.colorDanger,
  colorAvatar: _.colorAvatar,
  colorPlainRaw: _.colorPlainRaw,
  colorPlain: _.colorPlain,
  colorWait: _.colorWait,
  colorBg: _.colorBg,
  colorBorder: _.colorBorder,
  colorHighLight: _.colorHighLight,
  colorTitleRaw: _.colorTitleRaw,
  colorTitle: _.colorTitle,
  colorDesc: _.colorDesc,
  colorSub: _.colorSub,
  colorDisabled: _.colorDisabled,
  colorIcon: _.colorIcon
} as const

export const STYLES_DARK = {
  colorMain: _._colorMain,
  colorMainLight: _._colorMainLight,
  colorPrimary: _._colorPrimary,
  colorSuccess: _._colorSuccess,
  colorYellow: _._colorYellow,
  colorWarning: _._colorWarning,
  colorDanger: _.colorDanger,
  colorAvatar: _.colorAvatar,
  colorPlainRaw: _._colorPlainRaw,
  colorPlain: _._colorPlain,
  colorWait: _._colorWait,
  colorBg: _._colorBg,
  colorBorder: _._colorBorder,
  colorHighLight: _._colorHighLight,
  colorTitleRaw: _._colorTitleRaw,
  colorTitle: _._colorTitle,
  colorDesc: _._colorDesc,
  colorSub: _._colorSub,
  colorDisabled: _._colorDisabled,
  colorIcon: _._colorIcon
} as const

let _memoStylesId = 0

/** 生成记忆styles的标识 */
export function getMemoStylesId(): MemoStylesItem {
  _memoStylesId += 1
  return {
    _id: _memoStylesId,
    _mode: '',
    _tMode: '',
    _flat: '',
    _deepDark: '',
    _orientation: '',
    _customFontFamily: '',
    _styles: ''
  }
}
