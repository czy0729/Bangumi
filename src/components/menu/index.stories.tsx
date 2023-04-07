/*
 * @Author: czy0729
 * @Date: 2023-04-07 06:57:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 07:00:18
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Menu, MenuProps } from './index'

export default {
  title: 'components/Menu',
  component: Menu
}

export const Component = (args: MenuProps) => (
  <StorybookPage radius>
    <Menu {...args} />
  </StorybookPage>
)

Component.args = {
  title: ['ep.1 鏡でも見ることができない自分の顔って、なに？'],
  data: ['看过', '看到', '想看', '抛弃']
}
