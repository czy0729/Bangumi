/*
 * @Author: czy0729
 * @Date: 2023-03-15 17:58:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-17 11:39:36
 */
import React from 'react'
import { TabBar as TabViewTabBar } from '@components'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { renderLabel } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function TabBar(props) {
  r(COMPONENT)

  return useObserver(() => {
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
  })
}

export default TabBar
