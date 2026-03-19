/*
 * @Author: czy0729
 * @Date: 2023-12-27 16:27:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 02:03:24
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '../../flex'
import ScrollBar from './scroll-bar'
import TabBarComp from './tab-bar'
import { memoStyles } from './styles'

import type { TabBarProps } from './tab-bar'

function TabBar({ page, TabBarLeft, ...other }: TabBarProps) {
  const styles = memoStyles()

  return (
    <Flex style={styles.container}>
      {!!TabBarLeft && <View style={styles.tabbarLeft}>{TabBarLeft}</View>}
      <Flex.Item>
        <ScrollBar
          style={styles.scrollbar}
          contentContainerStyle={styles.contentContainerStyle}
          page={page}
        >
          <TabBarComp style={styles.tabbar} page={page} {...other} />
        </ScrollBar>
      </Flex.Item>
    </Flex>
  )
}

export default observer(TabBar)
