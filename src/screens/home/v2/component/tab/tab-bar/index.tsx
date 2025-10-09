/*
 * @Author: czy0729
 * @Date: 2023-03-26 03:40:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:54:37
 */
import React from 'react'
import { TabBar as TabViewTabBar } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import TabBarLabel from '../tab-bar-label'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function TabBar(props) {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()
    const W_TAB = _.window.width / props.navigationState.routes.length

    return (
      <TabViewTabBar
        {...props}
        style={styles.tabBar}
        tabStyle={[
          styles.tab,
          {
            width: W_TAB
          }
        ]}
        labelStyle={styles.label}
        indicatorStyle={[
          styles.indicator,
          {
            marginLeft: (W_TAB - styles.indicator.width) / 2
          }
        ]}
        pressOpacity={1}
        pressColor='transparent'
        scrollEnabled
        renderLabel={renderLabel}
      />
    )
  })
}

export default TabBar

function renderLabel({ route, focused }) {
  return <TabBarLabel route={route} focused={focused} />
}
