/*
 * @Author: czy0729
 * @Date: 2023-08-14 04:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-03 20:24:37
 */
import { IOS } from '@constants'

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

  /** iOS 没有居中缩放, 使用渐变代替 */
  scale: IOS ? 'fade' : 'default'
} as const
