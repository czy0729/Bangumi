/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:07:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 05:07:49
 */
import { ColorValue } from '@types'

type Route = {
  key?: string
  title?: string
}

type Label = {
  route?: Route
  focused?: boolean
}

export type Props = {
  routes: Route[] | Readonly<Route[]>
  tabBarLength?: number
  page?: number
  textColor?: ColorValue
  backgroundColor?: ColorValue
  borderBottomColor?: ColorValue
  underlineColor?: ColorValue
  renderItem?: (item: Route) => any
  renderLabel?: (item: Label) => any
  onChange?: (arg0: any) => any
}
