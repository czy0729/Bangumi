/*
 * 我的时光机
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-23 20:52:32
 */
import React from 'react'
import { Animated, View } from 'react-native'
import PropTypes from 'prop-types'
import { StatusBarEvents, UM } from '@components'
import { IconTabBar, Login } from '@screens/_'
import { _ } from '@stores'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import ParallaxImage from './parallax-image'
import Tabs from './tabs'
import ToolBar from './tool-bar'
import List from './list'
import Store, { tabs, height } from './store'

const title = '我的'
const ListHeaderComponent = (
  <>
    <View
      style={{
        height: height + _.tabsHeight
      }}
    />
    <ToolBar />
  </>
)

export default
@inject(Store)
@observer
class User extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon,
    tabBarLabel: title
  }

  static contextTypes = {
    $: PropTypes.object
  }

  state = {
    scrollY: new Animated.Value(0)
  }

  offsetZeroNativeEvent
  loaded = {}

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm(`user/${$.myUserId}?route=user`, 'User')
  }

  onScroll = e => {
    // 记录一个nativeEvent
    if (!this.offsetZeroNativeEvent && e.nativeEvent) {
      this.offsetZeroNativeEvent = e.nativeEvent
      this.offsetZeroNativeEvent.contentOffset.y = 0
    }

    const { scrollY } = this.state
    Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: scrollY
          }
        }
      }
    ])(e)
  }

  onTabsChange = page => {
    if (!this.loaded[page]) {
      this.resetPageOffset(page)
    }
  }

  onSelectSubjectType = title => {
    const { $ } = this.context
    $.onSelectSubjectType(title)

    const { page } = $.state
    this.resetPageOffset(page)
  }

  resetPageOffset = page => {
    if (!this.loaded[page] && this.offsetZeroNativeEvent) {
      setTimeout(() => {
        const { scrollY } = this.state
        Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: scrollY
              }
            }
          }
        ])({
          nativeEvent: this.offsetZeroNativeEvent
        })
        this.loaded[page] = true
      }, 0)
    }
  }

  render() {
    const { $ } = this.context
    const { id } = $.usersInfo

    // 自己并且没登陆
    if (!id && !$.isLogin) {
      return <Login />
    }

    // 页面状态没加载完成
    if (!$.state._loaded) {
      return <View style={_.container.screen} />
    }

    const { subjectType } = $.state
    const { scrollY } = this.state
    return (
      <View style={_.container.screen}>
        <UM screen={title} />
        <StatusBarEvents
          barStyle='light-content'
          backgroundColor='transparent'
        />
        <Tabs
          style={_.container.screen}
          $={$}
          scrollY={scrollY}
          onSelect={this.onSelectSubjectType}
          onChange={(item, page) => this.onTabsChange(page)}
        >
          {tabs.map(item => (
            <List
              key={item.title}
              title={item.title}
              subjectType={subjectType}
              ListHeaderComponent={ListHeaderComponent}
              scrollEventThrottle={16}
              onScroll={this.onScroll}
            />
          ))}
        </Tabs>
        <ParallaxImage scrollY={scrollY} />
      </View>
    )
  }
}

function tabBarIcon({ tintColor }) {
  return <IconTabBar name='me' color={tintColor} />
}
