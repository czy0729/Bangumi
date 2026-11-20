/*
 * @Author: czy0729
 * @Date: 2026-08-19 05:28:04
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-19 05:28:04
 */
import type { Route, TabBarProps } from '@components/tab-view'

/** Tab 栏属性（Pick 自 TabBar） */
export type Props = TabBarProps<Route>

/** Tab 标签渲染属性 */
export type RenderLabelProps = {
  /** 路由 */
  route: Route

  /** 是否聚焦 */
  focused: boolean

  /** 文字颜色 */
  color: string
}
