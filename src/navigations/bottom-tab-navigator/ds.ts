/*
 * @Author: czy0729
 * @Date: 2024-03-04 17:17:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-13 12:20:11
 */
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

const COMMENT_SCREEN_OPTIONS: BottomTabNavigationOptions = {
  headerShown: false,
  headerTransparent: false,
  headerShadowVisible: false
} as const

export const DEFAULT_SCREEN_OPTIONS: BottomTabNavigationOptions = {
  ...COMMENT_SCREEN_OPTIONS,
  lazy: true,

  /**
   * 失焦 tab 冻结 React 树 (screens 的 Screen 默认取 freezeEnabled(), 即 false)
   * 不设时 6 个底栏 tab 切走后仍全量保活并持续重渲染, MobX observer 全部活跃, 是 iOS 内存持续上涨的原因之一
   * 若发现返回 tab 时局部状态 / 动画不刷新, 删掉此行即可回滚
   */
  freezeOnBlur: true
}
