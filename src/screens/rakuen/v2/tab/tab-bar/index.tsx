/*
 * @Author: czy0729
 * @Date: 2023-03-15 17:58:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-15 18:00:56
 */
import React from 'react'
import TabViewTabBar from '@components/@/react-native-tab-view/TabBar'
import { ob } from '@utils/decorators'
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
    />
  )
}

export default ob(TabBar)
