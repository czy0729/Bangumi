/*
 * @Author: czy0729
 * @Date: 2020-06-03 09:53:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-26 16:01:02
 */
import React from 'react'
import { View, Animated } from 'react-native'
import PropTypes from 'prop-types'
import { TabBar, SceneMap } from 'react-native-tab-view'
import TabView from '@components/@/react-native-tab-view/TabView'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import TabBarLeft from './tab-bar-left'
import ToolBar from './tool-bar'
import List from './list'
import { tabs, H_BG, H_TABBAR, H_HEADER } from './store'

class Tab extends React.Component {
  onIndexChange = index => {
    const { $ } = this.context
    const { onIndexChange } = this.props
    onIndexChange(index)
    $.onChange(index)
  }

  onSelect = title => {
    const { onSelectSubjectType } = this.props
    onSelectSubjectType(title)
  }

  ListHeaderComponent = (
    <>
      <View
        style={{
          height: H_BG + H_TABBAR
        }}
      />
      <ToolBar />
    </>
  )

  renderScene = SceneMap(
    Object.assign(
      {},
      ...tabs.map(item => ({
        [item.key]: () => (
          <List
            title={item.title}
            ListHeaderComponent={this.ListHeaderComponent}
            scrollEventThrottle={16}
            onScroll={this.props.onScroll}
          />
        )
      }))
    )
  )

  get navigationState() {
    const { $ } = this.context
    const { page } = $.state
    return {
      index: page,
      routes: tabs
    }
  }

  get transform() {
    const { scrollY } = this.props
    return {
      transform: [
        {
          translateY: scrollY.interpolate({
            inputRange: [-H_BG, 0, H_BG - H_HEADER, H_BG],
            outputRange: [H_BG * 2, H_BG, H_HEADER, H_HEADER]
          })
        }
      ]
    }
  }

  renderLabel = ({ route, focused }) => {
    const { $ } = this.context
    const { subjectType } = $.state
    const count =
      $.counts[MODEL_SUBJECT_TYPE.getTitle(subjectType)][route.title]
    return (
      <Flex>
        <Text type='title' bold={focused}>
          {route.title.replace('看', $.action)}
        </Text>
        {!!count && (
          <Text type='sub' size={12} lineHeight={14}>
            {' '}
            {count}
          </Text>
        )}
      </Flex>
    )
  }

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
      <>
        <TabView
          lazyPreloadDistance={1}
          navigationState={this.navigationState}
          renderTabBar={this.renderTabBar}
          renderScene={this.renderScene}
          onIndexChange={this.onIndexChange}
        />
        <Animated.View style={[this.styles.tabBarLeft, this.transform]}>
          <TabBarLeft onSelect={this.onSelect} />
        </Animated.View>
      </>
    )
  }

  get styles() {
    return memoStyles()
  }
}

Tab.contextTypes = {
  $: PropTypes.object
}

export default observer(Tab)

const W_TAB_BAR_LEFT = 68
const W_TAB = (_.window.width - W_TAB_BAR_LEFT) / 5
const W_INDICATOR = 16
const memoStyles = _.memoStyles(_ => ({
  tabBarWrap: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0,
    left: 0
  },
  tabBar: {
    paddingLeft: W_TAB_BAR_LEFT,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderBottomWidth: _.flat ? 0 : _.select(_.hairlineWidth, 0),
    borderBottomColor: _.colorBorder,
    shadowOpacity: 0,
    elevation: 0
  },
  tab: {
    width: W_TAB,
    height: 48
  },
  label: {
    padding: 0
  },
  labelText: {
    flexWrap: 'wrap'
  },
  indicator: {
    width: W_INDICATOR,
    height: 4,
    marginLeft: (W_TAB - W_INDICATOR) / 2 + W_TAB_BAR_LEFT,
    backgroundColor: _.colorMain,
    borderRadius: 4
  },
  tabBarLeft: {
    position: 'absolute',
    zIndex: 3,
    left: 0,
    marginTop: 2
  }
}))
