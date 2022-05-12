/*
 * @Author: czy0729
 * @Date: 2022-05-02 09:56:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-13 05:25:55
 */
import React from 'react'
import {
  StyleProp,
  ViewStyle as RNViewStyle,
  TextStyle as RNTextStyle,
  ImageStyle as RNImageStyle,
  ColorValue as RNColorValue
} from 'react-native'

/** utils */
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

/** constants */
export type Navigation = {
  push?: (path: string, params?: object) => any
  navigate?: (arg0?: any) => any
  goBack?: (arg0?: any) => any
  getRootState?: (arg0?: any) => any
  setOptions?: (params?: object) => any
}

export type ViewStyle = StyleProp<RNViewStyle>

export type TextStyle = StyleProp<RNTextStyle>

export type ImageStyle = StyleProp<RNImageStyle>

export type ReactNode = React.ReactNode

export type ColorValue = RNColorValue

export type EventType = {
  id?: string
  data?: object
}

export type Source =
  | string
  | number
  | {
      uri?: string
      headers?: {
        [key: string]: string
      }
    }

export type Fn = (arg?: any, arg2?: any) => any
