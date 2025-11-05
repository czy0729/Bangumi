/*
 * @Author: czy0729
 * @Date: 2024-03-04 17:17:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-04 18:02:16
 */
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

const COMMENT_SCREEN_OPTIONS: BottomTabNavigationOptions = {
  headerShown: false,
  headerTransparent: false,
  headerShadowVisible: false
} as const

export const DEFAULT_SCREEN_OPTIONS: BottomTabNavigationOptions = {
  ...COMMENT_SCREEN_OPTIONS,
  lazy: true
}
