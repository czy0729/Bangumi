/*
 * @Author: czy0729
 * @Date: 2023-04-04 20:02:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 14:12:20
 */
import React from 'react'
import { Cover as Component, CoverProps as Props } from './index'

export default {
  title: 'base/Cover',
  component: Component
}

export const Cover = (args: Props) => <Component {...args} />

Cover.args = {
  src: 'https://lain.bgm.tv/pic/cover/l/ba/c9/404804_1sTp8.jpg',
  width: 216,
  height: 302,
  radius: true
}
