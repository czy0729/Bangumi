/*
 * 工具类
 *
 * @Author: czy0729
 * @Date: 2022-06-27 13:12:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-27 13:34:05
 */
import React from 'react'
import {
  StyleProp,
  ViewStyle as RNViewStyle,
  TextStyle as RNTextStyle,
  ImageStyle as RNImageStyle,
  ColorValue as RNColorValue
} from 'react-native'

/** <View> StyleProp */
export type ViewStyle = StyleProp<RNViewStyle>

/** <Text> StyleProp */
export type TextStyle = StyleProp<RNTextStyle>

/** <Image> StyleProp */
export type ImageStyle = StyleProp<RNImageStyle>

/** React.ReactNode */
export type ReactNode = React.ReactNode

/** RNColorValue */
export type ColorValue = RNColorValue

/** 图片 uri */
export type Source =
  | string
  | number
  | {
      uri?: string
      headers?: {
        [key: string]: string
      }
    }

/** 用于在 vscode 里面注释能直接显示展开的 type */
export type Expand<T> = T extends infer O
  ? {
      [K in keyof O]: O[K]
    }
  : never

/** 复写 type */
export type Override<P, S> = Expand<Omit<P, keyof S> & S>

/** 深偏 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/** 取值 */
export type ValueOf<T> = T[keyof T]

/** 任意函数 */
export type Fn = (arg?: any, arg2?: any) => any

/** 选择函数 */
export type SelectFn = <T, K>(arg1: T, arg2: K) => T | K

/** React Component Interface */
export type IReactComponent<P = any> =
  | React.FunctionComponent<P>
  | React.ComponentClass<P>
  | React.ClassicComponentClass<P>

/** 取 Model 联合类型 */
export type ModelValueOf<T extends readonly any[], K extends string> = T[number][K]
