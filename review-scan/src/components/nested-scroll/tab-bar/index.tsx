/*
 * @Author: czy0729
 * @Date: 2023-12-27 16:27:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-07 20:35:40
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { Flex } from '../../flex'
import { ScrollBar } from './scroll-bar'
import { TabBar as TabBarComp, TabBarProps } from './tab-bar'
import { memoStyles } from './styles'

export function TabBar({ page, TabBarLeft, ...other }: TabBarProps) {
  return useObserver(() => {
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
  })
}
