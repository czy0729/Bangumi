/*
 * @Author: czy0729
 * @Date: 2022-06-05 13:12:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-24 23:34:52
 */
import { ColorValue, Override, ViewStyle } from '@types'

export type ActivityIndicatorProps = {
  style?: ViewStyle
  color?: ColorValue
  size?: 'small' | 'large' | number
  spinnerStyle?: ViewStyle
  backgroundColor?: ColorValue
}

export type Props = Override<
  ActivityIndicatorProps,
  {
    style?: ViewStyle
    children?: any
  }
>

export interface ILoading {
  (props: Props): JSX.Element
  Raw?: (props: ActivityIndicatorProps) => JSX.Element
  Normal?: (props: ActivityIndicatorProps) => JSX.Element
  Medium?: (props: ActivityIndicatorProps) => JSX.Element
  Mini?: (props: ActivityIndicatorProps) => JSX.Element
}
