/*
 * @Author: czy0729
 * @Date: 2023-04-07 06:36:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 06:39:23
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Input, InputProps } from './index'

export default {
  title: 'components/Input',
  component: Input
}

export const Component = (args: InputProps) => (
  <StorybookPage>
    <Input {...args} />
  </StorybookPage>
)

Component.args = {
  placeholder: 'Input'
}
