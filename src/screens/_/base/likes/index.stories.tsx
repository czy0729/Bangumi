/*
 * @Author: czy0729
 * @Date: 2023-04-05 14:59:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 15:04:08
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { _ } from '@stores'
import { Likes, LikesProps } from './index'
import { props } from './index.mock'

export default {
  title: 'base/Likes',
  component: Likes
}

export const Component = (args: LikesProps) => (
  <StorybookPage style={_.container.wind}>
    <Likes {...args} />
  </StorybookPage>
)

Component.args = props
