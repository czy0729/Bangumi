/*
 * @Author: czy0729
 * @Date: 2023-04-07 07:05:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 07:18:22
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { SegmentedControl, SegmentedControlProps } from './index'

export default {
  title: 'components/SegmentedControl',
  component: SegmentedControl
}

export const Component = (args: SegmentedControlProps) => (
  <StorybookPage>
    <SegmentedControl {...args} />
  </StorybookPage>
)

Component.args = {
  values: ['动画', '书籍', '音乐', '游戏'],
  selectedIndex: 1
}
