/*
 * @Author: czy0729
 * @Date: 2024-01-16 18:26:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-24 14:00:00
 */
import { Fragment, useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { uiStore } from '@stores'
import { stl } from '@utils/utils'
import { IOS } from '@constants/env'
import Pager from '../pager'
import SceneView from '../scene-view'
import { defaultRenderLazyPlaceholder, defaultRenderTabBar } from './utils'

import type { Animated as RNAnimated, LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native'
import type { PanGestureHandler } from 'react-native-gesture-handler'
import type { Props as ChildProps } from '../pager'
import type {
  Layout,
  NavigationState as PagerNavigationState,
  Route,
  SceneRendererProps
} from '../types'

type NavigationState<T extends Route> = {
  index: number
  routes: T[] | readonly T[]
}

/** 透传给 renderPager 的通用配置 */
type PagerCommonProps = {
  keyboardDismissMode?: 'none' | 'on-drag' | 'auto'
  swipeEnabled?: boolean
  swipeVelocityImpact?: number
  timingConfig?: Record<string, unknown>
  springConfig?: Record<string, unknown>
  springVelocityScale?: number
  gestureHandlerProps?: React.ComponentProps<typeof PanGestureHandler>
  onSwipeStart?: () => void
  onSwipeEnd?: () => void
}

/** Web 端额外透传给 Pager 的配置 */
type PagerRenderProps<T extends Route> = ChildProps<T> & {
  swipeVelocityImpact?: number
  timingConfig?: Record<string, unknown>
  springConfig?: Record<string, unknown>
  springVelocityScale?: number
  gestureHandlerProps?: React.ComponentProps<typeof PanGestureHandler>
}

export type Props<T extends Route> = PagerCommonProps & {
  position?: RNAnimated.Value
  onIndexChange: (index: number) => void
  navigationState: NavigationState<T>
  renderScene: (
    props: SceneRendererProps & {
      route: T
    }
  ) => React.ReactNode
  renderLazyPlaceholder: (props: { route: T }) => React.ReactNode
  renderTabBar: (
    props: SceneRendererProps & {
      navigationState: NavigationState<T>
    }
  ) => React.ReactNode
  tabBarPosition: 'top' | 'bottom'
  initialLayout?: { width?: number; height?: number }
  lazy: boolean
  lazyPreloadDistance: number
  removeClippedSubviews?: boolean
  sceneContainerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>
  gestureHandlerProps: React.ComponentProps<typeof PanGestureHandler>
  renderPager: (props: PagerRenderProps<T>) => React.ReactNode

  /** @add */
  renderContentHeaderComponent?: React.ReactNode
  renderBackground?: React.ReactNode

  /** 相邻场景保活距离 (默认 Infinity: 全部保活) */
  keepDistance?: number
}

const GestureHandlerWrapper = GestureHandlerRootView ?? View

/** reanimated 3 已移除 Code / set, 旧版本才可用 */
const LegacyAnimated = Animated as unknown as {
  Code?: React.ComponentType<{ exec: unknown }>
  set?: (value: unknown, to: unknown) => unknown
}

function defaultRenderPager(props: PagerRenderProps<Route>) {
  return <Pager {...props} />
}

export default function TabView<T extends Route>({
  style,
  position: positionListener,
  navigationState,
  initialLayout,
  lazy = false,
  lazyPreloadDistance = 0,
  removeClippedSubviews = !IOS,
  keyboardDismissMode = 'auto',
  swipeEnabled = true,
  swipeVelocityImpact,
  timingConfig = {},
  springConfig = {},
  tabBarPosition = 'top',
  renderTabBar = defaultRenderTabBar,
  renderScene,
  renderLazyPlaceholder = defaultRenderLazyPlaceholder,
  sceneContainerStyle,
  gestureHandlerProps = {},
  springVelocityScale,
  renderPager = defaultRenderPager,
  onIndexChange,
  onSwipeStart,
  onSwipeEnd,
  renderContentHeaderComponent,
  renderBackground = null,
  keepDistance = Infinity
}: Props<T>) {
  const [layout, setLayout] = useState<Layout>(() => ({
    width: 0,
    height: 0,
    ...initialLayout
  }))

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const { height, width } = e.nativeEvent.layout
    setLayout(prev => (prev.width === width && prev.height === height ? prev : { height, width }))
  }, [])

  const jumpToIndex = useCallback(
    (index: number) => {
      if (index !== navigationState.index) {
        onIndexChange(index)
      }
    },
    [navigationState.index, onIndexChange]
  )

  const handleSwipeStart = useCallback(() => {
    uiStore.setScrolling(true)
    onSwipeStart?.()
  }, [onSwipeStart])

  const handleSwipeEnd = useCallback(() => {
    setTimeout(() => {
      uiStore.setScrolling(false)
      onSwipeEnd?.()
    }, 300)
  }, [onSwipeEnd])

  return (
    <GestureHandlerWrapper style={stl(styles.pager, style)} onLayout={handleLayout}>
      {renderPager({
        // 只读 routes 与 Pager 期望的可变数组不兼容
        navigationState: navigationState as PagerNavigationState<T>,
        layout,
        keyboardDismissMode,
        swipeEnabled,
        swipeVelocityImpact,
        timingConfig,
        springConfig,
        onSwipeStart: handleSwipeStart,
        onSwipeEnd: handleSwipeEnd,
        onIndexChange: jumpToIndex,
        springVelocityScale,
        removeClippedSubviews,
        gestureHandlerProps,
        children: ({ position, render, addEnterListener, jumpTo }) => {
          // All of the props here must not change between re-renders
          // This is crucial to optimizing the routes with PureComponent
          const sceneRendererProps = {
            position,
            layout,
            jumpTo
          }

          const routes: readonly T[] = navigationState.routes
          return (
            <Fragment>
              {positionListener && LegacyAnimated.Code && LegacyAnimated.set ? (
                <LegacyAnimated.Code exec={LegacyAnimated.set(positionListener, position)} />
              ) : null}
              {tabBarPosition === 'top' &&
                renderTabBar({
                  ...sceneRendererProps,
                  navigationState
                })}
              {renderContentHeaderComponent}
              {!IOS && renderBackground}
              {render(
                routes.map((route, i) => (
                  <SceneView
                    {...sceneRendererProps}
                    addEnterListener={addEnterListener}
                    key={route.key}
                    index={i}
                    lazy={lazy}
                    lazyPreloadDistance={lazyPreloadDistance}
                    // 只读 routes 与 SceneView 期望的可变数组不兼容
                    navigationState={navigationState as PagerNavigationState<T>}
                    style={sceneContainerStyle}
                  >
                    {({ loading }) => (
                      <>
                        {Math.abs(i - navigationState.index) > keepDistance
                          ? null
                          : loading
                          ? renderLazyPlaceholder({ route })
                          : renderScene({
                              ...sceneRendererProps,
                              route
                            })}
                      </>
                    )}
                  </SceneView>
                ))
              )}
              {IOS && renderBackground}
              {tabBarPosition === 'bottom' &&
                renderTabBar({
                  ...sceneRendererProps,
                  navigationState
                })}
            </Fragment>
          )
        }
      })}
    </GestureHandlerWrapper>
  )
}

const styles = StyleSheet.create({
  pager: {
    flex: 1
  }
})
