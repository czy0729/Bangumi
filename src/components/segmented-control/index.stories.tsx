/*
 * @Author: czy0729
 * @Date: 2023-04-07 07:05:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-26 04:40:03
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { DataSource } from '@types'
import { SegmentedControl as Component, SegmentedControlProps as Props } from './index'

export default {
  title: 'components/SegmentedControl',
  component: Component
}

export const SegmentedControl = <T extends DataSource>(args: Props<T>) => (
  <StorybookPage>
    <Component {...args} />
  </StorybookPage>
)

SegmentedControl.args = {
  values: ['动画', '书籍', '音乐', '游戏'],
  selectedIndex: 1
}
