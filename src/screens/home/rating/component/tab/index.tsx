/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:19:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 11:26:22
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, TabBar, TabView, Text } from '@components'
import { _, useStore } from '@stores'
import { useInsets } from '@utils/hooks'
import { TABS } from '../../ds'
import renderScene from './renderScene'
import { COMPONENT, STATUS_MAP } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Tab() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { headerStyle } = useInsets()

  const { page } = $.state
  const navigationState = useMemo(
    () => ({
      index: page,
      routes: TABS
    }),
    [page]
  )

  const handleRenderLabel = useCallback(
    ({ route, focused }) => {
      const count = $.counts[route.key] || $.params[STATUS_MAP[route.key]]
      const { type } = $.params
      let title = route.title || ''
      if (type === '书籍') title = title.replace('看', '读')
      else if (type === '游戏') title = title.replace('看', '玩')
      else if (type === '音乐') title = title.replace('看', '听')

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
    },
    [$.counts, $.params]
  )

  const styles = memoStyles()

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
    [styles, handleRenderLabel]
  )

  return (
    <TabView
      key={_.orientation}
      style={headerStyle}
      lazyPreloadDistance={0}
      navigationState={navigationState}
      renderTabBar={handleRenderTabBar}
      renderScene={renderScene}
      onIndexChange={$.onChange}
    />
  )
}

export default observer(Tab)
