/*
 * @Author: czy0729
 * @Date: 2023-04-06 12:09:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 04:26:53
 */
import React from 'react'
import { Flex } from '@components/flex'
import { StorybookPage } from '@components/storybook'
import { Button as Component } from './index'

import type { ButtonProps as Props } from './index'

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
