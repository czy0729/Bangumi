/*
 * @Author: czy0729
 * @Date: 2023-04-07 07:05:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 07:05:41
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Progress as Component, ProgressProps as Props } from './index'

export default {
  title: 'components/Progress',
  component: Component
}

export const Progress = (args: Props) => (
  <StorybookPage>
    <Component {...args} />
  </StorybookPage>
)

Progress.args = {
  show: true,
  current: 10,
  total: 100
}
