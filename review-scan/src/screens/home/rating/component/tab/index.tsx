/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:19:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-03 18:14:42
 */
import React, { useCallback, useMemo } from 'react'
import { Flex, TabBar, TabView, Text } from '@components'
import { _, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import renderScene from './renderScene'
import { COMPONENT, STATUS_MAP } from './ds'
import { memoStyles } from './styles'

function Tab() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const styles = memoStyles()
  const { page } = $.state
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
        key={Object.keys($.counts) ? '1' : '0'}
        style={styles.tabBar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
        indicatorStyle={styles.indicator}
        pressOpacity={1}
        pressColor='transparent'
        renderLabel={({ route, focused }) => {
          const count = $.counts[route.key] || $.params[STATUS_MAP[route.key]]
          const { type } = $.params
          let title = route.title || ''
          if (type === '书籍') {
            title = title.replace('看', '读')
          } else if (type === '游戏') {
            title = title.replace('看', '玩')
          } else if (type === '音乐') {
            title = title.replace('看', '听')
          }

          return (
            <Flex style={_.container.block} justify='center'>
              <Text type='title' size={13} bold={focused} noWrap>
                {title}
              </Text>
              {!!count && (
                <Text style={_.ml.xxs} type='sub' size={11} bold lineHeight={13} noWrap>
                  {count}
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
      onIndexChange={$.onChange}
    />
  ))
}

export default Tab
