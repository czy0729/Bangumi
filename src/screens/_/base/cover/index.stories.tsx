/*
 * @Author: czy0729
 * @Date: 2023-04-04 20:02:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-04 20:44:08
 */
import React from 'react'
import { IMG_HEIGHT, IMG_WIDTH } from '@constants'
import { Cover, CoverProps } from './index'

export default {
  title: 'base/Cover',
  component: Cover
}

export const Component = (args: CoverProps) => <Cover {...args} />

Component.args = {
  src: 'https://lain.bgm.tv/pic/cover/l/ba/c9/404804_1sTp8.jpg',
  width: IMG_WIDTH * 2,
  height: IMG_HEIGHT * 2,
  radius: true
} as CoverProps
