/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:19:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-03 18:13:59
 */
import React, { useCallback, useMemo } from 'react'
import { Flex, TabBar, TabView, Text } from '@components'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import renderScene from './renderScene'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Tab() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const { page } = $.state
  const styles = memoStyles()
  const navigationState = useMemo(
    () => ({
      index: page,
      routes: TABS
    }),
    [page]
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
        renderLabel={({ route, focused }) => {
          const { title } = route
          let count: number
          if (title === '收藏') {
            count = $.list.length
          } else if (title === '缓存') {
            count = $.keys.length
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
        }}
      />
    ),
    [$, styles]
  )

  return useObserver(() => (
    <TabView
      key={_.orientation}
      style={_.container.header}
      lazyPreloadDistance={0}
      navigationState={navigationState}
      renderTabBar={handleRenderTabBar}
      renderScene={renderScene}
      onIndexChange={$.onIndexChange}
    />
  ))
}

export default Tab
