/*
 * @Author: czy0729
 * @Date: 2022-05-02 09:56:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-02 12:40:50
 */
import React from 'react'
import {
  StyleProp,
  ViewStyle as RNViewStyle,
  TextStyle as RNTextStyle,
  ColorValue as RNColorValue
} from 'react-native'

export type Navigation = {
  goBack?: () => void
  setOptions?: (params?: object) => void
}

export type ViewStyle = StyleProp<RNViewStyle>

export type TextStyle = StyleProp<RNTextStyle>

export type ReactNode = React.ReactNode

export type ColorValue = RNColorValue

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never
