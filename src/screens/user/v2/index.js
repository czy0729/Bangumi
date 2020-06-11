/*
 * 我的时光机
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-11 14:46:00
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
import { IOS } from '@constants'
import { MODEL_COLLECTION_STATUS } from '@constants/model'
import ParallaxImage from './parallax-image'
import Tab from './tab'
import Store, { tabs, H_BG } from './store'

const title = '时光机'

export default
@inject(Store)
@observer
class User extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => <IconTabBar name='me' color={tintColor} />,
    tabBarLabel: title
  }

  static contextTypes = {
    $: PropTypes.object
  }

  state = {
    fixed: false // 头部是否置顶
  }

  scrollY = new Animated.Value(0)
  offsetZeroNativeEvent
  loaded = {}

  async componentDidMount() {
    const { $ } = this.context
    await $.init()
    const { page } = $.state
    this.loaded[page] = true

    hm(`user/${$.myUserId}?route=user`, 'User')
  }

  onScroll = e => {
    // 记录一个nativeEvent用于切页重置
    if (!this.offsetZeroNativeEvent && e.nativeEvent) {
      this.offsetZeroNativeEvent = e.nativeEvent
      this.offsetZeroNativeEvent.contentOffset.y = 0
    }

    // 更新头部是否置顶
    const { contentOffset } = e.nativeEvent
    const { y } = contentOffset
    const { fixed } = this.state
    if (fixed) {
      const { $ } = this.context
      const { page } = $.state
      this.loaded[page] = true
    }
    if (fixed && y < H_BG) {
      this.setState({
        fixed: false
      })
      return
    }
    if (!fixed && y >= H_BG) {
      this.setState({
        fixed: true
      })
    }
  }

  onIndexChange = page => {
    if (!this.loaded[page]) {
      this.resetPageOffset(page)
    }
  }

  onSelectSubjectType = title => {
    const { $ } = this.context
    $.onSelectSubjectType(title)
    this.loaded = {}

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
        Animated.event([
          {
            nativeEvent: {
              contentOffset: {
                y: this.scrollY
              }
            }
          }
        ])({
          nativeEvent: this.offsetZeroNativeEvent
        })
      }, 0)
    }
  }

  get style() {
    return IOS ? _.container.bg : _.container._plain
  }

  render() {
    const { $ } = this.context
    const { id } = $.usersInfo

    // 自己并且没登陆
    if (!id && !$.isLogin) {
      return <Login style={this.style} />
    }

    const { _loaded } = $.state
    const { fixed } = this.state
    return (
      <View style={this.style}>
        <UM screen={title} />
        <StatusBarEvents
          barStyle='light-content'
          backgroundColor='transparent'
        />
        {_loaded && (
          <>
            <NavigationEvents onDidFocus={this.onDidFocus} />
            <Tab
              scrollY={this.scrollY}
              scrollEventThrottle={16}
              onSelectSubjectType={this.onSelectSubjectType}
              onIndexChange={this.onIndexChange}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: this.scrollY
                      }
                    }
                  }
                ],
                {
                  useNativeDriver: true,
                  listener: this.onScroll
                }
              )}
            />
            <ParallaxImage scrollY={this.scrollY} fixed={fixed} />
          </>
        )}
      </View>
    )
  }
}
