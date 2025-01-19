/*
 * @Author: czy0729
 * @Date: 2023-08-14 04:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-14 04:42:07
 */
export const DEFAULT_SCREEN_OPTIONS = {
  statusBarColor: 'transparent',
  headerShown: false,
  headerTransparent: false,
  headerShadowVisible: false,
  cardStyle: {
    backgroundColor: 'transparent',
    elevation: 0
  },
  freezeOnBlur: false
} as const

export const ANIMATIONS = {
  horizontal: 'slide_from_right',
  vertical: 'slide_from_bottom',
  scale: 'default'
} as const
