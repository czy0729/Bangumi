/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:23:03
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-12-27 17:23:03
 */
import { Animated, StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'

export interface Props {
  title: string
  onPress?: () => void
  onLayout: ViewProps['onLayout']
  style?: StyleProp<ViewStyle>
  labelStyle?:
    | Animated.WithAnimatedObject<TextStyle>
    | Animated.WithAnimatedArray<StyleProp<TextStyle>>
}
