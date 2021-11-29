/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-30 02:32:55
 */
import React from 'react'
import { View, Animated } from 'react-native'
import { TabBar, SceneMap } from 'react-native-tab-view'
import TabView from '@components/@/react-native-tab-view/TabView'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import BangumiList from './bangumi-list'
import TimelineList from './timeline-list'
import RakuenList from './rakuen-list'
import About from './about'
import Tinygrail from './tinygrail'
import { H_BG, H_TABBAR, H_HEADER, H_RADIUS_LINE } from './store'
import { TABS, TABS_WITH_TINYGRAIL } from './ds'

const headerStyle = {
  height: H_BG + H_TABBAR
}

class Tab extends React.Component {
  onIndexChange = index => {
    const { $ } = this.context
    const { onIndexChange } = this.props
    onIndexChange(index)
    $.onTabChange(index)
  }

  ListHeaderComponent = (<View style={headerStyle} />)

  renderScene = SceneMap({
    bangumi: () => (
      <BangumiList
        ListHeaderComponent={this.ListHeaderComponent}
        scrollEventThrottle={16}
        onScroll={this.props.onScroll}
      />
    ),
    timeline: () => (
      <TimelineList
        ListHeaderComponent={this.ListHeaderComponent}
        scrollEventThrottle={16}
        onScroll={this.props.onScroll}
      />
    ),
    rakuen: () => (
      <RakuenList
        ListHeaderComponent={this.ListHeaderComponent}
        scrollEventThrottle={16}
        onScroll={this.props.onScroll}
      />
    ),
    about: () => (
      <About
        ListHeaderComponent={this.ListHeaderComponent}
        scrollEventThrottle={16}
        onScroll={this.props.onScroll}
      />
    ),
    tinygrail: () => (
      <Tinygrail
        ListHeaderComponent={this.ListHeaderComponent}
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
            inputRange: [-H_BG, 0, H_BG - H_HEADER, H_BG],
            outputRange: [H_BG * 2, H_BG, H_HEADER, H_HEADER]
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

const W_INDICATOR = 16 * _.ratio
const W_TAB = _.window.width / TABS.length
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

const memoStyles = _.memoStyles(_ => ({
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
}))

const W_TAB_WITH_TINYGRAIL = _.window.width / TABS_WITH_TINYGRAIL.length
const memoStylesWithTinygrail = _.memoStyles(_ => ({
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
}))
