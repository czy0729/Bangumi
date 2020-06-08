/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-27 20:12:17
 */
import React from 'react'
import { Animated, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { StatusBarEvents, UM } from '@components'
import { NavigationBarEvents } from '@screens/_'
import { _ } from '@stores'
import { inject } from '@utils/decorators'
import { hm } from '@utils/fetch'
import ParallaxImage from './parallax-image'
import Tabs from './tabs'
import BangumiList from './bangumi-list'
import TimelineList from './timeline-list'
import About from './about'
import Tinygrail from './tinygrail'
import Store, { height } from './store'

const title = '空间'

export default
@inject(Store)
@observer
class Zone extends React.Component {
  static navigationOptions = {
    header: null
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

    hm(`user/${$.params.userId}?route=zone`, 'Zone')
  }

  onScroll = e => {
    // 记录一个nativeEvent
    if (!this.offsetZeroNativeEvent && e.nativeEvent) {
      this.offsetZeroNativeEvent = e.nativeEvent
      this.offsetZeroNativeEvent.contentOffset.y = 0
    }

    // 更新头部是否置顶
    const { contentOffset } = e.nativeEvent
    const { y } = contentOffset
    const { fixed } = this.state
    if (fixed && y < height) {
      this.setState({
        fixed: false
      })
      return
    }

    if (!fixed && y >= height) {
      this.setState({
        fixed: true
      })
    }
  }

  onTabsChange = page => {
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
      return <View style={_.container.bg} />
    }

    const { fixed } = this.state
    const listViewProps = {
      ListHeaderComponent: (
        <View
          style={{
            height: height + _.tabsHeight
          }}
        />
      ),
      scrollEventThrottle: 16,
      onScroll: Animated.event(
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
      )
    }
    return (
      <View style={_.container.bg}>
        <UM screen={title} />
        <StatusBarEvents
          barStyle='light-content'
          backgroundColor='transparent'
        />
        <NavigationBarEvents />
        <Tabs
          $={$}
          scrollY={this.scrollY}
          onChange={(item, page) => this.onTabsChange(page)}
        >
          <BangumiList {...listViewProps} />
          <TimelineList {...listViewProps} />
          <About {...listViewProps} />
          <Tinygrail {...listViewProps} />
        </Tabs>
        <ParallaxImage scrollY={this.scrollY} fixed={fixed} />
      </View>
    )
  }
}
