/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:23:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 02:02:13
 */
import type { ViewProps } from 'react-native'
import type { TextStyle, ViewStyle } from '@types'

export interface Props {
  title: string
  style?: ViewStyle
  // labelStyle?:
  //   | Animated.WithAnimatedObject<TextStyle>
  //   | Animated.WithAnimatedArray<StyleProp<TextStyle>>
  labelStyle?: TextStyle
  renderLabel?: (item: { style: ViewStyle; title: string }) => JSX.Element
  onPress?: () => void
  onLayout: ViewProps['onLayout']
}
