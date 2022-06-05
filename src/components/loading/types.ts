/*
 * @Author: czy0729
 * @Date: 2022-06-05 13:12:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 13:28:38
 */
import { Override, ColorValue, ViewStyle } from '@types'

export type ActivityIndicatorProps = {
  color?: ColorValue
  size?: 'small' | 'large'
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
  Mini?: (props: ActivityIndicatorProps) => JSX.Element
}
