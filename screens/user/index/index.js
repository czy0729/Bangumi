/*
 * 我的时光机
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-02 18:03:34
 */
import React from 'react'
import { Animated, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import PropTypes from 'prop-types'
import { StatusBarEvents, UM } from '@components'
import { IconTabBar, Login } from '@screens/_'
import { _ } from '@stores'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { MODEL_COLLECTION_STATUS } from '@constants/model'
import ParallaxImage from './parallax-image'
import TabsMain from './tabs-main'
import Store, { tabs, height } from './store'

const title = '我的'

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
    scrollY: new Animated.Value(0),
    fixed: false // 头部是否置顶
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

    // 触发动画
    const { scrollY, fixed } = this.state
    Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: scrollY
          }
        }
      }
    ])(e)

    // 更新头部是否置顶
    const { contentOffset } = e.nativeEvent
    const { y } = contentOffset
    if (fixed && y < height) {
      this.setState({
        fixed: false
      })
    } else if (!fixed && y >= height) {
      this.setState({
        fixed: true
      })
    }
  }

  onTabsChange = (item, page) => {
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

  /**
   * 登陆过期后登陆成功返回本页面, 没有正常触发请求
   * 假如当前没有数据主动请求
   */
  onDidFocus = () => {
    const { $ } = this.context
    const { subjectType, page } = $.state
    const { _loaded } = $.userCollections(
      subjectType,
      MODEL_COLLECTION_STATUS.getValue(tabs[page].title)
    )
    if (!_loaded) {
      $.fetchUserCollections(true)
    }
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

    const { scrollY, fixed } = this.state
    return (
      <View style={_.container.screen}>
        <UM screen={title} />
        <NavigationEvents onDidFocus={this.onDidFocus} />
        <StatusBarEvents
          barStyle='light-content'
          backgroundColor='transparent'
        />
        <TabsMain
          scrollY={scrollY}
          onSelectSubjectType={this.onSelectSubjectType}
          onTabsChange={this.onTabsChange}
          onScroll={this.onScroll}
        />
        <ParallaxImage scrollY={scrollY} fixed={fixed} />
      </View>
    )
  }
}

function tabBarIcon({ tintColor }) {
  return <IconTabBar name='me' color={tintColor} />
}
