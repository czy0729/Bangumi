/*
 * @Author: czy0729
 * @Date: 2023-04-05 14:59:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 15:04:08
 */
import React from 'react'
import { StorybookPage } from '@components'
import { _ } from '@stores'
import { Likes as Component, LikesProps as Props } from './index'
import { props } from './index.mock'

export default {
  title: 'base/Likes',
  component: Component
}

export const Likes = (args: Props) => (
  <StorybookPage style={_.container.wind}>
    <Component {...args} />
  </StorybookPage>
)

Likes.args = props
