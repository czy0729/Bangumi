/*
 * @Author: czy0729
 * @Date: 2023-03-19 16:08:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-19 16:35:44
 */
import React from 'react'
import { TabBar as TabViewTabBar, Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import FixedToolBar from '../../fixed-tool-bar'
import Label from '../label'
import { memoStyles } from './styles'

function TabBar(props) {
  global.rerender('User.TabBar')

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

export default ob(TabBar)

function renderLabel({ route, focused }) {
  return <Label title={route.title} focused={focused} />
}
