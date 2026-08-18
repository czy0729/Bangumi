/*
 * @Author: czy0729
 * @Date: 2026-08-18 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 10:00:00
 */
import { useCallback, useMemo } from 'react'
import { _ } from '@stores'
import { stl } from '@utils'
import { SceneMap, TabBar } from '../tab-view'
import TabLabel from './label'
import { createScenes, getTabWidth } from './utils'
import { ANDROID_RIPPLE } from './ds'
import { memoStyles, W_INDICATOR } from './styles'

import type { Label, Route, TabBarSceneProps, UseRenderTabBarOptions } from './types'

/** 渲染场景, 依赖变化时重建 */
export function useRenderScene<T extends Route>(
  routes: readonly T[],
  renderItem: (item: T, index?: number) => JSX.Element
) {
  return useMemo(() => SceneMap(createScenes(routes, renderItem)), [renderItem, routes])
}

/** Tab 宽度 */
export function useTabWidth(routes: readonly Route[], tabBarLength?: number) {
  return useMemo(
    () => getTabWidth(tabBarLength ?? routes.length, _.window.width),
    [routes.length, tabBarLength]
  )
}

/** TabBar 渲染, 依赖变化时重建稳定回调 */
export function useRenderTabBar<T extends Route>({
  tabWidth,
  backgroundColor,
  borderBottomColor,
  underlineColor,
  renderLabel,
  textColor
}: UseRenderTabBarOptions<T>) {
  const styles = memoStyles()

  const defaultRenderLabel = useCallback(
    (item: Label<T>) => <TabLabel {...item} textColor={textColor} />,
    [textColor]
  )

  return useCallback(
    ({ layout, position, jumpTo, navigationState }: TabBarSceneProps<T>) => (
      <TabBar
        layout={layout}
        position={position}
        jumpTo={jumpTo}
        navigationState={{ ...navigationState, routes: [...navigationState.routes] as T[] }}
        style={stl(
          styles.tabBar,
          backgroundColor && { backgroundColor },
          borderBottomColor && { borderBottomColor }
        )}
        tabStyle={stl(styles.tab, { width: tabWidth })}
        labelStyle={styles.label}
        indicatorStyle={stl(
          styles.indicator,
          { marginLeft: (tabWidth - W_INDICATOR) / 2 },
          underlineColor && { backgroundColor: underlineColor }
        )}
        pressOpacity={1}
        pressColor='transparent'
        scrollEnabled
        android_ripple={ANDROID_RIPPLE}
        renderLabel={renderLabel ?? defaultRenderLabel}
      />
    ),
    [
      styles,
      tabWidth,
      backgroundColor,
      borderBottomColor,
      underlineColor,
      renderLabel,
      defaultRenderLabel
    ]
  )
}
