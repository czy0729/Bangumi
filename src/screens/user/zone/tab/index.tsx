/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-03 07:12:00
 */
import React from 'react'
import { Animated } from 'react-native'
import { SceneMap } from 'react-native-tab-view'
import TabBar from '@components/@/react-native-tab-view/TabBar'
import TabView from '@components/@/react-native-tab-view/TabView'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Fn } from '@types'
import ListHeader from '../list-header'
import BangumiList from '../bangumi-list'
import Stats from '../stats'
import TimelineList from '../timeline-list'
import RakuenList from '../rakuen-list'
import About from '../about'
import Tinygrail from '../tinygrail'
import { H_HEADER } from '../store'
import { Ctx } from '../types'
import { memoStyles } from './styles'

class Tab extends React.Component<{
  scrollEventThrottle: number
  onIndexChange: Fn
  onScroll: Fn
  onSwipeStart: Fn
}> {
  onIndexChange = (index: number) => {
    const { $ }: Ctx = this.context
    const { onIndexChange } = this.props
    onIndexChange(index)
    $.onTabChange(index)
  }

  renderScene = SceneMap({
    bangumi: () => (
      <BangumiList
        ListHeaderComponent={ListHeader}
        scrollEventThrottle={16}
        onScroll={this.props.onScroll}
      />
    ),
    stats: () => (
      <Stats
        ListHeaderComponent={ListHeader}
        scrollEventThrottle={16}
        onScroll={this.props.onScroll}
      />
    ),
    timeline: () => (
      <TimelineList
        ListHeaderComponent={ListHeader}
        scrollEventThrottle={16}
        onScroll={this.props.onScroll}
      />
    ),
    rakuen: () => (
      <RakuenList
        ListHeaderComponent={ListHeader}
        scrollEventThrottle={16}
        onScroll={this.props.onScroll}
      />
    ),
    about: () => (
      <About
        ListHeaderComponent={ListHeader}
        scrollEventThrottle={16}
        onScroll={this.props.onScroll}
      />
    ),
    tinygrail: () => (
      <Tinygrail
        ListHeaderComponent={ListHeader}
        scrollEventThrottle={16}
        onScroll={this.props.onScroll}
      />
    )
  })

  get navigationState() {
    const { $ }: Ctx = this.context
    const { page } = $.state
    return {
      index: page,
      routes: $.tabs
    }
  }

  get transform() {
    const { $ }: Ctx = this.context
    return {
      transform: [
        {
          translateY: $.scrollY.interpolate({
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
    }
  }

  renderLabel = ({ route, focused }) => (
    <Flex style={this.styles.labelText} justify='center'>
      <Text type='title' size={13} bold={focused}>
        {route.title}
      </Text>
    </Flex>
  )

  renderTabBar = props => {
    const { $ }: Ctx = this.context
    const width = _.window.width / $.tabs.length
    return (
      <Animated.View style={[this.styles.tabBarWrap, this.transform]}>
        <TabBar
          {...props}
          style={this.styles.tabBar}
          tabStyle={[
            this.styles.tab,
            {
              width
            }
          ]}
          labelStyle={this.styles.label}
          indicatorStyle={[
            this.styles.indicator,
            {
              marginLeft: (width - this.styles.indicator.width) / 2
            }
          ]}
          pressOpacity={1}
          pressColor='transparent'
          scrollEnabled
          renderLabel={this.renderLabel}
        />
      </Animated.View>
    )
  }

  render() {
    return (
      <TabView
        key={_.orientation}
        lazy
        lazyPreloadDistance={1}
        // @ts-ignore
        navigationState={this.navigationState}
        renderTabBar={this.renderTabBar}
        renderScene={this.renderScene}
        onSwipeStart={this.props.onSwipeStart}
        onIndexChange={this.onIndexChange}
      />
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(Tab)
