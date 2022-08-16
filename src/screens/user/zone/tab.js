/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-16 06:46:26
 */
import React from 'react'
import { Animated } from 'react-native'
import { SceneMap } from 'react-native-tab-view'
import TabBar from '@components/@/react-native-tab-view/TabBar'
import TabView from '@components/@/react-native-tab-view/TabView'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import ListHeader from './list-header'
import BangumiList from './bangumi-list'
import TimelineList from './timeline-list'
import RakuenList from './rakuen-list'
import About from './about'
import Tinygrail from './tinygrail'
import { H_HEADER, H_RADIUS_LINE } from './store'

class Tab extends React.Component {
  onIndexChange = index => {
    const { $ } = this.context
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
    const { $ } = this.context
    const { page } = $.state
    return {
      index: page,
      routes: $.tabs
    }
  }

  get transform() {
    const { $ } = this.context
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
    const { $ } = this.context
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

const commonStyle = {
  tabBarWrap: {
    position: 'absolute',
    zIndex: 2,
    top: -H_RADIUS_LINE + 2,
    right: 0,
    left: 0
  },
  label: {
    padding: 0
  },
  labelText: {
    width: '100%'
  },
  tabBarLeft: {
    position: 'absolute',
    zIndex: 3,
    left: 0,
    marginTop: 2
  }
}

const memoStyles = _.memoStyles(() => ({
  ...commonStyle,
  tabBar: {
    backgroundColor: _.select(
      _.colorPlain,
      _.deepDark ? _._colorPlain : _._colorDarkModeLevel1
    ),
    borderBottomWidth: _.select(_.hairlineWidth, 0),
    borderBottomColor: _.colorBorder,
    shadowOpacity: 0,
    elevation: 0
  },
  tab: {
    height: _.r(48)
  },
  indicator: {
    width: _.r(16),
    height: 4,
    backgroundColor: _.colorMain,
    borderRadius: 4
  }
}))
