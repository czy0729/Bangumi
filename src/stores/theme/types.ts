/*
 * @Author: czy0729
 * @Date: 2022-07-02 22:39:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-03 02:13:09
 */
import { ORIENTATION_PORTRAIT, ORIENTATION_LANDSCAPE } from '@constants'
import { STYLES_LIGHT, STYLES_DARK } from './init'

export type Orientation = typeof ORIENTATION_PORTRAIT | typeof ORIENTATION_LANDSCAPE

export type Mode = 'light' | 'dark'

/** green: 绿涨红跌 | red: 红涨绿跌 | web: 网页一致 */
export type TinygrailMode = 'green' | 'red' | 'web'

type StylesLight = typeof STYLES_LIGHT

type StylesDark = typeof STYLES_DARK

type ColorKeys = keyof StylesLight | keyof StylesDark

export type Color<K> = K extends ColorKeys ? StylesLight[K] | StylesDark[K] : never

export type MemoStylesItem = {
  _id: number
  _mode: any
  _tMode: any
  _flat: any
  _deepDark: any
  _orientation: any
  _styles: any
}
