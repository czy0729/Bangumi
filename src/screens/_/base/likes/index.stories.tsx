/*
 * @Author: czy0729
 * @Date: 2023-04-05 14:59:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:05:49
 */
import React from 'react'
import { StorybookPage } from '@components'
import { _ } from '@stores'
import { Likes as Component } from './index'
import { props } from './index.mock'

import type { LikesProps as Props } from './index'

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
