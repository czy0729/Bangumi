/*
 * @Author: czy0729
 * @Date: 2026-08-17 21:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 02:50:57
 */
import type { ReactNode } from 'react'
import type { Animated, StyleProp, ViewStyle } from 'react-native'
import type {
  EventEmitterProps,
  Layout,
  PagerProps,
  Route,
  SceneRendererProps
} from 'react-native-tab-view/src/types'

/** Pager children 渲染参数 */
export type PagerChildrenProps = EventEmitterProps & {
  position: Animated.AnimatedInterpolation<number>
  render: (children: ReactNode) => ReactNode
  jumpTo: (key: string) => void
}

export type OverrideNavigationState<T extends Route> = {
  index: number
  routes: readonly T[]
}

export type Props<T extends Route> = PagerProps & {
  /** 导航状态 */
  navigationState: OverrideNavigationState<T>

  /** 容器样式 */
  style?: StyleProp<ViewStyle>

  /** Pager 容器样式 */
  pagerStyle?: StyleProp<ViewStyle>

  /** 场景容器样式 */
  sceneContainerStyle?: StyleProp<ViewStyle>

  /** Tab 栏位置 */
  tabBarPosition?: 'top' | 'bottom'

  /** 初始布局 */
  initialLayout?: Partial<Layout>

  /** 是否懒加载，支持函数按 route 判断 */
  lazy?: ((props: { route: T }) => boolean) | boolean

  /** 懒加载预加载距离 */
  lazyPreloadDistance?: number

  /** 懒加载占位渲染 */
  renderLazyPlaceholder?: (props: { route: T }) => ReactNode

  /** 渲染场景 */
  renderScene: (props: SceneRendererProps & { route: T }) => ReactNode

  /** 渲染 Tab 栏 */
  renderTabBar?: (
    props: SceneRendererProps & { navigationState: OverrideNavigationState<T> }
  ) => ReactNode

  /** 页码变更回调 */
  onIndexChange: (index: number) => void

  /** @add 内容头部组件 */
  renderContentHeaderComponent?: ReactNode

  /** @add 背景组件 */
  renderBackground?: ReactNode
}

/** 滑动状态 hook 参数 */
export type UseTabViewSwipeOptions = Pick<Props<Route>, 'onSwipeStart' | 'onSwipeEnd'>
