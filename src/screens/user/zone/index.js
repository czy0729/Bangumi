/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-10 01:07:40
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
import Store, { H_BG, H_HEADER } from './store'

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
  y = 0

  async componentDidMount() {
    const { $ } = this.context
    await $.init()

    hm(`user/${$.params.userId}?route=zone`, 'Zone')
  }

  updatePageOffset = (index = [-1, 1]) => {
    const { $ } = this.context
    const { page } = $.state
    const { fixed } = this.state

    const offset = fixed ? H_BG - H_HEADER : this.y
    index.forEach(item => {
      const scrollToOffset = $.scrollToOffset[page + item]
      if (typeof scrollToOffset === 'function') {
        scrollToOffset({
          offset,
          animated: false
        })
      } else {
        const scrollTo = $.scrollTo[page + item]
        if (typeof scrollTo === 'function') {
          scrollTo({
            y: offset,
            animated: false
          })
        }
      }
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

  onSwipeStart = () => {
    this.updatePageOffset()
  }

  onIndexChange = () => {
    setTimeout(() => {
      this.updatePageOffset([0])
    }, 0)
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    if (!_loaded) return <View style={_.container.plain} />

    const { visible } = $.state
    const { fixed } = this.state
    return (
      <View style={_.container.plain}>
        <UM screen={title} />
        <StatusBarEvents barStyle='light-content' backgroundColor='transparent' />
        <NavigationBarEvents />
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
        />
        <ParallaxImage scrollY={this.scrollY} fixed={fixed} />
        <UsedModal visible={visible} defaultAvatar={$.src} />
        <Heatmaps />
      </View>
    )
  }
}
