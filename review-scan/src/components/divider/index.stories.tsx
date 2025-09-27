/*
 * @Author: czy0729
 * @Date: 2023-04-04 18:02:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-04 19:43:56
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Divider as Component, DividerProps as Props } from './index'

export default {
  title: 'components/Divider',
  component: Component
}

export const Divider = (args: Props) => (
  <StorybookPage>
    <Component {...args} />
  </StorybookPage>
)
