/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-14 05:03:02
 */
import React from 'react'
import { View } from 'react-native'
import { Track } from '@components'
import { uiStore, _ } from '@stores'
import { obc } from '@utils/decorators'
import ParallaxImage from '../parallax-image'
import Tab from '../tab'
import UsedModal from '../used-modal'
import Heatmaps from '../heatmaps'
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
  }

  render() {
    const { $ } = this.context as Ctx
    const { _loaded } = $.state
    if (!_loaded) return <View style={_.container.plain} />

    const { visible } = $.state
    return (
      <View style={_.container.plain}>
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
      </View>
    )
  }
}

export default obc(Zone)
