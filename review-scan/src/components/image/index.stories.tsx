/*
 * @Author: czy0729
 * @Date: 2023-04-07 06:27:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 06:35:09
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Image as Component, ImageProps as Props } from './index'

export default {
  title: 'components/Image',
  component: Component
}

export const Image = (args: Props) => (
  <StorybookPage>
    <Component {...args} />
  </StorybookPage>
)

Image.args = {
  src: 'https://lain.bgm.tv/r/400/pic/cover/l/58/c1/376703_g5559.jpg',
  width: 216,
  height: 302
}
