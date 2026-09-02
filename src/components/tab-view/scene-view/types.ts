/*
 * @Author: czy0729
 * @Date: 2026-09-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 02:50:42
 */
import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type {
  EventEmitterProps,
  NavigationState,
  Route,
  SceneRendererProps
} from 'react-native-tab-view/src/types'

/** 场景容器 Props */
export type Props<T extends Route> = SceneRendererProps &
  EventEmitterProps & {
    /** 导航状态 */
    navigationState: NavigationState<T>

    /** 是否懒加载 */
    lazy: boolean

    /** 懒加载预加载距离 */
    lazyPreloadDistance: number

    /** 场景索引 */
    index: number

    /** 场景容器样式 */
    style?: StyleProp<ViewStyle>

    /** 渲染子内容, loading 表示处于懒加载占位 */
    children: (props: { loading: boolean }) => ReactNode
  }
