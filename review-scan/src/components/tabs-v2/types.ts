/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:07:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 04:14:09
 */
import { ColorValue, ViewStyle } from '@types'

type Route = {
  key?: string
  title?: string
}

type Label = {
  route?: Route
  focused?: boolean
}

export type Props = {
  style?: ViewStyle
  routes: Route[] | Readonly<Route[]>
  tabBarLength?: number
  page?: number
  lazy?: boolean
  textColor?: ColorValue
  backgroundColor?: ColorValue
  borderBottomColor?: ColorValue
  underlineColor?: ColorValue
  renderContentHeaderComponent?: any
  renderItem: (item: Route, index?: number) => any
  renderLabel?: (item: Label) => any
  onChange?: (arg0: any) => any
}
