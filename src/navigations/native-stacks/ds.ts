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

  /**
   * 这里不再设置 cardStyle
   * cardStyle 是 @react-navigation/stack (JS 栈) 的选项, native-stack 6.x 源码里没有任何引用, 写了也不生效
   * 页面容器底色由 getScreenOptions 里的 contentStyle 提供
   */
  ...(IOS
    ? {}
    : {
        cardStyle: {
          backgroundColor: 'transparent',
          elevation: 0
        }
      }),

  /**
   * 失焦页面冻结 React 树 (screens 的 Screen 默认取 freezeEnabled(), 即 false)
   * 之前显式关掉, 导致已 push 的页面全部继续保活, 是跳转几个页面后内存打满的原因之一
   * 若发现返回页面时局部状态 / 动画不刷新, 改回 false 即可回滚
   */
  freezeOnBlur: true
} as const

export const ANIMATIONS = {
  horizontal: 'slide_from_right',
  vertical: 'slide_from_bottom',

  /** iOS 没有居中缩放, 使用渐变代替 */
  scale: IOS ? 'fade' : 'default'
} as const
