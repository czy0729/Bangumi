/*
 * @Author: czy0729
 * @Date: 2023-04-04 20:02:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-12 07:24:32
 */
import React from 'react'
import { Cover as Component } from './index'

import type { CoverProps as Props } from './index'

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
