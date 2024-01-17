/*
 * @Author: czy0729
 * @Date: 2024-01-16 18:26:04
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-16 18:26:04
 */
import * as React from 'react'
import { LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import Pager, { Props as ChildProps } from 'react-native-tab-view/src/Pager'
import TabBar, { Props as TabBarProps } from 'react-native-tab-view/src/TabBar'
import {
  Layout,
  PagerCommonProps,
  Route,
  SceneRendererProps
} from 'react-native-tab-view/src/types'
import { stl } from '@utils'
import { IOS } from '@constants'
import SceneView from './SceneView'

type NavigationState<T extends Route> = {
  index: number
  routes: T[] | readonly T[]
}

export type Props<T extends Route> = PagerCommonProps & {
  position?: Animated.Value<number>
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
  renderPager: (props: ChildProps<T>) => React.ReactNode

  /** @add */
  renderContentHeaderComponent?: React.ReactNode
  renderBackground?: React.ReactNode
}

type State = {
  layout: Layout
}

const GestureHandlerWrapper = GestureHandlerRootView ?? View

class TabView<T extends Route> extends React.Component<Props<T>, State> {
  static defaultProps = {
    tabBarPosition: 'top',
    renderTabBar: <P extends Route>(props: TabBarProps<P>) => <TabBar {...props} />,
    renderLazyPlaceholder: () => null,
    keyboardDismissMode: 'auto',
    swipeEnabled: true,
    lazy: false,
    lazyPreloadDistance: 0,
    removeClippedSubviews: !IOS,
    springConfig: {},
    timingConfig: {},
    gestureHandlerProps: {},
    renderPager: (props: ChildProps<any>) => <Pager {...props} />,

    /** @add */
    renderBackground: null
  }

  state = {
    layout: { width: 0, height: 0, ...this.props.initialLayout }
  }

  private jumpToIndex = (index: number) => {
    if (index !== this.props.navigationState.index) {
      this.props.onIndexChange(index)
    }
  }

  private handleLayout = (e: LayoutChangeEvent) => {
    const { height, width } = e.nativeEvent.layout

    if (this.state.layout.width === width && this.state.layout.height === height) {
      return
    }

    this.setState({
      layout: {
        height,
        width
      }
    })
  }

  render() {
    const {
      position: positionListener,
      onSwipeStart,
      onSwipeEnd,
      navigationState,
      lazy,
      lazyPreloadDistance,
      removeClippedSubviews,
      keyboardDismissMode,
      swipeEnabled,
      swipeVelocityImpact,
      timingConfig,
      springConfig,
      tabBarPosition,
      renderTabBar,
      renderScene,
      renderLazyPlaceholder,
      sceneContainerStyle,
      style,
      gestureHandlerProps,
      springVelocityScale,
      renderPager,

      /** @add */
      renderContentHeaderComponent,
      renderBackground
    } = this.props
    const { layout } = this.state

    return (
      <GestureHandlerWrapper style={stl(styles.pager, style)} onLayout={this.handleLayout}>
        {renderPager({
          // @ts-expect-error
          navigationState,
          layout,
          keyboardDismissMode,
          swipeEnabled,
          swipeVelocityImpact,
          timingConfig,
          springConfig,
          onSwipeStart,
          onSwipeEnd,
          onIndexChange: this.jumpToIndex,
          springVelocityScale,
          removeClippedSubviews,
          gestureHandlerProps,
          children: ({ position, render, addListener, removeListener, jumpTo }) => {
            // All of the props here must not change between re-renders
            // This is crucial to optimizing the routes with PureComponent
            const sceneRendererProps = {
              position,
              layout,
              jumpTo
            }

            const { routes } = navigationState
            return (
              <React.Fragment>
                {positionListener ? (
                  <Animated.Code exec={Animated.set(positionListener, position)} />
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
                      addListener={addListener}
                      removeListener={removeListener}
                      key={route.key}
                      index={i}
                      lazy={lazy}
                      lazyPreloadDistance={lazyPreloadDistance}
                      // @ts-expect-error
                      navigationState={navigationState}
                      style={sceneContainerStyle}
                    >
                      {({ loading }) => (
                        <>
                          {loading
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
              </React.Fragment>
            )
          }
        })}
      </GestureHandlerWrapper>
    )
  }
}

export { TabView }

const styles = StyleSheet.create({
  pager: {
    flex: 1
  }
})
