/*
 * @Author: czy0729
 * @Date: 2021-11-13 16:25:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-25 01:56:14
 */
import { ORIENTATION_PORTRAIT, WEB } from '@constants'
import _ from '@styles'
import { MemoStylesItem } from './types'

export type themeWindowType = {
  width: number
  maxWidth: number
  contentWidth: number
  height: number
}

export const NAMESPACE = 'Theme'

export const DEFAULT_MODE = WEB ? 'dark' : 'light'

export const DEFAULT_TINYGRAIL_MODE = 'green'

export const DEFAULT_TINYGRAIL_THEME_MODE = 'dark'

export const STYLES_LIGHT = {
  colorAvatar: _.colorAvatar,
  colorBg: _.colorBg,
  colorBgRaw: _.colorBgRaw,
  colorBorder: _.colorBorder,
  colorDanger: _.colorDanger,
  colorDarkModeLevel1: _._colorDarkModeLevel1,
  colorDarkModeLevel1Hex: _._colorDarkModeLevel1Hex,
  colorDarkModeLevel1Raw: _._colorDarkModeLevel1Raw,
  colorDarkModeLevel2: _._colorDarkModeLevel2,
  colorDesc: _.colorDesc,
  colorDisabled: _.colorDisabled,
  colorHighLight: _.colorHighLight,
  colorIcon: _.colorIcon,
  colorMain: _.colorMain,
  colorMainLight: _.colorMainLight,
  colorPlain: _.colorPlain,
  colorPlainHex: _.colorPlainHex,
  colorPlainRaw: _.colorPlainRaw,
  colorPrimary: _.colorPrimary,
  colorSub: _.colorSub,
  colorSuccess: _.colorSuccess,
  colorTitle: _.colorTitle,
  colorTitleRaw: _.colorTitleRaw,
  colorWait: _.colorWait,
  colorWarning: _.colorWarning,
  colorYellow: _.colorYellow
} as const

export const STYLES_DARK = {
  colorAvatar: _.colorAvatar,
  colorBg: _._colorBg,
  colorBgRaw: _._colorBgRaw,
  colorBorder: _._colorBorder,
  colorDanger: _.colorDanger,
  colorDarkModeLevel1: _._colorDarkModeLevel1,
  colorDarkModeLevel1Hex: _._colorDarkModeLevel1Hex,
  colorDarkModeLevel1Raw: _._colorDarkModeLevel1Raw,
  colorDarkModeLevel2: _._colorDarkModeLevel2,
  colorDesc: _._colorDesc,
  colorDisabled: _._colorDisabled,
  colorHighLight: _._colorHighLight,
  colorIcon: _._colorIcon,
  colorMain: _._colorMain,
  colorMainLight: _._colorMainLight,
  colorPlain: _._colorPlain,
  colorPlainHex: _._colorPlainHex,
  colorPlainRaw: _._colorPlainRaw,
  colorPrimary: _._colorPrimary,
  colorSub: _._colorSub,
  colorSuccess: _._colorSuccess,
  colorTitle: _._colorTitle,
  colorTitleRaw: _._colorTitleRaw,
  colorWait: _._colorWait,
  colorWarning: _._colorWarning,
  colorYellow: _._colorYellow
} as const

let _memoStylesId = 0

/** 生成记忆styles的标识 */
export function getMemoStylesId(): MemoStylesItem {
  _memoStylesId += 1
  return {
    _id: _memoStylesId,
    _hash: '',
    _styles: ''
  }
}

const STATE = {
  mode: DEFAULT_MODE,
  orientation: ORIENTATION_PORTRAIT,
  window: _.window,
  wind: _.wind,
  _wind: _._wind,
  landscapeWindow: _.landscapeWindow,
  landscapeWind: _.landscapeWind,
  landscapeWindowSm: _.landscapeWindowSm,
  landscapeWindSm: _.landscapeWindSm,
  fontSizeAdjust: 0,
  ...STYLES_LIGHT,
  tinygrailMode: DEFAULT_TINYGRAIL_MODE,
  tinygrailThemeMode: DEFAULT_TINYGRAIL_THEME_MODE,
  wsaLayoutChanged: 0
}

// Storybook 中强制初始化为深黑模式
if (WEB) {
  Object.entries({
    mode: 'dark',
    ...STYLES_DARK,
    ..._._colorThemeDeepDark
  }).forEach(([key, value]) => {
    STATE[key] = value
  })
}

export { STATE }

export const LOADED = {
  mode: false,
  tinygrailMode: false,
  tinygrailThemeMode: false,
  fontSizeAdjust: false
}
