/*
 * 我的时光机
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-08 02:15:31
 */
import React from 'react'
import { Animated, View } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import { StatusBarEvents, UM } from '@components'
import { IconTabBar, Login, IconPortal } from '@screens/_'
import { _ } from '@stores'
import { runAfter } from '@utils'
import { inject, obc } from '@utils/decorators'
import { hm } from '@utils/fetch'
import { IOS } from '@constants'
import { MODEL_COLLECTION_STATUS } from '@constants/model'
import ParallaxImage from './parallax-image'
import Tab from './tab'
import Heatmaps from './heatmaps'
import Store, { tabs, H_BG, H_HEADER } from './store'

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

  componentWillReceiveProps({ isFocused }) {
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
      offset: fixed ? H_BG - H_HEADER : this.y,
      animated: false
    }

    index.forEach(item => {
      $.scrollToOffset[page + item]?.(config)
    })
  }

  onScroll = e => {
    const { fixed } = this.state
    const { y } = e.nativeEvent.contentOffset
    this.y = y

    const offset = H_BG - H_HEADER - 20
    if (fixed && y < offset) {
      this.setState({
        fixed: false
      })
      return
    }

    if (!fixed && y >= offset) {
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
    if (!_loaded) $.fetchUserCollections(true)
  }

  get style() {
    return IOS ? _.container.plain : _.container._plain
  }

  render() {
    const { $ } = this.context
    const { id } = $.usersInfo

    // 自己并且没登陆
    if (!id && !$.isLogin) return <Login style={_.container._plain} />

    const { _loaded } = $.state
    const { isFocused } = this.props
    const { fixed } = this.state
    return (
      <View style={this.style}>
        <StatusBarEvents barStyle='light-content' backgroundColor='transparent' />
        {_loaded && (
          <>
            <UM screen={title} />
            <NavigationEvents onDidFocus={this.onDidFocus} />
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
              onSelectSubjectType={this.onSelectSubjectType}
              onToggleList={this.onToggleList}
            />
            <ParallaxImage scrollY={this.scrollY} fixed={fixed} />
            {isFocused && <IconPortal index={4} onPress={$.onRefreshThenScrollTop} />}
            <Heatmaps />
          </>
        )}
      </View>
    )
  }
}
