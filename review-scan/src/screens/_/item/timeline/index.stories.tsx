/*
 * @Author: czy0729
 * @Date: 2023-04-05 05:40:55
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-04-05 05:40:55
 */
import React from 'react'
import { StorybookPage, StorybookList, Flex } from '@components'
import { ItemTimeline as Component, ItemTimelineProps as Props } from './index'
import { list } from './index.mock'

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
