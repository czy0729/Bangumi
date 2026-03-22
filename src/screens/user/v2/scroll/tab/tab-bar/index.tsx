/*
 * @Author: czy0729
 * @Date: 2023-03-19 16:08:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 06:19:29
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, TabBar as TabViewTabBar } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import FixedToolBar from '../../../component/fixed-tool-bar'
import { renderLabel } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function TabBar(props) {
  r(COMPONENT)

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

export default observer(TabBar)
