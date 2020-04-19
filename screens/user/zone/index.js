/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 20:00:32
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
    scrollY: new Animated.Value(0),
    fixed: false // 头部是否置顶
  }

  offsetZeroNativeEvent
  loaded = {}

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm(`user/${$.params.userId}?route=zone`, 'Zone')
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

  onTabsChange = page => {
    if (!this.loaded[page]) {
      this.resetPageOffset(page)
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
    if (!$.state._loaded) {
      return <View style={_.container.screen} />
    }

    const { scrollY, fixed } = this.state
    const listViewProps = {
      ListHeaderComponent: (
        <View
          style={{
            height: height + _.tabsHeight
          }}
        />
      ),
      scrollEventThrottle: 16,
      onScroll: this.onScroll
    }
    return (
      <View style={_.container.screen}>
        <UM screen={title} />
        <StatusBarEvents
          barStyle='light-content'
          backgroundColor='transparent'
        />
        <NavigationBarEvents />
        <Tabs
          style={_.container.screen}
          $={$}
          scrollY={scrollY}
          onChange={(item, page) => this.onTabsChange(page)}
        >
          <BangumiList {...listViewProps} />
          <TimelineList {...listViewProps} />
          <About {...listViewProps} />
          <Tinygrail {...listViewProps} />
        </Tabs>
        <ParallaxImage scrollY={scrollY} fixed={fixed} />
      </View>
    )
  }
}
