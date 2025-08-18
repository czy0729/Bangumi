/*
 * @Author: czy0729
 * @Date: 2023-04-07 07:37:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 07:40:23
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { SwitchPro as Component } from './index'

export default {
  title: 'components/SwitchPro',
  component: Component
}

export const SwitchPro = args => (
  <StorybookPage>
    <Component {...args} />
  </StorybookPage>
)

SwitchPro.args = {
  value: true
}
