/*
 * @Author: czy0729
 * @Date: 2023-04-06 12:14:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-06 12:22:09
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { CountDown, CountDownProps } from './index'

export default {
  title: 'components/CountDown',
  component: CountDown
}

export const Component = (args: CountDownProps) => (
  <StorybookPage>
    <CountDown {...args} />
  </StorybookPage>
)

Component.args = {
  end: 1800000000
}
