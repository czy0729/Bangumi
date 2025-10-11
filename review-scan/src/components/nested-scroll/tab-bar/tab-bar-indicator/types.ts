/*
 * @Author: czy0729
 * @Date: 2023-12-27 17:18:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 17:19:11
 */
import { Animated, StyleProp, ViewStyle } from 'react-native'

export interface Props {
  style?: StyleProp<ViewStyle>
  scrollX: Animated.AnimatedInterpolation<number>
}
