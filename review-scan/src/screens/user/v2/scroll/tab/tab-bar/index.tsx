/*
 * @Author: czy0729
 * @Date: 2023-03-19 16:08:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 11:53:45
 */
import React from 'react'
import { TabBar as TabViewTabBar, Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import FixedToolBar from '../../../component/fixed-tool-bar'
import TabBarLabel from '../../../component/tab-bar-label'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function TabBar(props) {
  const styles = memoStyles()
  return (
    <>
      <TabViewTabBar
        {...props}
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

export default ob(TabBar, COMPONENT)

function renderLabel({ route, focused }) {
  return <TabBarLabel title={route.title} focused={focused} />
}
