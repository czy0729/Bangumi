/*
 * @Author: czy0729
 * @Date: 2023-04-05 12:31:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 14:30:17
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { _ } from '@stores'
import { Eps, EpsProps } from './index'
import { props } from './index.mock'

export default {
  title: 'base/Eps',
  component: Eps
}

export const Component = (args: EpsProps) => (
  <StorybookPage style={_.container.wind}>
    <Eps {...args} />
  </StorybookPage>
)

Component.args = {
  ...props,
  numbersOfLine: 8,
  layoutWidth: _.window.contentWidth,
  pagination: true
}
