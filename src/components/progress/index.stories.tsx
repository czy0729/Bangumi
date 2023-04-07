/*
 * @Author: czy0729
 * @Date: 2023-04-07 07:05:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 07:05:41
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Progress, ProgressProps } from './index'

export default {
  title: 'components/Progress',
  component: Progress
}

export const Component = (args: ProgressProps) => (
  <StorybookPage>
    <Progress {...args} />
  </StorybookPage>
)

Component.args = {
  show: true,
  current: 10,
  total: 100
}
