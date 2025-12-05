/*
 * @Author: czy0729
 * @Date: 2023-04-06 12:14:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-06 12:22:09
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { CountDown as Component, CountDownProps as Props } from './index'

export default {
  title: 'components/CountDown',
  component: Component
}

export const CountDown = (args: Props) => (
  <StorybookPage>
    <Component {...args} />
  </StorybookPage>
)

CountDown.args = {
  end: 1800000000
}
