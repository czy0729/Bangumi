/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-08 18:41:39
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { r } from '@utils/dev'
import ParallaxImage from '../component/parallax-image'
import Tab from '../component/tab'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

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
  }

  render() {
    r(COMPONENT)

    return (
      <>
        <Tab
          scrollEventThrottle={16}
          onScroll={this.onScroll}
          onSwipeStart={this.onSwipeStart}
          onIndexChange={this.onIndexChange}
        />
        <ParallaxImage />
      </>
    )
  }
}

export default obc(Zone)
