/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-14 03:50:18
 */
import React, { useCallback, useMemo } from 'react'
import { Animated } from 'react-native'
import { Flex, SceneMap, TabBar, TabView } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { H_HEADER } from '../../store'
import About from '../about'
import BangumiList from '../bangumi-list'
import ListHeader from '../list-header'
import RakuenList from '../rakuen-list'
import Stats from '../stats'
import TabBarLabel from '../tab-bar-label'
import TimelineList from '../timeline-list'
import Tinygrail from '../tinygrail'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { ScrollEvent } from '@types'
import type { Ctx } from '../../types'

function Tab() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleScroll = useCallback(
    (e: ScrollEvent) => {
      $.onScroll(e)
    },
    [$]
  )

  const renderScene = useMemo(
    () =>
      SceneMap({
        bangumi: () => <BangumiList ListHeaderComponent={ListHeader} onScroll={handleScroll} />,
        stats: () => <Stats ListHeaderComponent={ListHeader} onScroll={handleScroll} />,
        timeline: () => <TimelineList ListHeaderComponent={ListHeader} onScroll={handleScroll} />,
        rakuen: () => <RakuenList ListHeaderComponent={ListHeader} onScroll={handleScroll} />,
        about: () => <About onScroll={handleScroll} />,
        tinygrail: () => <Tinygrail onScroll={handleScroll} />
      }),
    [handleScroll]
  )

  const handleSwipeStart = useCallback(() => {
    $.updatePageOffset()
  }, [$])
  const handleIndexChange = useCallback(
    (index: number) => {
      $.onTabChange(index)
      setTimeout(() => {
        $.updatePageOffset([0])
      }, 0)
    },
    [$]
  )

  return useObserver(() => {
    const styles = memoStyles()

    const { tabs } = $
    const { page } = $.state

    const navigationState = useMemo(
      () => ({
        index: page,
        routes: tabs
      }),
      [page, tabs]
    )
    const transform = useMemo(
      () => ({
        transform: [
          {
            translateY: $.scrollY.interpolate({
              inputRange: [
                -_.parallaxImageHeight,
                0,
                _.parallaxImageHeight - H_HEADER,
                _.parallaxImageHeight
              ],
              outputRange: [_.parallaxImageHeight * 2, _.parallaxImageHeight, H_HEADER, H_HEADER]
            })
          }
        ]
      }),
      []
    )

    const handleRenderLabel = useCallback(
      ({ route }) => (
        <Flex style={styles.labelText} justify='center'>
          <TabBarLabel title={route.title} />
        </Flex>
      ),
      [styles]
    )
    const handleRenderTabBar = useCallback(
      props => {
        const width = _.window.width / $.tabs.length

        return (
          <Animated.View style={[styles.tabBarWrap, transform]}>
            <TabBar
              {...props}
              style={styles.tabBar}
              tabStyle={[
                styles.tab,
                {
                  width
                }
              ]}
              labelStyle={styles.label}
              indicatorStyle={[
                styles.indicator,
                {
                  marginLeft: (width - styles.indicator.width) / 2
                }
              ]}
              pressOpacity={1}
              pressColor='transparent'
              scrollEnabled
              renderLabel={handleRenderLabel}
            />
          </Animated.View>
        )
      },
      [styles, transform, handleRenderLabel]
    )

    return (
      <TabView
        key={_.orientation}
        lazy
        lazyPreloadDistance={0}
        navigationState={navigationState}
        renderTabBar={handleRenderTabBar}
        renderScene={renderScene}
        onSwipeStart={handleSwipeStart}
        onIndexChange={handleIndexChange}
      />
    )
  })
}

export default Tab
