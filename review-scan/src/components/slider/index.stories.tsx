/*
 * @Author: czy0729
 * @Date: 2023-04-07 07:27:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 07:31:30
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Text } from '@components/text'
import { Slider as Component } from './index'

export default {
  title: 'components/Slider',
  component: Component
}

export const Slider = () => (
  <StorybookPage>
    <Text>Not supported on web</Text>
  </StorybookPage>
)
