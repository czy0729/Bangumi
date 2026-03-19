/*
 * @Author: czy0729
 * @Date: 2023-04-05 12:31:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 15:43:15
 */
import React from 'react'
import { Flex, StorybookPage } from '@components'
import { _ } from '@stores'
import { Eps as Component } from './index'
import { props } from './index.mock'

import type { EpsProps as Props } from './index'

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
