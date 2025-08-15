/*
 * @Author: czy0729
 * @Date: 2023-04-06 12:09:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:57:22
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Flex } from '@components/flex'
import { Button as Component, ButtonProps as Props } from './index'

export default {
  title: 'components/Button',
  component: Component
}

export const Button = (args: Props) => (
  <StorybookPage container>
    <Flex.Item>
      <Component {...args} />
    </Flex.Item>
  </StorybookPage>
)

Button.args = {
  size: 'md',
  radius: true,
  children: '点击提交'
}
