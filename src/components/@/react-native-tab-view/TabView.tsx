/*
 * @Author: czy0729
 * @Date: 2024-11-15 14:30:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-16 21:39:59
 */
import { useCallback, useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Pager } from 'react-native-tab-view/src/Pager'
import { SceneView } from 'react-native-tab-view/src/SceneView'
import { TabBar } from 'react-native-tab-view/src/TabBar'
import { stl } from '@utils/utils'
import { IOS } from '@constants/constants'

import type { ReactNode } from 'react'
import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native'
import type { Layout, PagerProps, Route, SceneRendererProps } from 'react-native-tab-view/src/types'

type OverrideNavigationState<T extends Route> = {
  index: number
  routes: readonly T[]
}

export type Props<T extends Route> = PagerProps & {
  navigationState: OverrideNavigationState<T>
  style?: StyleProp<ViewStyle>
  pagerStyle?: StyleProp<ViewStyle>
  sceneContainerStyle?: StyleProp<ViewStyle>
  tabBarPosition?: 'top' | 'bottom'
  initialLayout?: Partial<Layout>
  lazy?: ((props: { route: T }) => boolean) | boolean
  lazyPreloadDistance?: number
  renderLazyPlaceholder?: (props: { route: T }) => ReactNode
  renderScene: (props: SceneRendererProps & { route: T }) => ReactNode
  renderTabBar?: (
    props: SceneRendererProps & { navigationState: OverrideNavigationState<T> }
  ) => ReactNode
  onIndexChange: (index: number) => void

  /** @add */
  renderContentHeaderComponent?: ReactNode
  renderBackground?: ReactNode
}

export function TabView<T extends Route>({
  style,
  pagerStyle,
  sceneContainerStyle,
  animationEnabled = true,
  initialLayout,
  keyboardDismissMode = 'auto',
  lazy = false,
  lazyPreloadDistance = 0,
  navigationState,
  overScrollMode,
  swipeEnabled = true,
  tabBarPosition = 'top',
  renderLazyPlaceholder = () => null,
  renderScene,
  // @ts-expect-error
  renderTabBar = props => <TabBar {...props} />,
  onIndexChange,
  onSwipeEnd,
  onSwipeStart,

  /** @add */
  renderContentHeaderComponent = null,
  renderBackground = null
}: Props<T>) {
  const overlayOpacity = useRef(new Animated.Value(0)).current

  const [layout, setLayout] = useState<Layout>(() => ({
    width: 0,
    height: 0,
    ...initialLayout
  }))
  const [isSwiping, setIsSwiping] = useState(false)

  const handleIndexChange = useCallback(
    (index: number) => {
      if (index !== navigationState.index) onIndexChange(index)
    },
    [navigationState.index, onIndexChange]
  )

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout
    setLayout(prev => (prev.width === width && prev.height === height ? prev : { width, height }))
  }, [])

  const handleSwipeStart = useCallback(() => {
    setIsSwiping(true)
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true
    }).start()
    onSwipeStart?.()
  }, [onSwipeStart, overlayOpacity])

  const handleSwipeEnd = useCallback(() => {
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true
    }).start()

    setTimeout(() => {
      setIsSwiping(false)
      onSwipeEnd?.()
    }, 120)
  }, [onSwipeEnd, overlayOpacity])

  return (
    <View style={stl(styles.pager, style)} onLayout={handleLayout}>
      <Pager
        style={pagerStyle}
        layout={layout}
        // @ts-expect-error
        navigationState={navigationState}
        keyboardDismissMode={keyboardDismissMode}
        swipeEnabled={swipeEnabled}
        animationEnabled={animationEnabled}
        overScrollMode={overScrollMode}
        onSwipeStart={handleSwipeStart}
        onSwipeEnd={handleSwipeEnd}
        onIndexChange={handleIndexChange}
      >
        {({ position, render, addEnterListener, jumpTo }) => {
          const sceneRendererProps = {
            position,
            layout,
            jumpTo
          }

          return (
            <>
              {tabBarPosition === 'top' &&
                renderTabBar({
                  ...sceneRendererProps,
                  navigationState
                })}
              {renderContentHeaderComponent}
              {!IOS && renderBackground}
              {render(
                navigationState.routes.map((route, i) => (
                  <SceneView
                    key={route.key}
                    {...sceneRendererProps}
                    style={sceneContainerStyle}
                    index={i}
                    lazy={typeof lazy === 'function' ? lazy({ route }) : lazy}
                    lazyPreloadDistance={lazyPreloadDistance}
                    // @ts-expect-error
                    navigationState={navigationState}
                    addEnterListener={addEnterListener}
                  >
                    {({ loading }) =>
                      loading
                        ? renderLazyPlaceholder({ route })
                        : renderScene({
                            ...sceneRendererProps,
                            route
                          })
                    }
                  </SceneView>
                ))
              )}
              {IOS && renderBackground}
              {tabBarPosition === 'bottom' &&
                renderTabBar({
                  ...sceneRendererProps,
                  navigationState
                })}

              {/* 透明遮罩，滑动时拦截点击 */}
              {isSwiping && (
                <Animated.View
                  style={[StyleSheet.absoluteFill, { opacity: overlayOpacity }]}
                  pointerEvents='auto'
                  onTouchStart={e => e.stopPropagation()}
                  onTouchMove={e => e.stopPropagation()}
                  onTouchEnd={e => e.stopPropagation()}
                />
              )}
            </>
          )
        }}
      </Pager>
    </View>
  )
}

const styles = StyleSheet.create({
  pager: {
    height: '100%',
    overflow: 'hidden'
  }
})
