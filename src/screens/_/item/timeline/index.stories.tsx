/*
 * @Author: czy0729
 * @Date: 2023-04-05 05:40:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-31 15:20:16
 */
import React from 'react'
import { Flex, StorybookList, StorybookPage } from '@components'
import { ItemTimeline as Component } from './index'
import { list } from './index.mock'

import type { ItemTimelineProps as Props } from './index'

export default {
  title: 'item/ItemTimeline',
  component: Component
}

export const Item = (args: Props) => (
  <StorybookPage radius>
    <Flex.Item>
      <Component {...args} />
    </Flex.Item>
  </StorybookPage>
)

Item.args = list[0]

export const List = () => (
  <StorybookPage>
    <StorybookList>
      {list.map((item, index) => (
        // @ts-expect-error
        <Component key={index} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
