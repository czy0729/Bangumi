/*
 * @Author: czy0729
 * @Date: 2019-05-06 00:28:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:24:44
 */
import React from 'react'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { ScrollEvent } from '@types'
import ParallaxImage from '../component/parallax-image'
import Tab from '../component/tab'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

class Zone extends React.Component<Ctx> {
  onSwipeStart = () => {
    const { $ } = this.props
    $.updatePageOffset()
  }

  onIndexChange = () => {
    setTimeout(() => {
      const { $ } = this.props
      $.updatePageOffset([0])
    }, 0)
  }

  onScroll = (e: ScrollEvent) => {
    const { $ } = this.props
    $.onScroll(e)
  }

  render() {
    r(COMPONENT)

    const { $ } = this.props
    return (
      <>
        <Tab
          $={$}
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

export default ob(Zone)
