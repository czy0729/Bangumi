/*
 * @Author: czy0729
 * @Date: 2020-09-24 16:31:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-16 17:15:36
 */
import React, { useCallback, useMemo } from 'react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Component } from '../component'
import { SceneMap, TabBar, TabView } from '../@/react-native-tab-view'
import { Flex } from '../flex'
import { Text } from '../text'
import { ANDROID_RIPPLE, COMPONENT } from './ds'
import { memoStyles, W_INDICATOR } from './styles'

import type { Props as TabsV2Props, Route } from './types'

export { TabView, TabBar, SceneMap }

export type { TabsV2Props }

/** 通用选项卡 */
export const TabsV2 = <T extends Route>({
  routes = [],
  tabBarLength,
  page = 0,
  lazy = true,
  textColor,
  backgroundColor,
  borderBottomColor,
  underlineColor,
  renderItem,
  renderLabel,
  onChange = FROZEN_FN,
  ...other
}: TabsV2Props<T>) => {
  r(COMPONENT)

  const styles = memoStyles()

  const renderScene = useMemo(() => {
    const map: Record<string, () => JSX.Element> = {}
    routes.forEach((route, index) => {
      if (route.key) {
        map[route.key] = () => renderItem(route, index)
      }
    })

    return SceneMap(map)
  }, [routes, renderItem])

  const tabWidth = useMemo(() => {
    const length = tabBarLength ?? routes.length
    return length >= 10 ? _.window.width / 3.6 : _.window.width / length
  }, [tabBarLength, routes.length])

  const handleRenderLabel = useCallback(
    ({ route, focused }: { route: Route; focused: boolean }) => (
      <Flex style={styles.labelText} justify='center'>
        <Text style={textColor && { color: textColor }} type='title' size={13} bold={focused}>
          {route.title}
        </Text>
      </Flex>
    ),
    [styles.labelText, textColor]
  )

  return (
    <Component id='component-tabs'>
      <TabView
        lazy={lazy}
        lazyPreloadDistance={0}
        navigationState={{
          index: page,
          routes
        }}
        renderScene={renderScene}
        onIndexChange={onChange}
        renderTabBar={props => (
          // @ts-expect-error
          <TabBar
            {...props}
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
            renderLabel={renderLabel ?? handleRenderLabel}
          />
        )}
        {...other}
      />
    </Component>
  )
}

export default TabsV2
