/*
 * @Author: czy0729
 * @Date: 2023-04-06 11:46:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 07:35:40
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Activity as Component, ActivityProps as Props } from './index'

export default {
  title: 'components/Activity',
  component: Component
}

export const Activity = (args: Props) => (
  <StorybookPage>
    <Component {...args} />
  </StorybookPage>
)
