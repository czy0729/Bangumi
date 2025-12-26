/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:07:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:13:41
 */
import type { ColorValue, WithViewStyles } from '@types'

export type Route = {
  key?: string
  title?: string
}

type Label<T extends Route> = {
  route?: T
  focused?: boolean
}

export type Props<T extends Route> = WithViewStyles<{
  routes: readonly T[]
  tabBarLength?: number
  page?: number
  lazy?: boolean
  textColor?: ColorValue
  backgroundColor?: ColorValue
  borderBottomColor?: ColorValue
  underlineColor?: ColorValue
  renderContentHeaderComponent?: any
  renderItem: (item: T, index?: number) => any
  renderLabel?: (item: Label<T>) => any
  onChange?: (arg0: any) => any
}>
