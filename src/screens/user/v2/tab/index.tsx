/*
 * @Author: czy0729
 * @Date: 2023-03-19 04:52:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-20 17:04:43
 */
import React, { useCallback, useMemo, useRef } from 'react'
import { Animated } from 'react-native'
import { TabView, SceneMap } from '@components'
import { _ } from '@stores'
import { rerender } from '@utils/dev'
import List from '../list'
import { H_HEADER, TABS } from '../ds'
import TabBar from './tab-bar'
import TabBarLeft from './tab-bar-left'
import { styles } from './styles'

function Tab({
  page,
  scrollY,
  onIndexChange,
  onScroll,
  onSelectSubjectType,
  onSwipeStart,
  onRefreshOffset
}) {
  rerender('User.Tab')

  const renderScene = useRef(
    SceneMap(
      Object.assign(
        {},
        ...TABS.map(({ key, title }, index) => ({
          [key]: () => (
            <List
              page={index}
              title={title}
              scrollY={scrollY}
              onScroll={onScroll}
              onRefreshOffset={onRefreshOffset}
            />
          )
        }))
      )
    )
  )
  const navigationState = useMemo(
    () => ({
      index: page,
      routes: TABS
    }),
    [page]
  )
  const transform = useMemo(
    () => ({
      transform: [
        {
          translateY: scrollY.interpolate({
            inputRange: [
              -_.parallaxImageHeight,
              0,
              _.parallaxImageHeight - H_HEADER,
              _.parallaxImageHeight
            ],
            outputRange: [
              _.parallaxImageHeight * 2,
              _.parallaxImageHeight,
              H_HEADER,
              H_HEADER
            ]
          })
        }
      ]
    }),
    [scrollY]
  )

  const renderTabBar = useCallback(
    props => {
      return (
        // @ts-expect-error
        <Animated.View style={[styles.tabBarWrap, transform]}>
          <TabBar {...props} />
        </Animated.View>
      )
    },
    [transform]
  )
  const onSelect = useCallback(
    (title: string) => {
      onSelectSubjectType(title)
    },
    [onSelectSubjectType]
  )

  return (
    <>
      <TabView
        key={_.orientation}
        lazy
        lazyPreloadDistance={0}
        navigationState={navigationState}
        renderTabBar={renderTabBar}
        renderScene={renderScene.current}
        onSwipeStart={onSwipeStart}
        onIndexChange={onIndexChange}
      />
      {/* @ts-expect-error */}
      <Animated.View style={[styles.tabBarLeft, transform]}>
        <TabBarLeft onSelect={onSelect} />
      </Animated.View>
    </>
  )
}

export default Tab
