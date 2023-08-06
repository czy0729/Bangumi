/*
 * @Author: czy0729
 * @Date: 2023-08-01 22:14:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-01 22:16:20
 */
import { LayoutAnimation } from 'react-native'

/** From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02 */
export const DEFAULT_ANIMATION = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200
  }
} as const
