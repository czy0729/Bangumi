/*
 * @Author: czy0729
 * @Date: 2023-04-05 12:31:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 14:35:16
 */
import React from 'react'
import { StorybookPage, Flex } from '@components'
import { _ } from '@stores'
import { HorizontalList as Component, HorizontalListProps as Props } from './index'
import { props } from './index.mock'

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
