/*
 * @Author: czy0729
 * @Date: 2023-04-07 06:54:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 06:55:42
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Loading as Component } from './index'

export default {
  title: 'components/Loading',
  component: Component
}

export const Loading = args => (
  <StorybookPage>
    <Component {...args} />
  </StorybookPage>
)
