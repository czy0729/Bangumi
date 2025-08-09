/*
 * 工具类
 * @Author: czy0729
 * @Date: 2022-06-27 13:12:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 05:02:40
 */
import React from 'react'
import {
  ColorValue as RNColorValue,
  ImageProps,
  ImageStyle as RNImageStyle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleProp,
  TextStyle as RNTextStyle,
  ViewStyle as RNViewStyle
} from 'react-native'

/** RNView StyleProp */
export type ViewStyle = StyleProp<RNViewStyle>

/** RNText StyleProp */
export type TextStyle = StyleProp<RNTextStyle>

/** RNImage StyleProp */
export type ImageStyle = StyleProp<RNImageStyle>

/** 格子布局分拆工具函数返回样式 */
export type GridStyle = {
  width: number
  height: number
  marginLeft: number
}

/** React.ReactNode */
export type ReactNode = React.ReactNode

/** setTimeout or setInterval ref */
export type TimerRef = ReturnType<typeof setTimeout> | null

/** RNColorValue */
export type ColorValue = RNColorValue

/** 图片 uri */
export type ImageSource = ImageProps['source']

type DeepReadonly<T> = T extends (...args: any[]) => any
  ? T
  : T extends Array<infer U>
  ? ReadonlyArray<DeepReadonly<U>>
  : T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T

/** 只读 */
export type ReadonlyResult<T> = T extends (...args: any[]) => infer R
  ? DeepReadonly<R>
  : DeepReadonly<T>

/**
 * 用于在 vscode 里面注释能直接显示展开的 type
 * https://stackoverflow.com/questions/57683303/how-can-i-see-the-full-expanded-contract-of-a-typescript-type/57683652#57683652
 * */
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

/** 用于在 vscode 里面注释能直接显示展开的扩展 type */
export type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T

/** 用于展平推到结果 */
export type Flatten<T> = {
  [K in keyof T]: T[K]
}

/** 复写 type */
export type Override<P, S> = Expand<Omit<P, keyof S> & S>

/** 深遍历 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Function ? T[P] : T[P] extends object ? DeepPartial<T[P]> : T[P]
}

/** 取值 */
export type ValueOf<T> = T[keyof T]

/** 任意函数 */
export type Fn = (...args: any[]) => any

/** 选择函数 */
export type SelectFn = <T, K>(arg1: T, arg2: K) => T | K

/** 获取本地 state 的类型 */
export type LocalState<T extends object, K extends object> = Expand<Omit<T, keyof K>>

/** React Component Interface */
export type IReactComponent<T = any> =
  | React.FunctionComponent<T>
  | React.ComponentClass<T>
  | React.ClassicComponentClass<T>

/** 取 Model 联合类型 */
export type ModelValueOf<T extends readonly any[], K extends string = 'value'> = T[number][K]

/** 普通对象 */
export type AnyObject<T = any> = Record<string, any> & T

/** 取数组项 */
export type InferArray<T> = T extends (infer S)[] ? S : never

/** 取函数第一个参数 */
export type FnParams<T extends Fn> = Parameters<T>[0]

/** ScrollView 滑动事件对象类型 */
export type ScrollEvent = NativeSyntheticEvent<NativeScrollEvent>

export type Join<T extends string[], D extends string> = T extends [infer F, ...infer R]
  ? // @ts-expect-error
    `${F}${R extends [] ? '' : D}${Join<R, D>}`
  : ''

/** 取对象 Boolean 的值的键 */
export type BooleanKeys<T> = Extract<
  {
    [K in keyof T]: T[K] extends boolean ? K : never
  }[keyof T],
  keyof T
>

/** 取对象非 Boolean 的值的键 */
export type NonBooleanKeys<T> = Extract<
  {
    [K in keyof T]: T[K] extends boolean ? never : K
  }[keyof T],
  keyof T
>

/** 使一个键变成可选 */
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/** 允许只读 */
export type MaybeReadonly<T> = T | ReadonlyResult<T>
