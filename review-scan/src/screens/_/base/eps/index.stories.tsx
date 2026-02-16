/*
 * @Author: czy0729
 * @Date: 2023-04-05 12:31:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 14:30:17
 */
import React from 'react'
import { StorybookPage, Flex } from '@components'
import { _ } from '@stores'
import { Eps as Component, EpsProps as Props } from './index'
import { props } from './index.mock'

export default {
  title: 'base/Eps',
  component: Component
}

export const Eps = (args: Props) => (
  <StorybookPage>
    <Flex.Item style={_.container.wind}>
      <Component {...args} />
    </Flex.Item>
  </StorybookPage>
)

Eps.args = {
  ...props,
  numbersOfLine: 8,
  layoutWidth: _.window.contentWidth,
  pagination: true
}
