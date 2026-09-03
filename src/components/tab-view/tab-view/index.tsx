/*
 * @Author: czy0729
 * @Date: 2024-11-15 14:30:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 22:00:00
 */
import { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { SceneView } from 'react-native-tab-view/src/SceneView'
import { stl } from '@utils/utils'
import { IOS } from '@constants/env'
import { useTabViewIndexChange, useTabViewLayout, useTabViewSwipe } from './hooks'
import { styles } from './styles'
import { defaultRenderLazyPlaceholder, defaultRenderTabBar, MemoPager } from './utils'

import type { Route } from 'react-native-tab-view/src/types'
import type { PagerChildrenProps, Props } from './types'
export type { Props }

export default function TabView<T extends Route>({
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
  renderLazyPlaceholder = defaultRenderLazyPlaceholder,
  renderScene,
  renderTabBar = defaultRenderTabBar,
  onIndexChange,
  onSwipeEnd,
  onSwipeStart,
  renderContentHeaderComponent = null,
  renderBackground = null
}: Props<T>) {
  const { layout, handleLayout } = useTabViewLayout(initialLayout)
  const handleIndexChange = useTabViewIndexChange(navigationState.index, onIndexChange)
  const { isSwiping, handleSwipeStart, handleSwipeSettle, handleSwipeEnd } = useTabViewSwipe({
    onSwipeStart,
    onSwipeEnd
  })

  // 子场景渲染函数，仅在依赖变化时重建
  const renderPagerChildren = useCallback(
    ({ position, render, addEnterListener, jumpTo }: PagerChildrenProps) => {
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
        </>
      )
    },
    [
      layout,
      navigationState,
      tabBarPosition,
      renderTabBar,
      renderScene,
      renderLazyPlaceholder,
      lazy,
      lazyPreloadDistance,
      sceneContainerStyle,
      renderContentHeaderComponent,
      renderBackground
    ]
  )

  return (
    <View style={stl(styles.pager, style)} onLayout={handleLayout}>
      <MemoPager
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
        onSwipeSettle={handleSwipeSettle}
        onIndexChange={handleIndexChange}
      >
        {renderPagerChildren}
      </MemoPager>

      {/* 透明遮罩，滑动时拦截点击（独立于 Pager 子树，避免触发场景重渲染） */}
      {isSwiping && (
        <View
          style={StyleSheet.absoluteFill}
          pointerEvents='auto'
          onTouchStart={e => e.stopPropagation()}
          onTouchMove={e => e.stopPropagation()}
          onTouchEnd={e => e.stopPropagation()}
        />
      )}
    </View>
  )
}
