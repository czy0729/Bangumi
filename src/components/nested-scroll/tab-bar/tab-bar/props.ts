/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:08:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 17:08:54
 */
import { Animated, StyleProp, TextStyle, ViewStyle } from 'react-native'

export interface Layout {
  x: number
  y: number
  width: number
  height: number
}

export interface Props {
  tabs: string[]
  onTabPress: (index: number) => void
  onTabsLayout?: (layouts: Layout[]) => void
  position: Animated.Value
  offset: Animated.Value
  page: number
  isIdle: boolean
  spacing?: number
  style?: StyleProp<ViewStyle>
  tabStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  indicatorStyle?: StyleProp<ViewStyle>
}
