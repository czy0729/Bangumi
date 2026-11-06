/*
 * @Author: czy0729
 * @Date: 2023-03-19 16:08:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-06 18:20:00
 *
 * 收藏分类 TabBar
 */
import { observer } from 'mobx-react'
import { Heatmap, TabBar as TabViewTabBar } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import FixedToolBar from '../../../component/fixed-tool-bar'
import { renderLabel } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { TabBarProps } from '@components'
import type { RenderTabBarProps, TabBarRoute } from '../types'

function TabBar({ navigationState, ...other }: RenderTabBarProps) {
  r(COMPONENT)

  const styles = memoStyles()

  return (
    <>
      <TabViewTabBar
        {...other}
        // OverrideNavigationState 的 routes 声明为 readonly, 运行时就是 TABS 数组
        navigationState={navigationState as TabBarProps<TabBarRoute>['navigationState']}
        style={styles.tabBar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
        indicatorStyle={styles.indicator}
        pressOpacity={1}
        pressColor='transparent'
        scrollEnabled
        renderLabel={renderLabel}
      />
      <FixedToolBar fixed />
      <Heatmap right={_.wind + 62} id='我的.标签页切换' transparent />
      <Heatmap right={_.wind} id='我的.标签页点击' transparent />
    </>
  )
}

export default observer(TabBar)
