/*
 * @Author: czy0729
 * @Date: 2023-04-05 12:31:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:02:17
 */
import React from 'react'
import { Flex, StorybookPage } from '@components'
import { _ } from '@stores'
import { HorizontalList as Component } from './index'
import { props } from './index.mock'

import type { HorizontalListProps as Props } from './index'

export default {
  title: 'base/HorizontalList',
  component: Component
}

export const HorizontalList = (args: Props) => (
  <StorybookPage>
    <Flex.Item style={_.container.wind}>
      <Component {...args} />
    </Flex.Item>
  </StorybookPage>
)

HorizontalList.args = props
