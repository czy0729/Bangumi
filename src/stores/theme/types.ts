/*
 * @Author: czy0729
 * @Date: 2022-07-02 22:39:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-25 08:49:20
 */
import { StyleSheet } from 'react-native'
import { ORIENTATION_LANDSCAPE, ORIENTATION_PORTRAIT } from '@constants'
import { STYLES_DARK, STYLES_LIGHT } from './init'

export type Orientation = typeof ORIENTATION_PORTRAIT | typeof ORIENTATION_LANDSCAPE

export type Mode = 'light' | 'dark'

/** green: 绿涨红跌 | red: 红涨绿跌 | web: 网页一致 */
export type TinygrailMode = 'green' | 'red' | 'web'

type StylesLight = typeof STYLES_LIGHT

type StylesDark = typeof STYLES_DARK

type ColorKeys = keyof StylesLight | keyof StylesDark

export type Color<K> = K extends ColorKeys ? StylesLight[K] | StylesDark[K] : never

export type Styles<T> = StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>

export type MemoStylesItem = {
  _id: number
  _hash: any
  _styles: any
}
