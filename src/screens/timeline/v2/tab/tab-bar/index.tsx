/*
 * @Author: czy0729
 * @Date: 2023-03-18 16:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-18 18:05:00
 */
import React from 'react'
import { TabBar as TabViewTabBar } from '@components'
import { ob } from '@utils/decorators'
import TabBarLabel from '../tab-bar-label'
import { memoStyles } from './styles'

function TabBar(props) {
  const styles = memoStyles()
  return (
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
  )
}

export default ob(TabBar)

function renderLabel({ route, focused }) {
  return <TabBarLabel route={route} focused={focused} />
}
