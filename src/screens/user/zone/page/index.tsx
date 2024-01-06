/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 20:42:52
 */
import React from 'react'
import { View } from 'react-native'
import { Component, Track } from '@components'
import { _, uiStore } from '@stores'
import { obc } from '@utils/decorators'
import Heatmaps from '../component/heatmaps'
import ParallaxImage from '../component/parallax-image'
import Tab from '../component/tab'
import UsedModal from '../component/used-modal'
import { Ctx } from '../types'

const title = '空间'

class Zone extends React.Component {
  onSwipeStart = () => {
    const { $ } = this.context as Ctx
    $.updatePageOffset()
  }

  onIndexChange = () => {
    setTimeout(() => {
      const { $ } = this.context as Ctx
      $.updatePageOffset([0])
    }, 0)
  }

  onScroll = (e: {
    nativeEvent: {
      contentOffset: {
        y: any
      }
    }
  }) => {
    const { $ } = this.context as Ctx
    $.onScroll(e)
    uiStore.closePopableSubject()
    uiStore.closeLikesGrid()
  }

  render() {
    const { $ } = this.context as Ctx
    const { _loaded } = $.state
    if (!_loaded) return <View style={_.container.plain} />

    const { visible } = $.state
    return (
      <Component id='screen-zone' style={_.container.plain}>
        <Tab
          scrollEventThrottle={4}
          onScroll={this.onScroll}
          onSwipeStart={this.onSwipeStart}
          onIndexChange={this.onIndexChange}
        />
        <ParallaxImage />
        <UsedModal visible={visible} defaultAvatar={$.src} />
        <Track title={title} hm={[`user/${$.params.userId}?route=zone`, 'Zone']} />
        <Heatmaps />
      </Component>
    )
  }
}

export default obc(Zone)
