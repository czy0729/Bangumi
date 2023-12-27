/*
 * @Author: czy0729
 * @Date: 2023-12-27 16:27:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-27 17:26:44
 */
import React from 'react'
import { ScrollBar } from './scroll-bar'
import { TabBar as TabBarComp, TabBarProps } from './tab-bar'
import { styles } from './styles'

export function TabBar(props: TabBarProps) {
  return (
    <ScrollBar
      page={props.page}
      style={styles.scrollbar}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <TabBarComp style={styles.tabbar} tabStyle={styles.tab} {...props} />
    </ScrollBar>
  )
}
