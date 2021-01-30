/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 22:50:02
 */
import React from 'react'
import { Animated, View } from 'react-native'
import { StatusBarEvents, UM } from '@components'
import { NavigationBarEvents } from '@screens/_'
import { _ } from '@stores'
import { inject, obc } from '@utils/decorators'
import { hm } from '@utils/fetch'
import ParallaxImage from './parallax-image'
import Tab from './tab'
import UsedModal from './used-modal'
import Heatmaps from './heatmaps'
import Store, { H_BG } from './store'

const title = '空间'

export default
@inject(Store)
@obc
class Zone extends React.Component {
  static navigationOptions = {
    header: null
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

    hm(`user/${$.params.userId}?route=zone`, 'Zone')
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
        this.loaded[page] = true
      }, 0)
    }
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    if (!_loaded) {
      return <View style={_.container.plain} />
    }

    const { visible } = $.state
    const { fixed } = this.state
    return (
      <View style={_.container.plain}>
        <UM screen={title} />
        <StatusBarEvents
          barStyle='light-content'
          backgroundColor='transparent'
        />
        <NavigationBarEvents />
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
        <UsedModal visible={visible} defaultAvatar={$.src} />
        <Heatmaps />
      </View>
    )
  }
}
