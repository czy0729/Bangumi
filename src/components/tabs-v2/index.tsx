/*
 * @Author: czy0729
 * @Date: 2020-09-24 16:31:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 10:00:00
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { Component } from '../component'
import { TabView } from '../tab-view'
import { useRenderScene, useRenderTabBar, useTabWidth } from './hooks'
import { COMPONENT } from './ds'

import type { Props as TabsV2Props, Route } from './types'
export type { TabsV2Props }

/** 通用选项卡 */
export const TabsV2 = observer(
  <T extends Route>({
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

    const renderScene = useRenderScene(routes, renderItem)
    const tabWidth = useTabWidth(routes, tabBarLength)
    const navigationState = useMemo(() => ({ index: page, routes }), [page, routes])
    const renderTabBar = useRenderTabBar({
      tabWidth,
      backgroundColor,
      borderBottomColor,
      underlineColor,
      renderLabel,
      textColor
    })

    return (
      <Component id='component-tabs'>
        <TabView
          lazy={lazy}
          lazyPreloadDistance={0}
          navigationState={navigationState}
          renderScene={renderScene}
          onIndexChange={onChange}
          renderTabBar={renderTabBar}
          {...other}
        />
      </Component>
    )
  }
)

export default TabsV2
