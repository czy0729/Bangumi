/*
 * @Author: czy0729
 * @Date: 2023-04-06 12:09:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-06 12:11:56
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Flex } from '@components/flex'
import { Button, ButtonProps } from './index'

export default {
  title: 'components/Button',
  component: Button
}

export const Component = (args: ButtonProps) => (
  <StorybookPage container>
    <Flex.Item>
      <Button {...args} />
    </Flex.Item>
  </StorybookPage>
)

Component.args = {
  size: 'md',
  radius: true,
  children: '点击提交'
}
