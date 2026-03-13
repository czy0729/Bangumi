/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:08:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 09:59:41
 */
import { Animated } from 'react-native'
import { TextStyle, ViewStyle } from '@types'

export interface Layout {
  x: number
  y: number
  width: number
  height: number
}

export interface Props {
  style?: ViewStyle
  tabStyle?: ViewStyle
  labelStyle?: TextStyle
  indicatorStyle?: ViewStyle
  tabs: string[]
  position: Animated.Value
  offset: Animated.Value
  page: number
  isIdle: boolean
  spacing?: number

  /** 使用本地化加速下一次的 onLayout */
  tabBarLocalKey: string
  TabBarLeft?: JSX.Element
  renderLabel?: (item: { style: ViewStyle; title: string }) => JSX.Element
  onTabPress: (index: number) => void
  onTabsLayout?: (layouts: Layout[]) => void
}
