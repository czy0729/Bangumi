/*
 * @Author: czy0729
 * @Date: 2024-11-15 14:30:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 16:05:11
 */
import * as React from 'react'
import { LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { Pager } from 'react-native-tab-view/src/Pager'
import { SceneView } from 'react-native-tab-view/src/SceneView'
import { TabBar } from 'react-native-tab-view/src/TabBar'
import { IOS } from '@constants'

import type {
  Layout,
  NavigationState,
  PagerProps,
  Route,
  SceneRendererProps
} from 'react-native-tab-view/src/types'

export type Props<T extends Route> = PagerProps & {
  onIndexChange: (index: number) => void
  navigationState: NavigationState<T>
  renderScene: (props: SceneRendererProps & { route: T }) => React.ReactNode
  renderLazyPlaceholder?: (props: { route: T }) => React.ReactNode
  renderTabBar?: (
    props: SceneRendererProps & { navigationState: NavigationState<T> }
  ) => React.ReactNode
  tabBarPosition?: 'top' | 'bottom'
  initialLayout?: Partial<Layout>
  lazy?: ((props: { route: T }) => boolean) | boolean
  lazyPreloadDistance?: number
  sceneContainerStyle?: StyleProp<ViewStyle>
  pagerStyle?: StyleProp<ViewStyle>
  style?: StyleProp<ViewStyle>

  /** @add */
  renderContentHeaderComponent?: React.ReactNode
  renderBackground?: React.ReactNode
}

export function TabView<T extends Route>({
  onIndexChange,
  navigationState,
  renderScene,
  initialLayout,
  keyboardDismissMode = 'auto',
  lazy = false,
  lazyPreloadDistance = 0,
  onSwipeStart,
  onSwipeEnd,
  renderLazyPlaceholder = () => null,
  renderTabBar = props => <TabBar {...props} />,
  sceneContainerStyle,
  pagerStyle,
  style,
  swipeEnabled = true,
  tabBarPosition = 'top',
  animationEnabled = true,
  overScrollMode,

  /** @add */
  renderContentHeaderComponent = null,
  renderBackground = null
}: Props<T>) {
  const [layout, setLayout] = React.useState({
    width: 0,
    height: 0,
    ...initialLayout
  })

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
        onSwipeStart={onSwipeStart}
        onSwipeEnd={onSwipeEnd}
        onIndexChange={jumpToIndex}
      >
        {({ position, render, addEnterListener, jumpTo }) => {
          // All of the props here must not change between re-renders
          // This is crucial to optimizing the routes with PureComponent
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
    // flex: 1,
    overflow: 'hidden'
  }
})
