/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:12:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 02:59:04
 */
import type { StatusBarStyle } from 'react-native'
import type { ColorValue } from '@types'

export type Props = {
  /** 是否为小圣杯页面（小圣杯页面不受黑暗模式影响） */
  tinygrail?: boolean

  /** 状态栏背景色，默认 '#ffffff' */
  backgroundColor?: ColorValue

  /** 状态栏文字样式，默认 'dark-content'，黑暗模式下强制为 'light-content' */
  barStyle?: StatusBarStyle

  /** 是否沉浸式（仅安卓） */
  translucent?: boolean

  /** 是否动画过渡，默认 iOS 为 true */
  animated?: boolean

  /** 触发更新的导航事件，默认 'onDidFocus' */
  action?: 'onDidFocus' | 'onWillFocus' | 'onDidBlur' | 'onWillBlur'
}

/** NavigationEvents 传递的回调 */
export type PassProps = {
  /** 页面聚焦时回调 */
  onDidFocus: () => void

  /** 页面即将聚焦时回调 */
  onWillFocus?: () => void
}
