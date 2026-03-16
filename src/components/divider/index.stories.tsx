/*
 * @Author: czy0729
 * @Date: 2023-04-04 18:02:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 00:19:13
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Divider as Component } from './index'

import type { DividerProps as Props } from './index'

export default {
  title: 'components/Divider',
  component: Component
}

export const Divider = (args: Props) => (
  <StorybookPage>
    <Component {...args} />
  </StorybookPage>
)
