/*
 * @Author: czy0729
 * @Date: 2022-03-15 17:19:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:27:34
 */
import React, { useMemo } from 'react'
import { SceneMap } from 'react-native-tab-view'
import { useObserver } from 'mobx-react'
import { Flex, TabBar, TabView, Text } from '@components'
import { _, useStore } from '@stores'
import { c } from '@utils/decorators'
import { r } from '@utils/dev'
import { TABS } from '../../ds'
import { Ctx } from '../../types'
import FavorList from '../favor-list'
import HotList from '../hot-list'
import LocalList from '../local-list'
import ReplyList from '../reply-list'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Tab() {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()
  const renderScene = useMemo(
    () =>
      SceneMap({
        reply: () => <ReplyList />,
        favor: () => <FavorList />,
        hot: () => <HotList />,
        local: () => <LocalList />
      }),
    []
  )

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <TabView
        key={_.orientation}
        lazyPreloadDistance={0}
        navigationState={{
          index: $.state.page,
          routes: TABS
        }}
        renderTabBar={props => (
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
        )}
        renderScene={renderScene}
        onIndexChange={$.onIndexChange}
      />
    )
  })
}

export default c(Tab)
