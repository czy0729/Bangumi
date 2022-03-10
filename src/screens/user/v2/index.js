/*
 * 我的时光机
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-10 05:24:29
 */
import React from 'react'
import { Animated, View } from 'react-native'
import { StatusBarEvents, UM } from '@components'
import { KeyboardAdjustPanResize, IconTabBar, Login } from '@screens/_'
import { _, userStore } from '@stores'
import { runAfter } from '@utils'
import { inject, obc } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { IOS } from '@constants'
import { MODEL_COLLECTION_STATUS } from '@constants/model'
import ParallaxImage from './parallax-image'
import Tab from './tab'
import Heatmaps from './heatmaps'
import Store, { tabs } from './store'

const title = '时光机'

export default
@inject(Store)
@obc
class User extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (
      <IconTabBar name='md-person-outline' size={24} color={tintColor} />
    ),
    tabBarLabel: title
  }

  state = {
    fixed: false // 头部是否置顶
  }

  scrollY = new Animated.Value(0)
  y = 0

  componentDidMount() {
    runAfter(async () => {
      const { $ } = this.context
      await $.init()

      hm(`user/${$.myUserId}?route=user`, 'User')
    })
  }

  UNSAFE_componentWillReceiveProps({ isFocused }) {
    const { $ } = this.context
    $.setState({
      isFocused
    })
  }

  updatePageOffset = (index = [-1, 1]) => {
    const { $ } = this.context
    const { page } = $.state
    const { fixed } = this.state
    const config = {
      offset: fixed ? $.h_fixed : this.y,
      animated: false
    }

    index.forEach(item => {
      $.scrollToOffset[page + item]?.(config)
    })
  }

  onScroll = e => {
    const { $ } = this.context
    const { fixed } = this.state
    const { y } = e.nativeEvent.contentOffset
    this.y = y

    if (fixed && y < $.h_fixed - 20) {
      this.setState({
        fixed: false
      })
      return
    }

    if (!fixed && y >= $.h_fixed - 20) {
      this.setState({
        fixed: true
      })
    }
  }

  onSelectSubjectType = title => {
    const { $ } = this.context
    $.onSelectSubjectType(title)
  }

  onToggleList = () => {
    setTimeout(() => {
      this.updatePageOffset([0])
    }, 0)
  }

  onSwipeStart = () => {
    this.updatePageOffset()
  }

  onIndexChange = () => {
    setTimeout(() => {
      this.updatePageOffset([0])
    }, 0)
  }

  /**
   * 登录过期后登录成功返回本页面, 没有正常触发请求
   * 假如当前没有数据主动请求
   */
  onDidFocus = () => {
    const { $ } = this.context
    const { subjectType, page } = $.state
    const { _loaded } = $.userCollections(
      subjectType,
      MODEL_COLLECTION_STATUS.getValue(tabs[page].title)
    )
    if (!_loaded) $.fetchUserCollections(true)
  }

  get style() {
    return IOS ? _.container.plain : _.container._plain
  }

  render() {
    const { $ } = this.context
    const { id } = $.usersInfo

    // 自己并且没登录
    if (!id && !userStore.isLogin) return <Login style={_.container._plain} />

    const { _loaded } = $.state
    const { fixed } = this.state
    return (
      <View style={this.style}>
        <StatusBarEvents barStyle='light-content' backgroundColor='transparent' />
        {_loaded && (
          <>
            <Tab
              scrollY={this.scrollY}
              scrollEventThrottle={16}
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
              onSwipeStart={this.onSwipeStart}
              onIndexChange={this.onIndexChange}
              onSelectSubjectType={this.onSelectSubjectType}
              onToggleList={this.onToggleList}
            />
            <ParallaxImage scrollY={this.scrollY} fixed={fixed} />
            <KeyboardAdjustPanResize onDidFocus={this.onDidFocus} />
            <UM screen={title} />
            <Heatmaps />
          </>
        )}
      </View>
    )
  }
}
