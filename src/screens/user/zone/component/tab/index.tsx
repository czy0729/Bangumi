/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:24:14
 */
import React from 'react'
import { Animated } from 'react-native'
import { Flex, SceneMap, TabBar, TabView } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
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
import { Props } from './types'

class Tab extends React.Component<Props> {
  onIndexChange = (index: number) => {
    const { $, onIndexChange } = this.props
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
    const { $ } = this.props
    const { page } = $.state
    return {
      index: page,
      routes: $.tabs
    }
  }

  get transform() {
    const { $ } = this.props
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
            outputRange: [_.parallaxImageHeight * 2, _.parallaxImageHeight, H_HEADER, H_HEADER]
          })
        }
      ]
    }
  }

  renderLabel = ({ route }) => (
    <Flex style={this.styles.labelText} justify='center'>
      <TabBarLabel title={route.title} />
    </Flex>
  )

  renderTabBar = props => {
    const { $ } = this.props
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
    r(COMPONENT)

    return (
      <TabView
        key={_.orientation}
        lazy
        lazyPreloadDistance={0}
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

export default ob(Tab)
