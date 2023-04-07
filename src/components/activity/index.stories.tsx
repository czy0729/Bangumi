/*
 * @Author: czy0729
 * @Date: 2023-04-06 11:46:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 07:35:40
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Activity, ActivityProps } from './index'

export default {
  title: 'components/Activity',
  component: Activity
}

export const Component = (args: ActivityProps) => (
  <StorybookPage>
    <Activity {...args} />
  </StorybookPage>
)
