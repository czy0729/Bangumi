/*
 * @Author: czy0729
 * @Date: 2022-08-19 05:07:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-25 05:13:41
 */
import type { ColorValue, ReactNode, WithViewStyles } from '@types'

/** Tab 路由数据 */
export type Route = {
  /** 路由唯一标识 */
  key?: string

  /** 路由标题 */
  title?: string
}

/** Tab 标签数据 */
type Label<T extends Route> = {
  /** 路由数据 */
  route?: T

  /** 是否选中 */
  focused?: boolean
}

export type Props<T extends Route> = WithViewStyles<{
  /** 路由列表 */
  routes: readonly T[]

  /** 指定 TabBar 显示的 Tab 数量, 默认为 routes.length */
  tabBarLength?: number

  /** 当前选中的 Tab 索引 */
  page?: number

  /** 是否延迟渲染未选中的 Tab 内容, 默认 true */
  lazy?: boolean

  /** Tab 文字颜色 */
  textColor?: ColorValue

  /** TabBar 背景色 */
  backgroundColor?: ColorValue

  /** TabBar 底部边框颜色 */
  borderBottomColor?: ColorValue

  /** 选中指示器颜色 */
  underlineColor?: ColorValue

  /** TabBar 下方、内容区域上方的自定义头部组件 */
  renderContentHeaderComponent?: ReactNode

  /** 渲染每个 Tab 对应的内容 */
  renderItem: (item: T, index?: number) => JSX.Element

  /** 自定义渲染 Tab 标签 */
  renderLabel?: (item: Label<T>) => ReactNode

  /** Tab 切换回调 */
  onChange?: (index: number) => void
}>
