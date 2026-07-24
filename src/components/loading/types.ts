/*
 * @Author: czy0729
 * @Date: 2022-06-05 13:12:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 06:32:47
 */
import type { ColorValue, Override, ViewStyle, WithViewStyles } from '@types'
import type { PropsWithChildren } from 'react'

export type ActivityIndicatorProps = WithViewStyles<{
  /** 指示器颜色 */
  color?: ColorValue

  /** 指示器大小 */
  size?: 'small' | 'large' | number

  /** @deprecated Spinner 样式 */
  spinnerStyle?: ViewStyle

  /** 背景颜色 */
  backgroundColor?: ColorValue
}>

export type Props = Override<ActivityIndicatorProps, PropsWithChildren<WithViewStyles<{}>>>

export interface ILoading {
  (props: Props): JSX.Element

  /** 原始加载指示器 */
  Raw?: (props: ActivityIndicatorProps) => JSX.Element

  /** 中等大小加载指示器 */
  Normal?: (props: ActivityIndicatorProps) => JSX.Element

  /** 中等大小加载指示器（带容器） */
  Medium?: (props: ActivityIndicatorProps) => JSX.Element

  /** 小型加载指示器 */
  Mini?: (props: ActivityIndicatorProps) => JSX.Element
}
