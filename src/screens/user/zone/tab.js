/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-08 03:03:41
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
import { TABS, TABS_WITH_TINYGRAIL } from './ds'

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

  renderTabBar = props => (
    <Animated.View style={[this.styles.tabBarWrap, this.transform]}>
      <TabBar
        {...props}
        style={this.styles.tabBar}
        tabStyle={this.styles.tab}
        labelStyle={this.styles.label}
        indicatorStyle={this.styles.indicator}
        pressOpacity={1}
        pressColor='transparent'
        scrollEnabled
        renderLabel={this.renderLabel}
      />
    </Animated.View>
  )

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
    const { $ } = this.context
    return $.tabs.length > 3 ? memoStylesWithTinygrail() : memoStyles()
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

const memoStyles = _.memoStyles(() => {
  const W_INDICATOR = 16 * _.ratio
  const W_TAB = _.window.width / TABS.length
  return {
    ...commonStyle,
    tabBar: {
      backgroundColor: _.select(
        _.colorPlain,
        _.deepDark ? _._colorPlain : _._colorDarkModeLevel1
      ),
      borderBottomWidth: _.flat ? 0 : _.select(_.hairlineWidth, 0),
      borderBottomColor: _.colorBorder,
      shadowOpacity: 0,
      elevation: 0
    },
    tab: {
      width: W_TAB,
      height: 48
    },
    indicator: {
      width: W_INDICATOR,
      height: 4,
      marginLeft: (W_TAB - W_INDICATOR) / 2,
      backgroundColor: _.colorMain,
      borderRadius: 4
    }
  }
})

const memoStylesWithTinygrail = _.memoStyles(() => {
  const W_INDICATOR = 16 * _.ratio
  const W_TAB_WITH_TINYGRAIL = _.window.width / TABS_WITH_TINYGRAIL.length
  return {
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
      width: W_TAB_WITH_TINYGRAIL,
      height: 48 * _.ratio
    },
    indicator: {
      width: W_INDICATOR,
      height: 4,
      marginLeft: (W_TAB_WITH_TINYGRAIL - W_INDICATOR) / 2,
      backgroundColor: _.colorMain,
      borderRadius: 4
    }
  }
})
