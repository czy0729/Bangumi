/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:23:03
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-12-27 17:23:03
 */
import { ViewProps } from 'react-native'
import { TextStyle, ViewStyle } from '@types'

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
