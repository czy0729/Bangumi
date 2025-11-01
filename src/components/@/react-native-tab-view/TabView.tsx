/*
 * @Author: czy0729
 * @Date: 2024-11-15 14:30:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-28 09:18:06
 */
import * as React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { Pager } from 'react-native-tab-view/src/Pager'
import { SceneView } from 'react-native-tab-view/src/SceneView'
import { TabBar } from 'react-native-tab-view/src/TabBar'
import { IOS } from '@constants'

import type { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native'
import type { Layout, PagerProps, Route, SceneRendererProps } from 'react-native-tab-view/src/types'

export type NavigationState<T extends Route> = {
  index: number
  routes: readonly T[]
}

export type Props<T extends Route> = PagerProps & {
  navigationState: NavigationState<T>
  style?: StyleProp<ViewStyle>
  pagerStyle?: StyleProp<ViewStyle>
  sceneContainerStyle?: StyleProp<ViewStyle>
  tabBarPosition?: 'top' | 'bottom'
  initialLayout?: Partial<Layout>
  lazy?: ((props: { route: T }) => boolean) | boolean
  lazyPreloadDistance?: number
  renderLazyPlaceholder?: (props: { route: T }) => React.ReactNode
  renderScene: (props: SceneRendererProps & { route: T }) => React.ReactNode
  renderTabBar?: (
    props: SceneRendererProps & { navigationState: NavigationState<T> }
  ) => React.ReactNode
  onIndexChange: (index: number) => void

  /** @add */
  renderContentHeaderComponent?: React.ReactNode
  renderBackground?: React.ReactNode
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
  renderTabBar = props => <TabBar {...props} />,
  onIndexChange,
  onSwipeEnd,
  onSwipeStart,

  /** @add */
  renderContentHeaderComponent = null,
  renderBackground = null
}: Props<T>) {
  const [layout, setLayout] = React.useState({
    width: 0,
    height: 0,
    ...initialLayout
  })

  const [isSwiping, setIsSwiping] = React.useState(false)
  const overlayOpacity = React.useRef(new Animated.Value(0)).current

  const jumpToIndex = (index: number) => {
    if (index !== navigationState.index) {
      onIndexChange(index)
    }
  }

  const handleLayout = (e: LayoutChangeEvent) => {
    const { height, width } = e.nativeEvent.layout

    setLayout(prevLayout => {
      if (prevLayout.width === width && prevLayout.height === height) {
        return prevLayout
      }

      return { height, width }
    })
  }

  const handleSwipeStart = React.useCallback(() => {
    setIsSwiping(true)
    Animated.timing(overlayOpacity, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true
    }).start()
    onSwipeStart?.()
  }, [onSwipeStart, overlayOpacity])

  const handleSwipeEnd = React.useCallback(() => {
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true
    }).start(({ finished }) => {
      if (finished) setIsSwiping(false)
    })
    onSwipeEnd?.()
  }, [onSwipeEnd, overlayOpacity])

  return (
    <View style={[styles.pager, style]} onLayout={handleLayout}>
      <Pager
        style={pagerStyle}
        layout={layout}
        navigationState={navigationState}
        keyboardDismissMode={keyboardDismissMode}
        swipeEnabled={swipeEnabled}
        animationEnabled={animationEnabled}
        overScrollMode={overScrollMode}
        onSwipeStart={handleSwipeStart}
        onSwipeEnd={handleSwipeEnd}
        onIndexChange={jumpToIndex}
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
