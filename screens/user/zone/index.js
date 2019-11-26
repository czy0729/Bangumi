/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-26 21:06:52
 */
import React from 'react'
import { Animated, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { StatusBarEvents, UM } from '@components'
import { inject } from '@utils/decorators'
import { hm } from '@utils/fetch'
import _ from '@styles'
import ParallaxImage from './parallax-image'
import Tabs from './tabs'
import BangumiList from './bangumi-list'
import TimelineList from './timeline-list'
import About from './about'
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
    scrollY: new Animated.Value(0)
  }

  componentDidMount() {
    const { $ } = this.context
    $.init()

    hm(`user/${$.params.userId}?route=zone`, 'Zone')
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
    if (!$.state._loaded) {
      return null
    }

    const { scrollY } = this.state
    const listViewProps = {
      ListHeaderComponent: <View style={{ height: height + _.tabsHeight }} />,
      scrollEventThrottle: 16,
      onScroll: this.onScroll
    }
    return (
      <>
        <UM screen={title} />
        <StatusBarEvents
          barStyle='light-content'
          backgroundColor='transparent'
        />
        <Tabs style={_.container.screen} $={$} scrollY={scrollY}>
          <BangumiList {...listViewProps} />
          <TimelineList {...listViewProps} />
          <About {...listViewProps} />
        </Tabs>
        <ParallaxImage scrollY={scrollY} />
      </>
    )
  }
}
