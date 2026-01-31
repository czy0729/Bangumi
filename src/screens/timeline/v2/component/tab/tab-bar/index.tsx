/*
 * @Author: czy0729
 * @Date: 2023-03-18 16:34:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-31 14:52:42
 */
import React from 'react'
import { TabBar as TabViewTabBar } from '@components'
import { r } from '@utils/dev'
import { useInsets, useObserver } from '@utils/hooks'
import { renderLabel } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function TabBar(props) {
  r(COMPONENT)

  const { headerHeight } = useInsets()

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <TabViewTabBar
        {...props}
        style={[
          styles.tabBar,
          {
            top: headerHeight
          }
        ]}
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
