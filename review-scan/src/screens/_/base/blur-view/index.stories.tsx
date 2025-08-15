/*
 * @Author: czy0729
 * @Date: 2023-04-05 12:31:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 14:11:19
 */
import React from 'react'
import { _ } from '@stores'
import { Cover } from '../cover'
import { BlurView as Component, BlurViewProps as Props } from './index'

export default {
  title: 'base/BlurView',
  component: Component
}

export const BlurView = (args: Props) => (
  <>
    <Cover
      src='https://lain.bgm.tv/r/400/pic/cover/l/76/d1/393217_yhCbh.jpg'
      size={216}
      height={302}
      radius
    />
    <Component {...args} />
  </>
)

BlurView.args = {
  style: {
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: '50%',
    width: 80,
    height: 80,
    marginTop: -40,
    marginLeft: -40,
    borderRadius: _.radiusMd
  },
  intensity: 64
}
