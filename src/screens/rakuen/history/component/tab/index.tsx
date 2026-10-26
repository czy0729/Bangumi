/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:19:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-26 00:00:00
 *
 * Tab 容器: 导航状态与场景渲染
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { TabView } from '@components'
import { _, useStore } from '@stores'
import { useInsets } from '@utils/hooks'
import { TABS } from '../../ds'
import renderScene from './renderScene'
import TabBar from './tab-bar'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { RenderTabBar } from './types'

function Tab() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerStyle } = useInsets()
  const { page } = $.state

  const navigationState = useMemo(
    () => ({
      index: page,
      routes: TABS
    }),
    [page]
  )

  const handleRenderTabBar = useCallback<RenderTabBar>(
    props => <TabBar {...props} />,
    []
  )

  return (
    <TabView
      key={_.orientation}
      style={headerStyle}
      lazyPreloadDistance={0}
      navigationState={navigationState}
      renderTabBar={handleRenderTabBar}
      renderScene={renderScene}
      onIndexChange={$.onIndexChange}
    />
  )
}

export default observer(Tab)
