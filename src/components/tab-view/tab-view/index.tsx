/*
 * @Author: czy0729
 * @Date: 2024-11-15 14:30:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 08:00:00
 */
import { useCallback, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { SceneView } from 'react-native-tab-view/src/SceneView'
import { SceneActiveContext } from '@utils/context'
import { stl } from '@utils/utils'
import { IOS } from '@constants/env'
import { useTabViewIndexChange, useTabViewKeep, useTabViewLayout, useTabViewSwipe } from './hooks'
import { defaultRenderLazyPlaceholder, defaultRenderTabBar, MemoPager } from './utils'
import { styles } from './styles'

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
  keepDistance = Infinity,
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
  const { keepFrom, keepTo, jumpTo, registerJumpTo } = useTabViewKeep({
    index: navigationState.index,
    routes: navigationState.routes,
    keepDistance
  })
  const parentSceneActive = useContext(SceneActiveContext)

  // 子场景渲染函数，仅在依赖变化时重建
  const renderPagerChildren = useCallback(
    ({ position, render, addEnterListener, jumpTo: pagerJumpTo }: PagerChildrenProps) => {
      registerJumpTo(pagerJumpTo)

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
                {({ loading }) => (
                  <SceneActiveContext.Provider
                    value={parentSceneActive && i === navigationState.index}
                  >
                    {/* 超出保活范围的场景只卸载内容, 页容器由 SceneView 保留 */}
                    {i < keepFrom || i > keepTo
                      ? null
                      : loading
                      ? renderLazyPlaceholder({ route })
                      : renderScene({
                          ...sceneRendererProps,
                          route
                        })}
                  </SceneActiveContext.Provider>
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
      renderBackground,
      keepFrom,
      keepTo,
      jumpTo,
      registerJumpTo
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
