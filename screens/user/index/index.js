/*
 * 我的时光机
 * @Author: czy0729
 * @Date: 2019-05-25 22:03:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-27 16:42:25
 */
import React from 'react'
import { Animated, View } from 'react-native'
import PropTypes from 'prop-types'
import { StatusBarEvents, IconTabBar, Login } from '@screens/_'
import { inject, observer } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import ParallaxImage from './parallax-image'
import Tabs from './tabs'
import ToolBar from './tool-bar'
import List from './list'
import Store, { tabs, height } from './store'

export default
@inject(Store)
@observer
class User extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => <IconTabBar name='me' color={tintColor} />,
    tabBarLabel: '我的'
  }

  static contextTypes = {
    $: PropTypes.object
  }

  state = {
    scrollY: new Animated.Value(0)
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm(`user/${$.myUserId}?route=user`)
  }

  onScroll = e => {
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
      <>
        <StatusBarEvents barStyle='light-content' />
        <Tabs style={_.container.screen} $={$} scrollY={scrollY}>
          {tabs.map(item => (
            <List
              key={item.title}
              title={item.title}
              subjectType={subjectType}
              ListHeaderComponent={
                <>
                  <View style={{ height: height + _.tabsHeight }} />
                  <ToolBar />
                </>
              }
              scrollEventThrottle={16}
              onScroll={this.onScroll}
            />
          ))}
        </Tabs>
        <ParallaxImage scrollY={scrollY} />
      </>
    )
  }
}
