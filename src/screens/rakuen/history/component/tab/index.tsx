/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:19:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-31 05:23:42
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, TabBar, TabView, Text } from '@components'
import { _, useStore } from '@stores'
import { useInsets } from '@utils/hooks'
import { TABS } from '../../ds'
import renderScene from './renderScene'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Tab() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerStyle } = useInsets()

  const styles = memoStyles()
  const { page } = $.state

  const navigationState = useMemo(
    () => ({
      index: page,
      routes: TABS
    }),
    [page]
  )

  const listLength = $.list.length
  const keysLength = $.keys.length
  const handleRenderLabel = useCallback(
    ({ route, focused }) => {
      const { title } = route
      let count: number
      if (title === '收藏') {
        count = listLength
      } else if (title === '缓存') {
        count = keysLength
      }

      return (
        <Flex style={_.container.block} justify='center'>
          <Text type='title' size={13} bold={focused} noWrap>
            {title}
          </Text>
          {!!count && (
            <Text type='sub' size={11} bold lineHeight={13} noWrap>
              {' '}
              {count}{' '}
            </Text>
          )}
        </Flex>
      )
    },
    [keysLength, listLength]
  )

  const handleRenderTabBar = useCallback(
    props => (
      <TabBar
        {...props}
        style={styles.tabBar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
        indicatorStyle={styles.indicator}
        pressOpacity={1}
        pressColor='transparent'
        renderLabel={handleRenderLabel}
      />
    ),
    [handleRenderLabel, styles]
  )

  return (
    <TabView
      key={_.orientation}
      style={headerStyle}
      lazyPreloadDistance={0}
      navigationState={navigationState}
      renderTabBar={handleRenderTabBar}
      renderScene={renderScene}
      onIndexChange={$.onIndexChange}
    />
  )
}

export default observer(Tab)
